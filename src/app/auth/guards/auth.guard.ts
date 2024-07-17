import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, CanMatchFn, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';


const redirectIfAuthenticated = (): Observable<boolean> => { //La función redirectIfAuthenticated no necesita suscribirse directamente dentro de su definición porque su objetivo es devolver un Observable<boolean>. La suscripción al Observable se realiza en el contexto donde se usa este Observable. El router de Angular se suscribe automáticamente al Observable devuelto por los guards cuando estos son configurados en las rutas en el archivo app-routing.module.ts.
  //se inyectan los servicios  AuthService y  Router
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  return authService.checkAuthentication()
    .pipe(
      tap((isAuthenticated) => {
        if (isAuthenticated) { //si isAuthenticated es true, e intento entrar en la url http://localhost:4200/auth/login, redirige al usuario a la página http://localhost:4200/heroes/list usando el router porque no quiero que pueda entrar a la pagina de auth que tiene el login.
          router.navigate(['/heroes']);
        }
      }),
      map(isAuthenticated => !isAuthenticated) //Si isAuthenticated es true (usuario autenticado), la función  retorna un nuevo observable que emite false, bloqueando la navegación a la ruta de autenticación (http://localhost:4200/auth/login) en el app-routing. Si isAuthenticated es false (usuario no autenticado), la función  retorna un nuevo observable que emite true, permitiendo la navegación a la ruta de autenticación (http://localhost:4200/auth/login).
    );
};



//Estos Guard los vamos a importar en el path: 'auth' del app-routing.module.ts
//Definiendo una función flecha y exportándola podemos utilizar sus funcionalidades de guard en el app-routing
export const canActivateAuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return redirectIfAuthenticated(); //Llama a la función checkAuthStatus para verificar el estado de autenticación del usuario. Retorna el Observable<boolean> que indica si la ruta puede ser activada.

};

export const canMatchAuthGuard: CanMatchFn = (route: Route, segments: UrlSegment[]) => {
  return redirectIfAuthenticated(); //llama a checkAuthStatus para verificar el estado de autenticación del usuario y retorna el Observable<boolean> que indica si la ruta puede coincidir.

};

