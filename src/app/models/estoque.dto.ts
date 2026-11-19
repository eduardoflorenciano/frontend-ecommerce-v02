export interface ProdutoEstoqueAdmin {
  idProduto: number;
  idVariacao: number;
  nome: string;
  marca: string;
  modelo: string;
  medida: string;
  preco: number;
  quantidadeEstoque: number;
  quantidadeReservada: number;
  quantidadeDisponivel: number;
  ativo: boolean;
}

export interface MovimentacaoEstoqueRequest {
  idVariacao: number;
  tipo: 'ENTRADA' | 'SAIDA';
  quantidade: number;
  motivo: string;
}

export interface MovimentacaoEstoqueResponse {
  id: number;
  idVariacao: number;
  nomeProduto: string;
  medida: string;
  tipo: 'ENTRADA' | 'SAIDA';
  quantidade: number;
  motivo: string;
  dataMovimentacao: string;
}
