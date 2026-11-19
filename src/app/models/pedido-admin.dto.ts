export interface PedidoAdminItem {
  nomeProduto: string;
  medida: string;
  quantidade: number;
  precoUnitario: number;
}

export interface PedidoAdmin {
  id: number;
  nomeCliente: string;
  status: string;
  dataPedido: string;
  dataVencimentoReserva: string;
  valorTotal: number;
  itens: PedidoAdminItem[];
  dataCancelamento: string | null;
  motivoCancelamento: string | null;
}

export interface PedidoCancelarRequest {
  motivo: string;
}
