export interface Parcelamento {
  quantidade: number;
  valor: number;
}

export interface EspecificacaoTecnica {
  label: string;
  valor: string;
}

export interface VeiculoCompativel {
  marca: string;
  modelos: string;
}

export interface ProdutoResumo {
  id: string;
  nome: string;
  medida: string;
  marca: string;
  logoMarcaUrl: string;
  imagemUrl: string;
  precoOriginal: number;
  precoAtual: number;
  percentualDesconto: number;
  parcelas: Parcelamento;
}

export interface Produto extends ProdutoResumo {
  especificacoes: EspecificacaoTecnica[];
  sobreProduto: string;
  sobreMarca: string;
  recomendacoes: string;
  veiculosCompativeis: VeiculoCompativel[];
  avisoCompatibilidade: string;
  imagemInmetroUrl: string;
}
