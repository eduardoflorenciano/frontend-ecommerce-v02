import { Injectable } from '@angular/core';
import { Produto, ProdutoResumo } from '../models/produto.model';

@Injectable({ providedIn: 'root' })
export class ProdutoService {
  private readonly produtoDetalheMock: Produto = {
    id: '2357R15BAL1TS1',
    nome: 'Pneu Linglong Green-Max',
    medida: '165/70 R13 79T',
    marca: 'Linglong Tire',
    logoMarcaUrl: '/linglong-logo.png',
    imagemUrl: '/pneu-linglong-greenmax-165-70-r13-79t.png',
    precoOriginal: 350,
    precoAtual: 200,
    percentualDesconto: 10,
    parcelas: { quantidade: 10, valor: 27.35 },
    especificacoes: [
      { label: 'Marca', valor: 'Linglong' },
      { label: 'Modelo', valor: 'Green-Max' },
      { label: 'Largura', valor: '165' },
      { label: 'Perfil', valor: '70' },
      { label: 'Aro', valor: '13' },
      { label: 'Índice de Carga', valor: '79' },
      { label: 'Índice de Velocidade', valor: 'T' },
    ],
    sobreProduto:
      'O pneu Linglong Green-Max 165/70 R13 79T foi desenvolvido para oferecer o equilíbrio ' +
      'perfeito entre economia de combustível, durabilidade e conforto no uso diário. Projetado ' +
      'especialmente para carros de passeio compactos e comerciais leves, este modelo se destaca ' +
      'pela sua rodagem macia e silenciosa, garantindo viagens urbanas e rodoviárias mais ' +
      'agradáveis. Sua banda de rodagem com desenho assimétrico e sulcos otimizados proporciona ' +
      'excelente escoamento de água, reduzindo o risco de aquaplanagem e garantindo frenagens ' +
      'seguras mesmo em pistas molhadas. O composto de borracha de alta tecnologia foi formulado ' +
      'para minimizar a resistência ao rolamento, ajudando a economizar combustível sem abrir mão ' +
      'da aderência e da durabilidade. É a escolha ideal para quem busca renovar os pneus do ' +
      'carro com um produto moderno, seguro e de alto rendimento quilométrico.',
    sobreMarca:
      'A Linglong Tire é uma das maiores e mais bem conceituadas fabricantes de pneus do mundo, ' +
      'com presença em mais de 180 países. Reconhecida globalmente pela constante inovação e ' +
      'rigoroso controle de qualidade, a marca é fornecedora de equipamento original (pneus que ' +
      'vêm de fábrica) para diversas montadoras de grande porte. Seus produtos combinam ' +
      'tecnologia de ponta, segurança testada internacionalmente e um excelente custo-benefício.',
    recomendacoes:
      'Para garantir a máxima durabilidade, segurança e o rendimento ideal do seu pneu Linglong, ' +
      'recomendamos que a montagem seja realizada em uma auto center especializada, realizando ' +
      'obrigatoriamente os serviços de alinhamento e balanceamento no momento da troca. Lembre-se ' +
      'também de verificar a calibragem dos pneus a cada 15 dias, seguindo a pressão indicada ' +
      'pelo manual do fabricante do seu veículo.',
    veiculosCompativeis: [
      { marca: 'CHEVROLET', modelos: 'Celta, Corsa, Classic, Pick-up Corsa' },
      { marca: 'FIAT', modelos: 'Uno, Palio, Siena, Mille, Premio, Elba' },
      { marca: 'FORD', modelos: 'Escort, Verona, Fiesta (G1)' },
      { marca: 'HYUNDAI', modelos: 'Atos' },
      { marca: 'NISSAN', modelos: 'March (versões Aro 13)' },
      { marca: 'PEUGEOT', modelos: '106, 205' },
      { marca: 'RENAULT', modelos: 'Clio, Twingo' },
      { marca: 'VOLKSWAGEN', modelos: 'Gol (G1/G2/G3), Parati, Saveiro, Voyage' },
    ],
    avisoCompatibilidade:
      'Esta é uma lista dos principais veículos que utilizam a medida 165/70 R13. Recomendamos ' +
      'sempre confirmar a medida exata atualmente gravada na lateral do pneu do seu veículo ou ' +
      'consultar o manual do proprietário antes de finalizar a compra, pois um mesmo modelo de ' +
      'carro pode variar o tamanho do aro dependendo do ano e da versão.',
    imagemInmetroUrl: '/etiqueta-inmetro.webp',
  };

  private readonly catalogoMock: ProdutoResumo[] = [
    {
      id: this.produtoDetalheMock.id,
      nome: this.produtoDetalheMock.nome,
      medida: this.produtoDetalheMock.medida,
      marca: this.produtoDetalheMock.marca,
      logoMarcaUrl: this.produtoDetalheMock.logoMarcaUrl,
      imagemUrl: this.produtoDetalheMock.imagemUrl,
      precoOriginal: this.produtoDetalheMock.precoOriginal,
      precoAtual: this.produtoDetalheMock.precoAtual,
      percentualDesconto: this.produtoDetalheMock.percentualDesconto,
      parcelas: this.produtoDetalheMock.parcelas,
    },
    {
      id: 'xbri-fastway-a2',
      nome: 'Pneu XBri Fastway A2',
      medida: '185/65 R14 86H',
      marca: 'XBRI',
      logoMarcaUrl: '/xbri-logo.png',
      imagemUrl: '/pneu-xbri-fastway-a2.png',
      precoOriginal: 400,
      precoAtual: 350,
      percentualDesconto: 13,
      parcelas: { quantidade: 10, valor: 35 },
    },
    {
      id: 'firemax-fm601',
      nome: 'Pneu Firemax FM601',
      medida: '195/50 R16 88V',
      marca: 'Firemax',
      logoMarcaUrl: '/firemax-logo.png',
      imagemUrl: '/pneu-firemax-fm601.png',
      precoOriginal: 420,
      precoAtual: 370,
      percentualDesconto: 12,
      parcelas: { quantidade: 10, valor: 37 },
    },
    {
      id: 'doublecoin-dc99',
      nome: 'Pneu DoubleCoin DC99',
      medida: '185/60 R15 84H',
      marca: 'DoubleCoin',
      logoMarcaUrl: '/doublecoin-logo.png',
      imagemUrl: '/pneu-doublecoin-dc99-185-60-r15-84h.png',
      precoOriginal: 390,
      precoAtual: 340,
      percentualDesconto: 13,
      parcelas: { quantidade: 10, valor: 34 },
    },
    {
      id: 'linglong-crosswind-hp010',
      nome: 'Pneu Linglong Crosswind HP010',
      medida: '195/60 R15 88V',
      marca: 'Linglong Tire',
      logoMarcaUrl: '/linglong-logo.png',
      imagemUrl: '/pneu-linglong-crosswind-hp010-195-60-r15-88v.png',
      precoOriginal: 380,
      precoAtual: 380,
      percentualDesconto: 0,
      parcelas: { quantidade: 10, valor: 38 },
      rotulo: 'MAIS VENDIDO',
    },
    {
      id: 'xbri-ecopower-a5',
      nome: 'Pneu XBri Ecopower A5',
      medida: '175/70 R13 82T',
      marca: 'XBRI',
      logoMarcaUrl: '/xbri-logo.png',
      imagemUrl: '/pneu-xbri-ecopower-a5.png',
      precoOriginal: 320,
      precoAtual: 320,
      percentualDesconto: 0,
      parcelas: { quantidade: 10, valor: 32 },
      rotulo: 'MAIS VENDIDO',
    },
    {
      id: 'firemax-fm916',
      nome: 'Pneu Firemax FM916',
      medida: '205/55 R16 91V',
      marca: 'Firemax',
      logoMarcaUrl: '/firemax-logo.png',
      imagemUrl: '/pneu-firemax-fm916.png',
      precoOriginal: 440,
      precoAtual: 440,
      percentualDesconto: 0,
      parcelas: { quantidade: 10, valor: 44 },
      rotulo: 'MAIS VENDIDO',
    },
    {
      id: 'doublecoin-dc88',
      nome: 'Pneu DoubleCoin DC88',
      medida: '205/60 R16 92V',
      marca: 'DoubleCoin',
      logoMarcaUrl: '/doublecoin-logo.png',
      imagemUrl: '/pneu-doublecoin-dc88.png',
      precoOriginal: 450,
      precoAtual: 450,
      percentualDesconto: 0,
      parcelas: { quantidade: 10, valor: 45 },
      rotulo: 'MAIS VENDIDO',
    },
  ];

  obterProdutoDetalhe(): Produto {
    return this.produtoDetalheMock;
  }

  obterProdutosPromocao(): ProdutoResumo[] {
    return this.catalogoMock.filter((produto) => produto.percentualDesconto > 0);
  }

  obterProdutosMaisVendidos(): ProdutoResumo[] {
    return this.catalogoMock.filter((produto) => produto.rotulo === 'MAIS VENDIDO');
  }

  buscarProdutos(termo: string): ProdutoResumo[] {
    const termoNormalizado = termo.trim().toLowerCase();
    if (!termoNormalizado) {
      return this.catalogoMock;
    }

    return this.catalogoMock.filter((produto) =>
      `${produto.nome} ${produto.medida}`.toLowerCase().includes(termoNormalizado),
    );
  }
}
