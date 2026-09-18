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
    Array.from({ length: this.max() }, (_valor, indice) => indice + 1),
  );
}
