import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Perfil, SessaoService } from '../services/sessao.service';

export const authGuard: CanActivateFn = (_route, state) => {
  const sessao = inject(SessaoService);
  const router = inject(Router);

  return sessao.autenticado()
    ? true
    : router.createUrlTree(['/login'], { queryParams: { redirect: state.url } });
};

export const perfilGuard =
  (...perfis: Perfil[]): CanActivateFn =>
  (_route, state) => {
    const sessao = inject(SessaoService);
    const router = inject(Router);

    const cliente = sessao.cliente();
    if (!cliente) {
      return router.createUrlTree(['/login'], { queryParams: { redirect: state.url } });
    }
    return perfis.includes(cliente.perfil) ? true : router.createUrlTree(['/']);
  };
