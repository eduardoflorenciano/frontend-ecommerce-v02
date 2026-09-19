import { Injectable, signal } from '@angular/core';

export interface ClienteSessao {
  id: number | null;
  nome: string;
}

@Injectable({ providedIn: 'root' })
export class SessaoService {
  private readonly clienteSignal = signal<ClienteSessao | null>(null);

  readonly cliente = this.clienteSignal.asReadonly();

  entrar(cliente: ClienteSessao): void {
    this.clienteSignal.set(cliente);
  }

  sair(): void {
    this.clienteSignal.set(null);
  }
}
