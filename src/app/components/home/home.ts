import { Component, inject } from '@angular/core';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { Router } from '@angular/router';
import { MarcaService } from '../../services/marca.service';
import { ProdutoService } from '../../services/produto.service';
import { SecaoProdutos } from '../secao-produtos/secao-produtos';

@Component({
  selector: 'app-home',
  imports: [MdbRippleModule, SecaoProdutos],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private readonly produtoService = inject(ProdutoService);
  private readonly marcaService = inject(MarcaService);
  private readonly router = inject(Router);

  protected readonly produtosPromocao = this.produtoService.obterProdutosPromocao();
  protected readonly produtosMaisVendidos = this.produtoService.obterProdutosMaisVendidos();
  protected readonly marcas = this.marcaService.obterMarcas();

  protected readonly larguras = [
    135, 145, 155, 165, 175, 185, 195, 205, 215, 225, 235, 245, 255, 265, 275, 285, 295, 305, 315, 325,
  ];
  protected readonly perfis = [30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85];
  protected readonly aros = [13, 14, 15, 16, 17, 18, 19, 20];

  protected buscarPorMedida(largura: string, perfil: string, aro: string): void {
    if (!largura || !perfil || !aro) {
      return;
    }
    this.router.navigate(['/busca'], { queryParams: { largura, perfil, aro } });
  }
}
