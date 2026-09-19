import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Loginlistmodel } from '../models/loginlistmodel';

@Injectable({ providedIn: 'root' })
export class LoginlistService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = '/api/clientes';

  logar(item: Loginlistmodel): Observable<{ nome: string; mensagem: string }> {
    return this.http.post<{ nome: string; mensagem: string }>(`${this.apiUrl}/login`, item);
  }
}
