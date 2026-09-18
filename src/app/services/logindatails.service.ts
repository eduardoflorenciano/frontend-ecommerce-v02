import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Logindatailsmodel } from '../models/logindatailsmodel';

export interface ClienteCriadoResponse {
  id: number;
  nome: string;
  mensagem: string;
}

@Injectable({ providedIn: 'root' })
export class LogindatailsService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = '/api/clientes';

  logar(item: Logindatailsmodel): Observable<ClienteCriadoResponse> {
    return this.http.post<ClienteCriadoResponse>(`${this.apiUrl}/criar`, item);
  }
}
