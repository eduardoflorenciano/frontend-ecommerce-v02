import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { CarrinhoService } from '../../services/carrinho.service';
import { QuantityInput } from '../quantity-input/quantity-input';

@Component({
  selector: 'app-carrinho',
  imports: [RouterLink, CurrencyPipe, MdbRippleModule, QuantityInput],
  templateUrl: './carrinho.html',
  styleUrl: './carrinho.scss',
})
export class Carrinho {
  protected readonly carrinhoService = inject(CarrinhoService);

  protected readonly itens = this.carrinhoService.itens;
  protected readonly valorTotal = this.carrinhoService.valorTotal;

  protected alterarQuantidade(produtoId: string, quantidade: number): void {
    this.carrinhoService.alterarQuantidade(produtoId, quantidade);
  }

  protected removerItem(produtoId: string): void {
    this.carrinhoService.removerItem(produtoId);
  }

  protected finalizarCompra(): void {
    console.log('Finalizar compra (checkout ainda não implementado)');
  }
}
