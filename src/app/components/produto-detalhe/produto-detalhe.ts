import { CurrencyPipe } from '@angular/common';
import { Component, inject, input, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Router, RouterLink } from '@angular/router';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { map, switchMap } from 'rxjs';
import Swal from 'sweetalert2';
import { ProdutoResumo } from '../../models/produto.model';
import { CarrinhoService } from '../../services/carrinho.service';
import { ProdutoService } from '../../services/produto.service';
import { QuantityInput } from '../quantity-input/quantity-input';
import { SecaoProdutos } from '../secao-produtos/secao-produtos';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 2500,
  timerProgressBar: true,
});

@Component({
  standalone: true,
  selector: 'app-produto-detalhe',
  imports: [RouterLink, CurrencyPipe, MdbTabsModule, MdbRippleModule, SecaoProdutos, QuantityInput],
  templateUrl: './produto-detalhe.html',
  styleUrl: './produto-detalhe.scss',
})
export class ProdutoDetalhe {
  private readonly produtoService = inject(ProdutoService);
  private readonly carrinhoService = inject(CarrinhoService);
  private readonly router = inject(Router);

  readonly id = input.required<string>();

  protected readonly produto = toSignal(
    toObservable(this.id).pipe(switchMap((id) => this.produtoService.obterProdutoPorId(id))),
  );

  protected readonly outrosProdutos = toSignal(
    this.produtoService
      .listarTodos()
      .pipe(map((produtos) => produtos.filter((item) => item.id !== this.id()))),
    { initialValue: [] as ProdutoResumo[] },
  );

  protected readonly quantidade = signal(1);

  protected adicionarAoCarrinho(): void {
    const produto = this.produto();
    if (!produto) {
      return;
    }
    this.carrinhoService.adicionarItem(produto, this.quantidade());
    Toast.fire({ icon: 'success', title: `${produto.nome} adicionado ao carrinho!` });
  }

  protected comprarAgora(): void {
    const produto = this.produto();
    if (!produto) {
      return;
    }
    this.carrinhoService.adicionarItem(produto, this.quantidade());
    this.router.navigate(['/carrinho']);
  }
}
