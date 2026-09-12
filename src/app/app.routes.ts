import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { ProdutoDetalhe } from './components/produto-detalhe/produto-detalhe';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'produto/:id', component: ProdutoDetalhe },
  { path: '**', redirectTo: '' },
];
