import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import {
  ProdutoEstoqueAdmin,
  MovimentacaoEstoqueRequest,
  MovimentacaoEstoqueResponse,
} from '../models/estoque.dto';

@Injectable({
  providedIn: 'root',
})
export class EstoqueService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = 'http://localhost:8080/api/produtos';

  listarEstoque(): Observable<ProdutoEstoqueAdmin[]> {
    return this.http.get<ProdutoEstoqueAdmin[]>(`${this.apiUrl}/admin/estoque`);
  }

  movimentarEstoque(request: MovimentacaoEstoqueRequest): Observable<MovimentacaoEstoqueResponse> {
    return this.http.post<MovimentacaoEstoqueResponse>(
      `${this.apiUrl}/admin/estoque/movimentar`,
      request,
    );
  }

  buscarHistorico(idVariacao: number): Observable<MovimentacaoEstoqueResponse[]> {
    return this.http.get<MovimentacaoEstoqueResponse[]>(
      `${this.apiUrl}/admin/estoque/${idVariacao}/historico`,
    );
  }
}
