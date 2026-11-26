import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Loginlistmodel } from '../models/loginlistmodel';
import { Perfil } from './sessao.service';

export interface LoginResponse {
  id: number;
  nome: string;
  perfil: Perfil;
  token: string;
  mensagem: string;
}

@Injectable({ providedIn: 'root' })
export class LoginlistService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = '/api/clientes';

  logar(item: Loginlistmodel): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, item);
  }
}
