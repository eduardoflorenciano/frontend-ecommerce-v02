import { Routes } from '@angular/router';
import { ProdutoDetalhe } from './components/produto-detalhe/produto-detalhe';

export const routes: Routes = [
  { path: '', component: ProdutoDetalhe },
  { path: 'produto/:id', component: ProdutoDetalhe },
  { path: '**', redirectTo: '' },
];
