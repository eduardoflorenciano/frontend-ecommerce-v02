import { Routes } from '@angular/router';
import { Carrinho } from './components/carrinho/carrinho';
import { CatalogoBusca } from './components/catalogo-busca/catalogo-busca';
import { Home } from './components/home/home';
import { Loginlist } from './components/login/loginlist/loginlist';
import { ProdutoDetalhe } from './components/produto-detalhe/produto-detalhe';
import { PedidosComponent } from './admin/pedidos/pedidos.component';
import { AdminLayoutComponent } from './admin/layout/admin-layout.component';
import { HistoricoComprasComponent } from './components/historico-compras/historico-compras.component';
import { EstoqueComponent } from './admin/estoque/estoque.component';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'busca', component: CatalogoBusca },
  {
    path: 'produto',
    children: [{ path: ':slug', component: ProdutoDetalhe }],
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      { path: '', redirectTo: 'pedidos', pathMatch: 'full' },
      { path: 'pedidos', component: PedidosComponent },
      { path: 'estoque', component: EstoqueComponent },
    ],
  },
  { path: 'carrinho', component: Carrinho },
  { path: 'login', component: Loginlist },
  {
    path: 'minha-conta/historico',
    component: HistoricoComprasComponent,
  },
  { path: '**', redirectTo: '' },
];
