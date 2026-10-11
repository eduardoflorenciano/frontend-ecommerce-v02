import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import Swal from 'sweetalert2';
import { CarrinhoService } from '../../services/carrinho.service';
import { ClienteService } from '../../services/cliente.service';
import { SessaoService } from '../../services/sessao.service';

@Component({
  standalone: true,
  selector: 'app-header',
  imports: [RouterLink, FormsModule, MdbDropdownModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private readonly router = inject(Router);
  private readonly clienteService = inject(ClienteService);
  protected readonly carrinhoService = inject(CarrinhoService);
  protected readonly sessaoService = inject(SessaoService);

  protected termoBusca = '';

  protected buscar(): void {
    const termo = this.termoBusca.trim();
    if (!termo) {
      return;
    }
    this.router.navigate(['/busca'], { queryParams: { q: termo } });
  }

  protected excluirConta(): void {
    const cliente = this.sessaoService.cliente();
    if (!cliente?.id) {
      return;
    }

    Swal.fire({
      icon: 'warning',
      title: 'Desativar sua conta?',
      text: 'Essa ação desativa seu cadastro na loja. Não é possível desfazer por aqui',
      showCancelButton: true,
      confirmButtonText: 'Sim, desativar',
      cancelButtonText: 'Cancelar',
    }).then((resultado) => {
      if (!resultado.isConfirmed) {
        return;
      }

      this.clienteService.desativar(cliente.id!).subscribe({
        next: () => {
          this.sessaoService.sair();
          this.router.navigate(['/']);
          Swal.fire({ icon: 'success', title: 'Conta desativada', text: 'Sua conta foi desativada' });
        },
        error: (erro) => {
          console.error('Erro ao desativar conta:', erro);
          Swal.fire({
            icon: 'error',
            title: 'Não foi possível desativar sua conta',
            text: erro?.error?.message ?? 'Tente novamente em instantes',
          });
        },
      });
    });
  }
}
