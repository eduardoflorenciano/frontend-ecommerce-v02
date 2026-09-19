import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { CarrinhoService } from '../../services/carrinho.service';
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
}
