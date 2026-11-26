import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { PedidoCreateRequest, PedidoCreateResponse } from '../models/pedido-backend.dto';
import { PedidoAdmin } from '../models/pedido-admin.dto';

@Injectable({ providedIn: 'root' })
export class PedidoService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = '/api/pedidos';

  criar(pedido: PedidoCreateRequest): Observable<PedidoCreateResponse> {
    return this.http.post<PedidoCreateResponse>(`${this.apiUrl}/criar`, pedido);
  }

  listarAdmin(): Observable<PedidoAdmin[]> {
    return this.http.get<PedidoAdmin[]>(`${this.apiUrl}/admin`);
  }

  listarMeus(): Observable<PedidoAdmin[]> {
    return this.http.get<PedidoAdmin[]>(`${this.apiUrl}/meus`);
  }

  confirmarPagamento(id: number): Observable<string> {
    return this.http.put(`${this.apiUrl}/${id}/confirmar-pagamento`, null, {
      responseType: 'text',
    });
  }

  cancelarPedido(id: number, motivo: string): Observable<string> {
    return this.http.put(`${this.apiUrl}/${id}/cancelar`, { motivo }, { responseType: 'text' });
  }

}
