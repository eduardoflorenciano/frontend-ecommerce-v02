import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';

@Component({
  selector: 'app-header',
  imports: [RouterLink, MdbDropdownModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  protected readonly quantidadeCarrinho = signal(0);
}
