import { Injectable, computed, signal } from '@angular/core';
import { ItemCarrinho } from '../models/item-carrinho.model';
import { ProdutoResumo } from '../models/produto.model';

@Injectable({ providedIn: 'root' })
export class CarrinhoService {
  private readonly itensSignal = signal<ItemCarrinho[]>([]);

  readonly itens = this.itensSignal.asReadonly();

  readonly quantidadeTotal = computed(() =>
    this.itensSignal().reduce((total, item) => total + item.quantidade, 0),
  );

  readonly valorTotal = computed(() =>
    this.itensSignal().reduce((total, item) => total + item.produto.precoAtual * item.quantidade, 0),
  );

  adicionarItem(produto: ProdutoResumo, quantidade: number): void {
    this.itensSignal.update((itens) => {
      const existente = itens.find((item) => item.produto.id === produto.id);
      if (existente) {
        return itens.map((item) =>
          item.produto.id === produto.id ? { ...item, quantidade: item.quantidade + quantidade } : item,
        );
      }
      return [...itens, { produto, quantidade }];
    });
  }

  alterarQuantidade(produtoId: string, quantidade: number): void {
    this.itensSignal.update((itens) =>
      itens.map((item) => (item.produto.id === produtoId ? { ...item, quantidade } : item)),
    );
  }

  removerItem(produtoId: string): void {
    this.itensSignal.update((itens) => itens.filter((item) => item.produto.id !== produtoId));
  }

  esvaziar(): void {
    this.itensSignal.set([]);
  }
}
