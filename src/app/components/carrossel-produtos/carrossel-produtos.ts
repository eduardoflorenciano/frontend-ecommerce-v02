import { Component, ElementRef, input, viewChild } from '@angular/core';
import { ProdutoResumo } from '../../models/produto.model';
import { ProductCard } from '../product-card/product-card';

@Component({
  selector: 'app-carrossel-produtos',
  imports: [ProductCard],
  templateUrl: './carrossel-produtos.html',
  styleUrl: './carrossel-produtos.scss',
})
export class CarrosselProdutos {
  readonly titulo = input.required<string>();
  readonly produtos = input.required<ProdutoResumo[]>();

  private readonly trilho = viewChild.required<ElementRef<HTMLDivElement>>('trilho');

  protected rolar(direcao: 'anterior' | 'proximo'): void {
    const elemento = this.trilho().nativeElement;
    const distancia = elemento.clientWidth * 0.9;
    elemento.scrollBy({
      left: direcao === 'proximo' ? distancia : -distancia,
      behavior: 'smooth',
    });
  }
}
