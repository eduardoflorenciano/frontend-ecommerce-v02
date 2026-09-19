import { Routes } from '@angular/router';
import { Carrinho } from './components/carrinho/carrinho';
import { CatalogoBusca } from './components/catalogo-busca/catalogo-busca';
import { Home } from './components/home/home';
import { Loginlist } from './components/login/loginlist/loginlist';
import { ProdutoDetalhe } from './components/produto-detalhe/produto-detalhe';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'busca', component: CatalogoBusca },
  {
    path: 'produto',
    children: [{ path: ':id', component: ProdutoDetalhe }],
  },
  { path: 'carrinho', component: Carrinho },
  { path: 'login', component: Loginlist },
  { path: '**', redirectTo: '' },
];
