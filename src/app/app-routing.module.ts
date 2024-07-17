import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';
import { canActivateAuthGuard, canMatchAuthGuard } from './auth/guards/auth.guard';
import { canActivateHeroesGuard, canMatchHeroesGuard } from './auth/guards/heroes.guard';

const routes: Routes = [
  {
     //Cuando un usuario intenta navegar a la ruta 'auth', Angular evalúa los guards configurados (canActivate y canMatch). Basado en el valor emitido (true o false), el router decide si permite la navegación.
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    //el router de Angular se suscribe automáticamente al Observable devuelto por los guards cuando estos son configurados en las rutas en el archivo app-routing.module.ts:
    canActivate: [canActivateAuthGuard], //Anclamos la función del canActive
    canMatch: [canMatchAuthGuard] //Anclamos la función del canMatch

  },
  {
    //Cuando un usuario intenta navegar a la ruta 'heroes', Angular evalúa los guards configurados (canActivate y canMatch). Basado en el valor emitido (true o false), el router decide si permite la navegación.
    path: 'heroes',
    loadChildren: () => import('./heroes/heroes.module').then(m => m.HeroesModule),
    //el router de Angular se suscribe automáticamente al Observable devuelto por los guards cuando estos son configurados en las rutas en el archivo app-routing.module.ts:
    canActivate: [canActivateHeroesGuard], //Anclamos la función del canActive
    canMatch: [canMatchHeroesGuard] //Anclamos la función del canMatch
  },
  {
    path: '404',
    component: Error404PageComponent, //app-routing.module.ts tiene acceso a este componente perteneciente a la carpeta shared porque en el app.module.ts hemos importado el shares.module.ts
  },
  {
    path: '', // cuando el usuario navega a la raíz de la aplicación (por ejemplo, http://localhost:4200/) quiero que me lo redireccione a la ruta  heroes
    redirectTo: 'heroes',
    pathMatch: 'full', //significa que el enrutador debe coincidir exactamente con la ruta completa para aplicar la redirección.
  },
  {
    path: '**', //cualquier otro path lo redirecciona a la ruta 404
    redirectTo: '404',
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
