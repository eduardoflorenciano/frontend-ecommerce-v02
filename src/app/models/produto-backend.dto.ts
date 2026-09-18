export interface MedidaPesquisaRequest {
  medida: string;
}

export interface CarroPesquisaMedidaResponse {
  id: number;
  marca: string;
  modelo: string;
  anoFabricacao: number;
  versao: string;
}

export interface ProdutoVariacaoPesquisaResponse {
  id: number;
  nome: string;
  medida: string;
  largura: number;
  perfil: number;
  aro: number;
  indiceCarga: number;
  preco: number;
  quantidadeEstoque: number;
  carrosCompativeis: CarroPesquisaMedidaResponse[];
}
