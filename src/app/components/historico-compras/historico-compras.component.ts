import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

import { PedidoService } from '../../services/pedido.service';
import { SessaoService } from '../../services/sessao.service';
import { PedidoAdmin } from '../../models/pedido-admin.dto';

@Component({
  selector: 'app-historico-compras',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './historico-compras.component.html',
  styleUrl: './historico-compras.component.scss',
})
export class HistoricoComprasComponent implements OnInit {
  private readonly pedidoService = inject(PedidoService);
  private readonly sessaoService = inject(SessaoService);
  private readonly router = inject(Router);

  pedidos: PedidoAdmin[] = [];
  carregando = true;
  erro = '';

  get quantidadeEmAndamento(): number {
    return this.pedidos.filter(
      (pedido) => pedido.status === 'SOLICITADO' || pedido.status === 'CONFIRMADO',
    ).length;
  }

  get quantidadeFinalizados(): number {
    return this.pedidos.filter((pedido) => pedido.status === 'FINALIZADO').length;
  }
  ngOnInit(): void {
    this.carregarPedidos();
  }

  carregarPedidos(): void {
    const cliente = this.sessaoService.cliente();

    if (!cliente || cliente.id === null) {
      this.carregando = false;

      Swal.fire({
        icon: 'warning',
        title: 'Acesso necessário',
        text: 'Entre na sua conta para visualizar seu histórico de compras',
      });

      this.router.navigate(['/login']);
      return;
    }

    this.carregando = true;
    this.erro = '';

    this.pedidoService.listarMeus().subscribe({
      next: (resposta) => {
        this.pedidos = resposta;
        this.carregando = false;
      },
      error: (error) => {
        console.error('Erro ao carregar histórico:', error);
        this.erro = 'Não foi possível carregar seu histórico de compras';
        this.carregando = false;
      },
    });
  }

  podeCancelar(pedido: PedidoAdmin): boolean {
    return ['SOLICITADO', 'CONFIRMADO'].includes(pedido.status);
  }

  cancelarPedido(pedido: PedidoAdmin): void {
    if (!this.podeCancelar(pedido)) {
      return;
    }

    Swal.fire({
      title: `Cancelar pedido #${pedido.id}?`,
      text: 'Informe o motivo do cancelamento',
      input: 'textarea',
      inputPlaceholder: 'Digite o motivo do cancelamento',
      inputAttributes: {
        'aria-label': 'Motivo do cancelamento',
      },
      showCancelButton: true,
      confirmButtonText: 'Confirmar cancelamento',
      cancelButtonText: 'Voltar',
      confirmButtonColor: '#dc3545',
      inputValidator: (motivo) => {
        if (!motivo || !motivo.trim()) {
          return 'Informe o motivo do cancelamento';
        }

        if (motivo.trim().length > 500) {
          return 'O motivo deve ter no máximo 500 caracteres';
        }

        return null;
      },
    }).then((resultado) => {
      if (!resultado.isConfirmed || !resultado.value) {
        return;
      }

      const motivo = resultado.value.trim();

      this.pedidoService.cancelarPedido(pedido.id, motivo).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Pedido cancelado!',
            text: 'O cancelamento foi realizado com sucesso',
            confirmButtonText: 'Entendi',
          });

          this.carregarPedidos();
        },
        error: (error) => {
          console.error('Erro ao cancelar pedido:', error);

          const mensagem =
            typeof error.error === 'string'
              ? error.error
              : 'Não foi possível cancelar o pedido. Tente novamente';

          Swal.fire({
            icon: 'error',
            title: 'Erro ao cancelar',
            text: mensagem,
          });
        },
      });
    });
  }
}
