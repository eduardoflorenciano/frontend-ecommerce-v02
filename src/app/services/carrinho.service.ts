import { Injectable, computed, signal } from '@angular/core';
import { ItemCarrinho } from '../models/item-carrinho.model';
import { ProdutoResumo } from '../models/produto.model';

const CHAVE_STORAGE = 'acs.carrinho';

export interface ResultadoAdicao {
  quantidade: number;
  limitado: boolean;
}

export interface ResumoSincronizacao {
  removidos: string[];
  ajustados: string[];
  precosAtualizados: string[];
}

function limiteDe(produto: ProdutoResumo): number {
  const estoque = produto.quantidadeEstoque;
  return typeof estoque === 'number' && Number.isFinite(estoque)
    ? Math.max(0, Math.floor(estoque))
    : Number.POSITIVE_INFINITY;
}

function normalizarQuantidade(valor: unknown): number {
  const numero = Math.floor(Number(valor));
  return Number.isFinite(numero) && numero > 0 ? numero : 1;
}

function lerItem(bruto: any): ItemCarrinho | null {
  const produto = bruto?.produto;
  const quantidade = Number(bruto?.quantidade);
  const valido =
    typeof produto?.id === 'string' &&
    typeof produto?.nome === 'string' &&
    Number.isFinite(produto?.precoAtual) &&
    typeof produto?.parcelas === 'object' &&
    produto.parcelas !== null &&
    Number.isInteger(quantidade) &&
    quantidade > 0;
  return valido ? { produto, quantidade } : null;
}

@Injectable({ providedIn: 'root' })
export class CarrinhoService {

  private readonly itensSignal = signal<ItemCarrinho[]>(this.restaurar());

  readonly itens = this.itensSignal.asReadonly();

  readonly quantidadeTotal = computed(() =>
    this.itensSignal().reduce((total) => total + 1, 0),
  );

  readonly valorTotal = computed(() =>
    this.itensSignal().reduce(
      (total, item) => total + item.produto.precoAtual * item.quantidade,
      0,
    ),
  );

  constructor() {

    if (typeof window !== 'undefined') {
      window.addEventListener('storage', (evento) => {
        if (evento.key === CHAVE_STORAGE || evento.key === null) {
          this.itensSignal.set(this.restaurar());
        }
      });
    }
  }

  
  adicionarItem(produto: ProdutoResumo, quantidade: number): ResultadoAdicao {
    const itens = this.itensSignal();
    const existente = itens.find((item) => item.produto.id === produto.id);
    const noCarrinho = existente?.quantidade ?? 0;

    const desejada = noCarrinho + normalizarQuantidade(quantidade);
    const final = Math.min(desejada, limiteDe(produto));
    const limitado = final < desejada;

    if (final <= 0) {
      return { quantidade: noCarrinho, limitado: true };
    }

    this.definir(
      existente
        ? itens.map((item) =>
            item.produto.id === produto.id ? { produto, quantidade: final } : item,
          )
        : [...itens, { produto, quantidade: final }],
    );
    return { quantidade: final, limitado };
  }

  alterarQuantidade(produtoId: string, quantidade: number): void {
    this.definir(
      this.itensSignal().map((item) => {
        if (item.produto.id !== produtoId) {
          return item;
        }
        const limite = limiteDe(item.produto);
        return { ...item, quantidade: Math.min(normalizarQuantidade(quantidade), limite) };
      }),
    );
  }

  removerItem(produtoId: string): void {
    this.definir(this.itensSignal().filter((item) => item.produto.id !== produtoId));
  }

  esvaziar(): void {
    this.definir([]);
  }

  
  sincronizarComCatalogo(catalogo: ProdutoResumo[]): ResumoSincronizacao | null {
    const atuais = this.itensSignal();
    if (catalogo.length === 0 || atuais.length === 0) {
      return null;
    }

    const porId = new Map(catalogo.map((produto) => [produto.id, produto]));
    const resumo: ResumoSincronizacao = { removidos: [], ajustados: [], precosAtualizados: [] };
    const novos: ItemCarrinho[] = [];

    for (const item of atuais) {
      const produto = porId.get(item.produto.id);
      if (!produto || limiteDe(produto) <= 0) {
        resumo.removidos.push(item.produto.nome);
        continue;
      }

      const quantidade = Math.min(item.quantidade, limiteDe(produto));
      if (quantidade < item.quantidade) {
        resumo.ajustados.push(`${item.produto.nome} (${quantidade} un.)`);
      }
      if (produto.precoAtual !== item.produto.precoAtual) {
        resumo.precosAtualizados.push(item.produto.nome);
      }
      novos.push({ produto, quantidade });
    }

    if (JSON.stringify(novos) !== JSON.stringify(atuais)) {
      this.definir(novos);
    }

    const houveMudanca =
      resumo.removidos.length + resumo.ajustados.length + resumo.precosAtualizados.length > 0;
    return houveMudanca ? resumo : null;
  }

  
  private definir(itens: ItemCarrinho[]): void {
    this.itensSignal.set(itens);
    try {
      if (itens.length > 0) {
        localStorage.setItem(CHAVE_STORAGE, JSON.stringify(itens));
      } else {
        localStorage.removeItem(CHAVE_STORAGE);
      }
    } catch {
      
    }
  }

  private restaurar(): ItemCarrinho[] {
    try {
      const bruto = localStorage.getItem(CHAVE_STORAGE);
      if (!bruto) {
        return [];
      }
      const dados: unknown = JSON.parse(bruto);
      return Array.isArray(dados)
        ? dados.map(lerItem).filter((item): item is ItemCarrinho => item !== null)
        : [];
    } catch {
      return [];
    }
  }
}
