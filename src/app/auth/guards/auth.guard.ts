import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, CanMatchFn, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';


const checkAuthStatus = ():  Observable<boolean> => { //La función checkAuthStatus no necesita suscribirse directamente dentro de su definición porque su objetivo es devolver un Observable<boolean>. La suscripción al Observable se realiza en el contexto donde se usa este Observable. El router de Angular se suscribe automáticamente al Observable devuelto por los guards cuando estos son configurados en las rutas en el archivo app-routing.module.ts.
  //se inyectan los servicios  AuthService y  Router
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  return authService.checkAuthentication()
  .pipe(
    tap((isAuthenticated) => {
      if (!isAuthenticated) { //si isAuthenticated es false, redirige al usuario a la página de login (/auth/login) usando el router.
        router.navigate(['/auth/login']);
      }
    })
  );
};

  //Definiendo una función flecha y exportándola podemos utilizar sus funcionalidades de guard en el app-routing
  export const canActivateGuard: CanActivateFn = ( route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    return checkAuthStatus(); //Llama a la función checkAuthStatus para verificar el estado de autenticación del usuario. Retorna el Observable<boolean> que indica si la ruta puede ser activada.
  };

  export const canMatchGuard: CanMatchFn = ( route: Route, segments: UrlSegment[]) => {
    return checkAuthStatus(); //llama a checkAuthStatus para verificar el estado de autenticación del usuario y retorna el Observable<boolean> que indica si la ruta puede coincidir.
  };

