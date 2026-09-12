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
    imagemUrl: '/pneu.png',
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

  private readonly produtosPromocaoMock: ProdutoResumo[] = Array.from({ length: 4 }, (_valor, indice) => ({
    id: `promo-${indice + 1}`,
    nome: this.produtoDetalheMock.nome,
    medida: this.produtoDetalheMock.medida,
    marca: this.produtoDetalheMock.marca,
    logoMarcaUrl: this.produtoDetalheMock.logoMarcaUrl,
    imagemUrl: this.produtoDetalheMock.imagemUrl,
    precoOriginal: this.produtoDetalheMock.precoOriginal,
    precoAtual: this.produtoDetalheMock.precoAtual,
    percentualDesconto: this.produtoDetalheMock.percentualDesconto,
    parcelas: this.produtoDetalheMock.parcelas,
  }));

  private readonly produtosMaisVendidosMock: ProdutoResumo[] = Array.from({ length: 4 }, (_valor, indice) => ({
    id: `mais-vendido-${indice + 1}`,
    nome: 'Pneu XBri Fastway A2',
    medida: '185/65 R14 86H',
    marca: 'XBRI',
    logoMarcaUrl: '/xbri-logo.png',
    imagemUrl: '/pneu.png',
    precoOriginal: 350,
    precoAtual: 350,
    percentualDesconto: 0,
    parcelas: { quantidade: 10, valor: 35 },
    rotulo: 'MAIS VENDIDO',
  }));

  obterProdutoDetalhe(): Produto {
    return this.produtoDetalheMock;
  }

  obterProdutosPromocao(): ProdutoResumo[] {
    return this.produtosPromocaoMock;
  }

  obterProdutosMaisVendidos(): ProdutoResumo[] {
    return this.produtosMaisVendidosMock;
  }
}
