export interface ProdutoPedidoRequest {
  produtoVariacaoId: number;
  quantidade: number;
}

export interface PedidoCreateRequest {
  clienteId: number;
  itens: ProdutoPedidoRequest[];
}

export interface ProdutoPedidoResponse {
  produtoNome: string;
  medida: string;
  quantidade: number;
  precoUnitario: number;
}

export interface PedidoCreateResponse {
  id: number;
  status: string;
  dataPedido: string;
  valorTotal: number;
  nomeCliente: string;
  itens: ProdutoPedidoResponse[];
  linkWhatsapp: string;
}
