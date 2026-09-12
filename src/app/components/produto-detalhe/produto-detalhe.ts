import { CurrencyPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { ProdutoService } from '../../services/produto.service';
import { CarrosselProdutos } from '../carrossel-produtos/carrossel-produtos';
import { QuantityInput } from '../quantity-input/quantity-input';

@Component({
  selector: 'app-produto-detalhe',
  imports: [RouterLink, CurrencyPipe, MdbTabsModule, MdbRippleModule, CarrosselProdutos, QuantityInput],
  templateUrl: './produto-detalhe.html',
  styleUrl: './produto-detalhe.scss',
})
export class ProdutoDetalhe {
  private readonly produtoService = inject(ProdutoService);

  protected readonly produto = this.produtoService.obterProdutoDetalhe();
  protected readonly produtosPromocao = this.produtoService.obterProdutosPromocao();
  protected readonly quantidade = signal(1);

  protected adicionarAoCarrinho(): void {
    console.log(`Adicionar ${this.quantidade()} unidade(s) de "${this.produto.nome}" ao carrinho`);
  }

  protected comprarAgora(): void {
    console.log(`Comprar agora: ${this.quantidade()} unidade(s) de "${this.produto.nome}"`);
  }
}
