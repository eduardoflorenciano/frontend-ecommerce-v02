import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProdutoResumo } from '../../models/produto.model';
import { ProdutoService } from '../../services/produto.service';
import { ProductCard } from '../product-card/product-card';

type Ordenacao = 'relevancia' | 'mais-barato' | 'mais-caro' | 'ordem-alfabetica';

const ITENS_POR_PAGINA = 4;

@Component({
  selector: 'app-catalogo-busca',
  imports: [RouterLink, ProductCard],
  templateUrl: './catalogo-busca.html',
  styleUrl: './catalogo-busca.scss',
})
export class CatalogoBusca {
  private readonly produtoService = inject(ProdutoService);

  readonly q = input<string>();
  readonly largura = input<string>();
  readonly perfil = input<string>();
  readonly aro = input<string>();

  protected readonly ordenacao = signal<Ordenacao>('relevancia');
  protected readonly paginaAtual = signal(1);

  protected readonly termoPesquisado = computed(() => {
    const termoLivre = this.q()?.trim();
    if (termoLivre) {
      return termoLivre;
    }

    const largura = this.largura();
    const perfil = this.perfil();
    const aro = this.aro();
    if (largura && perfil && aro) {
      return `${largura}/${perfil} R${aro}`;
    }

    return '';
  });

  protected readonly produtosEncontrados = computed(() =>
    this.ordenarProdutos(this.produtoService.buscarProdutos(this.termoPesquisado()), this.ordenacao()),
  );

  protected readonly totalPaginas = computed(() =>
    Math.max(1, Math.ceil(this.produtosEncontrados().length / ITENS_POR_PAGINA)),
  );

  protected readonly paginasVisiveis = computed(() =>
    Array.from({ length: this.totalPaginas() }, (_valor, indice) => indice + 1),
  );

  protected readonly produtosPagina = computed(() => {
    const inicio = (this.paginaAtual() - 1) * ITENS_POR_PAGINA;
    return this.produtosEncontrados().slice(inicio, inicio + ITENS_POR_PAGINA);
  });

  constructor() {
    effect(() => {
      this.termoPesquisado();
      this.ordenacao();
      this.paginaAtual.set(1);
    });
  }

  protected aoMudarOrdenacao(evento: Event): void {
    this.ordenacao.set((evento.target as HTMLSelectElement).value as Ordenacao);
  }

  protected irParaPagina(pagina: number): void {
    if (pagina < 1 || pagina > this.totalPaginas()) {
      return;
    }
    this.paginaAtual.set(pagina);
  }

  private ordenarProdutos(produtos: ProdutoResumo[], ordenacao: Ordenacao): ProdutoResumo[] {
    const copia = [...produtos];
    switch (ordenacao) {
      case 'mais-barato':
        return copia.sort((a, b) => a.precoAtual - b.precoAtual);
      case 'mais-caro':
        return copia.sort((a, b) => b.precoAtual - a.precoAtual);
      case 'ordem-alfabetica':
        return copia.sort((a, b) => a.nome.localeCompare(b.nome));
      default:
        return copia;
    }
  }
}
