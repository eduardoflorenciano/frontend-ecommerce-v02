import { Routes } from '@angular/router';
import { CatalogoBusca } from './components/catalogo-busca/catalogo-busca';
import { Home } from './components/home/home';
import { ProdutoDetalhe } from './components/produto-detalhe/produto-detalhe';

export const routes: Routes = [
  { path: '', component: Home }, 
  { path: 'busca', component: CatalogoBusca },
  { path: 'produto/:id', component: ProdutoDetalhe },
  { path: '**', redirectTo: '' },
];
