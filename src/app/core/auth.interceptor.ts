import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { catchError, throwError } from 'rxjs';
import { SessaoService } from '../services/sessao.service';

const ROTAS_PUBLICAS = ['/api/clientes/login', '/api/clientes/criar'];

function tokenRejeitado(erro: HttpErrorResponse): boolean {
  return erro.status === 401 && erro.error?.error === 'Não autorizado';
}

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const sessao = inject(SessaoService);
  const router = inject(Router);

  const apiPropria = req.url.startsWith('/api') || req.url.startsWith('/cotacao');
  const publica = ROTAS_PUBLICAS.some((rota) => req.url.startsWith(rota));
  const token = sessao.token();

  const requisicao =
    token && apiPropria && !publica
      ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
      : req;

  return next(requisicao).pipe(
    catchError((erro: HttpErrorResponse) => {

      if (!publica && tokenRejeitado(erro) && sessao.autenticado()) {
        const destino = router.url;
        sessao.sair();
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'warning',
          title: 'Sua sessão expirou. Faça login novamente',
          showConfirmButton: false,
          timer: 3500,
        });
        router.navigate(['/login'], { queryParams: { redirect: destino } });
      }
      return throwError(() => erro);
    }),
  );
};
