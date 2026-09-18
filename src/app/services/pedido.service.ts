import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { PedidoCreateRequest, PedidoCreateResponse } from '../models/pedido-backend.dto';

@Injectable({ providedIn: 'root' })
export class PedidoService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = '/api/pedidos';

  criar(pedido: PedidoCreateRequest): Observable<PedidoCreateResponse> {
    return this.http.post<PedidoCreateResponse>(`${this.apiUrl}/criar`, pedido);
  }
}
