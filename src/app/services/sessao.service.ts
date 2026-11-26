import { Injectable, computed, signal } from '@angular/core';

export type Perfil = 'CLIENTE' | 'ATENDENTE' | 'ADM' | 'DESATIVADO';

export interface ClienteSessao {
  id: number;
  nome: string;
  perfil: Perfil;
}

interface SessaoPersistida {
  token: string;
  cliente: ClienteSessao;
}

const CHAVE_STORAGE = 'acs.sessao';

@Injectable({ providedIn: 'root' })
export class SessaoService {
  private readonly estado = signal<SessaoPersistida | null>(this.restaurar());

  readonly cliente = computed(() => this.estado()?.cliente ?? null);
  readonly token = computed(() => this.estado()?.token ?? null);
  readonly autenticado = computed(() => this.estado() !== null);
  readonly ehEquipe = computed(() => {
    const perfil = this.cliente()?.perfil;
    return perfil === 'ADM' || perfil === 'ATENDENTE';
  });

  entrar(token: string, cliente: ClienteSessao): void {
    const sessao: SessaoPersistida = { token, cliente };
    this.estado.set(sessao);
    try {
      localStorage.setItem(CHAVE_STORAGE, JSON.stringify(sessao));
    } catch {
      /* storage indisponível: a sessão vale até recarregar a página */
    }
  }

  sair(): void {
    this.estado.set(null);
    try {
      localStorage.removeItem(CHAVE_STORAGE);
    } catch {
      /* ignora */
    }
  }

  private restaurar(): SessaoPersistida | null {
    try {
      const bruto = localStorage.getItem(CHAVE_STORAGE);
      if (!bruto) {
        return null;
      }
      const sessao = JSON.parse(bruto) as SessaoPersistida;
      return sessao?.token && sessao?.cliente && !this.expirado(sessao.token) ? sessao : null;
    } catch {
      return null;
    }
  }

  // Lê o "exp" do JWT (segundos) só para não restaurar um token que já venceu
  private expirado(token: string): boolean {
    try {
      const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
      const { exp } = JSON.parse(atob(base64));
      return typeof exp !== 'number' || exp * 1000 <= Date.now();
    } catch {
      return true;
    }
  }
}
