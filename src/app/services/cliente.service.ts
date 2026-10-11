import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ClienteService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = '/api/clientes';

  desativar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/desativar/${id}`);
  }
}
