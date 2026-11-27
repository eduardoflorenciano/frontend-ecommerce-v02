import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import Swal from 'sweetalert2';
import { CarrinhoService, ResumoSincronizacao } from '../../services/carrinho.service';
import { ProdutoService } from '../../services/produto.service';
import { PedidoService } from '../../services/pedido.service';
import { SessaoService } from '../../services/sessao.service';
import { QuantityInput } from '../quantity-input/quantity-input';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 2500,
  timerProgressBar: true,
});

@Component({
  standalone: true,
  selector: 'app-carrinho',
  imports: [RouterLink, CurrencyPipe, MdbRippleModule, QuantityInput],
  templateUrl: './carrinho.html',
  styleUrl: './carrinho.scss',
})
export class Carrinho {
  protected readonly carrinhoService = inject(CarrinhoService);
  protected readonly sessaoService = inject(SessaoService);
  private readonly pedidoService = inject(PedidoService);
  private readonly produtoService = inject(ProdutoService);
  private readonly router = inject(Router);

  protected readonly itens = this.carrinhoService.itens;
  protected readonly valorTotal = this.carrinhoService.valorTotal;

  constructor() {
    
    if (this.itens().length > 0) {
      this.produtoService
        .listarTodos()
        .subscribe((catalogo) =>
          this.avisarAjustes(this.carrinhoService.sincronizarComCatalogo(catalogo)),
        );
    }
  }

  private avisarAjustes(resumo: ResumoSincronizacao | null): void {
    if (!resumo) {
      return;
    }
    const partes: string[] = [];
    if (resumo.removidos.length) {
      partes.push(`Sem estoque, removido: ${resumo.removidos.join(', ')}.`);
    }
    if (resumo.ajustados.length) {
      partes.push(`Quantidade ajustada ao estoque: ${resumo.ajustados.join(', ')}.`);
    }
    if (resumo.precosAtualizados.length) {
      partes.push(`Preço atualizado: ${resumo.precosAtualizados.join(', ')}.`);
    }
    Swal.fire({
      icon: 'info',
      title: 'Seu carrinho foi atualizado',
      text: partes.join(' '),
      confirmButtonText: 'Entendi',
    });
  }

  protected alterarQuantidade(produtoId: string, quantidade: number): void {
    this.carrinhoService.alterarQuantidade(produtoId, quantidade);
  }

  protected removerItem(produtoId: string): void {
    const item = this.itens().find((item) => item.produto.id === produtoId);
    this.carrinhoService.removerItem(produtoId);
    Toast.fire({
      icon: 'success',
      title: item ? `${item.produto.nome} removido do carrinho` : 'Item removido do carrinho',
    });
  }

  protected finalizarCompra(): void {
    const cliente = this.sessaoService.cliente();

    if (!cliente) {
      Swal.fire({
        icon: 'info',
        title: 'Faça login para continuar',
        text: 'Você precisa estar logado para finalizar a compra',
        confirmButtonText: 'Ir para o login',
      }).then(() => this.router.navigate(['/login'], { queryParams: { redirect: '/carrinho' } }));
      return;
    }

    if (!cliente.id) {
      Swal.fire({
        icon: 'warning',
        title: 'Não foi possível identificar sua conta',
        text: 'Faça login novamente para finalizar a compra',
      });
      return;
    }

    Swal.fire({
      icon: 'question',
      title: 'Finalizar compra?',
      html: `Total do pedido: <strong>${this.valorTotal().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</strong>`,
      showCancelButton: true,
      confirmButtonText: 'Sim, finalizar',
      cancelButtonText: 'Cancelar',
    }).then((resultado) => {
      if (resultado.isConfirmed) {
        this.enviarPedido();
      }
    });
  }

  private enviarPedido(): void {
    
    const pedido = {
      itens: this.itens().map((item) => ({
        produtoVariacaoId: Number(item.produto.id),
        quantidade: item.quantidade,
      })),
    };

    this.pedidoService.criar(pedido).subscribe({
      next: (resposta) => {
        Swal.fire({
          icon: 'success',
          title: 'Pedido realizado!',
          html: `Pedido #${resposta.id} criado. Total: R$ ${resposta.valorTotal.toFixed(2)}.<br>Confirme pelo WhatsApp para finalizar`,
          confirmButtonText: 'Abrir WhatsApp',
        }).then(() => {
          window.open(resposta.linkWhatsapp, '_blank');
          this.carrinhoService.esvaziar();
        });
      },
      error: (erro) => {
        console.error('Erro ao finalizar compra:', erro);
        Swal.fire({
          icon: 'error',
          title: 'Não foi possível finalizar a compra',
          text: erro?.error?.message ?? 'Tente novamente em instantes',
        });
      },
    });
  }
}
