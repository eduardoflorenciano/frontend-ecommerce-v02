import { Component, computed, input, model } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-quantity-input',
  imports: [FormsModule],
  templateUrl: './quantity-input.html',
  styleUrl: './quantity-input.scss',
})
export class QuantityInput {
  readonly quantidade = model(1);
  readonly max = input(10);

  protected readonly opcoes = computed(() =>
    Array.from(
      { length: Math.max(this.max(), this.quantidade()) },
      (_valor, indice) => indice + 1,
    ),
  );

  protected selecionar(valor: string | number): void {
    this.quantidade.set(Number(valor));
  }
}
