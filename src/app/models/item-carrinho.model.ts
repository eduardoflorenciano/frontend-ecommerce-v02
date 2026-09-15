import { ProdutoResumo } from './produto.model';

export interface ItemCarrinho {
  produto: ProdutoResumo;
  quantidade: number;
}
