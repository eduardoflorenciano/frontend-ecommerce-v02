import { Component, input } from '@angular/core';
import { ProdutoResumo } from '../../models/produto.model';
import { ProductCard } from '../product-card/product-card';

@Component({
  selector: 'app-secao-produtos',
  imports: [ProductCard],
  templateUrl: './secao-produtos.html',
  styleUrl: './secao-produtos.scss',
})
export class SecaoProdutos {
  readonly titulo = input.required<string>();
  readonly produtos = input.required<ProdutoResumo[]>();
}
