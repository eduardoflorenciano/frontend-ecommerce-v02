import { CurrencyPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { CarrinhoService } from '../../services/carrinho.service';
import { ProdutoService } from '../../services/produto.service';
import { QuantityInput } from '../quantity-input/quantity-input';
import { SecaoProdutos } from '../secao-produtos/secao-produtos';

@Component({
  selector: 'app-produto-detalhe',
  imports: [RouterLink, CurrencyPipe, MdbTabsModule, MdbRippleModule, SecaoProdutos, QuantityInput],
  templateUrl: './produto-detalhe.html',
  styleUrl: './produto-detalhe.scss',
})
export class ProdutoDetalhe {
  private readonly produtoService = inject(ProdutoService);
  private readonly carrinhoService = inject(CarrinhoService);
  private readonly router = inject(Router);

  protected readonly produto = this.produtoService.obterProdutoDetalhe();

  protected readonly produtosRelacionados = this.produtoService
    .obterProdutosPromocao()
    .filter((item) => item.id !== this.produto.id);

  protected readonly quantidade = signal(1);

  protected adicionarAoCarrinho(): void {
    this.carrinhoService.adicionarItem(this.produto, this.quantidade());
  }

  protected comprarAgora(): void {
    this.carrinhoService.adicionarItem(this.produto, this.quantidade());
    this.router.navigate(['/carrinho']);
  }
}
