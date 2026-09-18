import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AlterarSenhaModel } from '../models/alterar-senha-model';

@Injectable({ providedIn: 'root' })
export class AlterarSenhaService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = '/api/clientes';

  atualizar(id: number, item: AlterarSenhaModel): Observable<{ mensagem: string }> {
    return this.http.patch<{ mensagem: string }>(`${this.apiUrl}/atualizar/${id}`, item);
  }
}
