import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PedidoService } from '../../services/pedido.service';
import { PedidoAdmin } from '../../models/pedido-admin.dto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-pedidos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.scss',
})
export class PedidosComponent implements OnInit {
  private pedidoService = inject(PedidoService);

  pedidos: PedidoAdmin[] = [];

  carregando = false;
  erro = '';

  busca = '';
  filtroStatus = 'TODOS';

  ngOnInit(): void {
    this.carregarPedidos();
  }

  carregarPedidos(): void {
    this.carregando = true;
    this.erro = '';

    this.pedidoService.listarAdmin().subscribe({
      next: (resposta) => {
        this.pedidos = resposta;
        this.carregando = false;
      },
      error: (erro) => {
        console.error('Erro ao carregar pedidos:', erro);
        this.erro =
          'Não foi possível carregar os pedidos';
        this.carregando = false;
      },
    });
  }

  get pedidosFiltrados(): PedidoAdmin[] {
    return this.pedidos.filter((pedido) => {
      const termo = this.busca.trim().toLowerCase();

      const correspondeBusca =
        !termo ||
        pedido.id.toString().includes(termo) ||
        pedido.nomeCliente.toLowerCase().includes(termo) ||
        pedido.itens.some(
          (item) =>
            item.nomeProduto.toLowerCase().includes(termo) ||
            item.medida.toLowerCase().includes(termo),
        );

      const correspondeStatus =
        this.filtroStatus === 'TODOS' || pedido.status === this.filtroStatus;

      return correspondeBusca && correspondeStatus;
    });
  }

  get totalPedidos(): number {
    return this.pedidos.length;
  }

  get pedidosAguardando(): number {
    return this.pedidos.filter(
      (pedido) => pedido.status === 'SOLICITADO' || pedido.status === 'CONFIRMADO',
    ).length;
  }

  get pedidosFinalizados(): number {
    return this.pedidos.filter((pedido) => pedido.status === 'FINALIZADO').length;
  }

  get pedidosExpirados(): number {
    return this.pedidos.filter((pedido) => pedido.status === 'EXPIRADO').length;
  }

  formatarStatus(status: string): string {
    const nomes: Record<string, string> = {
      SOLICITADO: 'Aguardando atendimento',
      CONFIRMADO: 'Confirmado',
      FINALIZADO: 'Finalizado',
      CANCELADO: 'Cancelado',
      EXPIRADO: 'Expirado',
    };

    return nomes[status] ?? status;
  }

  reservaVencida(data: string): boolean {
    return new Date(data).getTime() <= Date.now();
  }

  diasRestantes(data: string): number {
    const diferenca = new Date(data).getTime() - Date.now();

    return Math.max(0, Math.ceil(diferenca / (1000 * 60 * 60 * 24)));
  }

  trackByPedido(_index: number, pedido: PedidoAdmin): number {
    return pedido.id;
  }

  confirmarPedido(pedido: PedidoAdmin): void {
    Swal.fire({
      title: `Finalizar pedido #${pedido.id}?`,
      text: `Confirma o pagamento e a retirada do pedido de ${pedido.nomeCliente}? O estoque será baixado`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#a51616',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Sim, finalizar pedido',
      cancelButtonText: 'Cancelar',
    }).then((resultado) => {
      if (!resultado.isConfirmed) {
        return;
      }

      Swal.fire({
        title: 'Processando',
        text: 'Aguarde enquanto o pedido é finalizado',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      this.pedidoService.confirmarPagamento(pedido.id).subscribe({
        next: () => {
          Swal.fire({
            title: 'Pedido finalizado!',
            text: `O pedido #${pedido.id} foi finalizado e o estoque atualizado`,
            icon: 'success',
            confirmButtonColor: '#a51616',
          });

          this.carregarPedidos();
        },
        error: (erro) => {
          if (erro.status === 410) {
            Swal.fire({
              title: 'Reserva expirada',
              text: 'O prazo terminou. O pedido foi expirado e o estoque reservado foi liberado',
              icon: 'warning',
              confirmButtonColor: '#a51616',
            });

            this.carregarPedidos();
            return;
          }

          Swal.fire({
            title: 'Não foi possível finalizar',
            text: erro.error || 'Ocorreu um erro ao processar o pedido',
            icon: 'error',
            confirmButtonColor: '#a51616',
          });
        },
      });
    });
  }
}
