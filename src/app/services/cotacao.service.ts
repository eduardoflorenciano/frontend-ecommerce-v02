import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CotacaoService {
  private readonly http = inject(HttpClient);

  converterParaDolar(produtoVariacaoId: string): Observable<number> {
    return this.http.get<number>(`/cotacao/produto/${produtoVariacaoId}/converter-para-reais`);
  }
}
