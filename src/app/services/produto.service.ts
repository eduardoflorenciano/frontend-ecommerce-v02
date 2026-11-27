import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import Swal from 'sweetalert2';
import { Observable, catchError, map, of } from 'rxjs';
import {
  EspecificacaoTecnica,
  Produto,
  ProdutoResumo,
  VeiculoCompativel,
} from '../models/produto.model';
import {
  MedidaPesquisaRequest,
  ProdutoVariacaoPesquisaResponse,
} from '../models/produto-backend.dto';

interface MarcaVisual {
  nome: string;
  logoUrl: string;
  imagemUrl: string;
}

const MARCAS_CONHECIDAS: MarcaVisual[] = [
  {
    nome: 'Linglong',
    logoUrl: '/linglong-logo.png',
    imagemUrl: '/pneu-linglong-greenmax-165-70-r13-79t.png',
  },
  { nome: 'XBRI', logoUrl: '/xbri-logo.png', imagemUrl: '/pneu-xbri-fastway-a2.png' },
  { nome: 'XBri', logoUrl: '/xbri-logo.png', imagemUrl: '/pneu-xbri-fastway-a2.png' },
  { nome: 'Firemax', logoUrl: '/firemax-logo.png', imagemUrl: '/pneu-firemax-fm601.png' },
  { nome: 'DoubleCoin', logoUrl: '/doublecoin-logo.png', imagemUrl: '/pneu-doublecoin-dc88.png' },
  {
    nome: 'Bridgestone',
    logoUrl: '/bridgestone-Logo.png',
    imagemUrl: '/pneu-linglong-greenmax-165-70-r13-79t.png',
  },
  {
    nome: 'Michelin',
    logoUrl: '/michelin-logo.webp',
    imagemUrl: '/pneu-linglong-greenmax-165-70-r13-79t.png',
  },
  {
    nome: 'Pirelli',
    logoUrl: '/pirelli-logo.webp',
    imagemUrl: '/pneu-linglong-greenmax-165-70-r13-79t.png',
  },
];

const MARCA_PADRAO: MarcaVisual = {
  nome: 'Auto Center Silva',
  logoUrl: '/logo.png',
  imagemUrl: '/pneu-linglong-greenmax-165-70-r13-79t.png',
};

const SOBRE_PRODUTO_PADRAO =
  'Este pneu foi selecionado pela Auto Center Silva pelo bom equilíbrio entre durabilidade, ' +
  'conforto de rodagem e custo-benefício. Consulte um de nossos atendentes para tirar dúvidas ' +
  'específicas sobre esse modelo.';

const SOBRE_MARCA_PADRAO =
  'Trabalhamos apenas com marcas homologadas e testadas, buscando sempre o melhor equilíbrio ' +
  'entre segurança, durabilidade e preço para o seu veículo.';

const RECOMENDACOES_PADRAO =
  'Para garantir a máxima durabilidade, segurança e o rendimento ideal do seu pneu, ' +
  'recomendamos que a montagem seja realizada em uma auto center especializada, realizando ' +
  'obrigatoriamente os serviços de alinhamento e balanceamento no momento da troca. Lembre-se ' +
  'também de verificar a calibragem dos pneus a cada 15 dias, seguindo a pressão indicada pelo ' +
  'manual do fabricante do seu veículo.';

const AVISO_COMPATIBILIDADE_PADRAO =
  'Os veículos compatíveis listados abaixo são os que já foram cadastrados no nosso sistema para ' +
  'esta medida. Recomendamos sempre confirmar a medida exata gravada na lateral do pneu do seu ' +
  'veículo antes de finalizar a compra.';

let ultimoAvisoCatalogo = 0;

function avisarFalhaCatalogo(): void {
  const agora = Date.now();
  if (agora - ultimoAvisoCatalogo < 5000) {
    return;
  }
  ultimoAvisoCatalogo = agora;
  Swal.fire({
    toast: true,
    position: 'top-end',
    icon: 'error',
    title: 'Não foi possível carregar o catálogo. Tente novamente em instantes',
    showConfirmButton: false,
    timer: 4000,
  });
}

@Injectable({ providedIn: 'root' })
export class ProdutoService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = '/api/produtos';

  private pesquisarPorMedida(medida: string): Observable<ProdutoVariacaoPesquisaResponse[]> {
    const body: MedidaPesquisaRequest = { medida };
    return this.http.post<ProdutoVariacaoPesquisaResponse[]>(`${this.apiUrl}/pesquisar`, body).pipe(
      catchError((erro) => {
        console.error('Erro ao buscar produtos no back-end:', erro);
        avisarFalhaCatalogo();
        return of([]);
      }),
    );
  }

  listarTodos(): Observable<ProdutoResumo[]> {
    return this.pesquisarPorMedida('/').pipe(map((variacoes) => variacoes.map(mapearParaResumo)));
  }

  buscarProdutos(termo: string): Observable<ProdutoResumo[]> {
    const termoNormalizado = termo.trim().toLowerCase();
    return this.listarTodos().pipe(
      map((produtos) =>
        termoNormalizado
          ? produtos.filter((produto) =>
              `${produto.nome} ${produto.medida}`.toLowerCase().includes(termoNormalizado),
            )
          : produtos,
      ),
    );
  }

  obterProdutoPorId(id: string): Observable<Produto | undefined> {
    return this.pesquisarPorMedida('/').pipe(
      map((variacoes) => variacoes.find((variacao) => String(variacao.id) === id)),
      map((variacao) => (variacao ? mapearParaDetalhe(variacao) : undefined)),
    );
  }

  obterProdutoPorSlug(slug: string): Observable<Produto | undefined> {
    return this.pesquisarPorMedida('/').pipe(
      map((variacoes) => variacoes.find((variacao) => mapearParaResumo(variacao).slug === slug)),
      map((variacao) => (variacao ? mapearParaDetalhe(variacao) : undefined)),
    );
  }
}

function inferirMarca(nomeProduto: string): MarcaVisual {
  const nomeNormalizado = nomeProduto.toLowerCase();
  return (
    MARCAS_CONHECIDAS.find((marca) => nomeNormalizado.includes(marca.nome.toLowerCase())) ??
    MARCA_PADRAO
  );
}

function mapearParaResumo(variacao: ProdutoVariacaoPesquisaResponse): ProdutoResumo {
  const marca = inferirMarca(variacao.nome);
  const medida = `${variacao.largura}/${variacao.perfil} R${variacao.aro}`;

  const textoParaSlug = variacao.nome.includes(String(variacao.largura))
    ? variacao.nome
    : `${variacao.nome} ${medida}`;
    
  return {
    id: String(variacao.id),
    slug: gerarSlug(textoParaSlug),
    nome: variacao.nome,
    medida: `${variacao.largura}/${variacao.perfil} R${variacao.aro}`,
    marca: marca.nome,
    logoMarcaUrl: marca.logoUrl,
    imagemUrl: marca.imagemUrl,
    precoOriginal: variacao.preco,
    precoAtual: variacao.preco,
    percentualDesconto: 0,
    parcelas: { quantidade: 10, valor: Math.round((variacao.preco / 10) * 100) / 100 },
    quantidadeEstoque: unidadesDisponiveis(variacao),
  };
}

function unidadesDisponiveis(variacao: ProdutoVariacaoPesquisaResponse): number {
  return Math.max(0, variacao.quantidadeDisponivel ?? variacao.quantidadeEstoque ?? 0);
}

function mapearParaDetalhe(variacao: ProdutoVariacaoPesquisaResponse): Produto {
  const resumo = mapearParaResumo(variacao);

  const especificacoes: EspecificacaoTecnica[] = [
    { label: 'Marca', valor: resumo.marca },
    { label: 'Largura', valor: String(variacao.largura) },
    { label: 'Perfil', valor: String(variacao.perfil) },
    { label: 'Aro', valor: String(variacao.aro) },
    { label: 'Índice de Carga', valor: String(variacao.indiceCarga) },
  ];

  const veiculosCompativeis: VeiculoCompativel[] = variacao.carrosCompativeis.map((carro) => ({
    marca: carro.marca,
    modelos: `${carro.modelo} (${carro.anoFabricacao}) - ${carro.versao}`,
  }));

  return {
    ...resumo,
    especificacoes,
    veiculosCompativeis,
    quantidadeEstoque: unidadesDisponiveis(variacao),
    sobreProduto: SOBRE_PRODUTO_PADRAO,
    sobreMarca: SOBRE_MARCA_PADRAO,
    recomendacoes: RECOMENDACOES_PADRAO,
    avisoCompatibilidade: AVISO_COMPATIBILIDADE_PADRAO,
    imagemInmetroUrl: '/etiqueta-inmetro.webp',
  };
}

function gerarSlug(texto: string): string {
  return texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}
