import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';
import { canActivateGuard, canMatchGuard } from './auth/guards/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    //Cuando un usuario intenta navegar a la ruta 'heroes', Angular evalúa los guards configurados (canActivate y canMatch). Basado en el valor emitido (true o false), el router decide si permite la navegación.
    path: 'heroes',
    loadChildren: () => import('./heroes/heroes.module').then(m => m.HeroesModule),
    //el router de Angular se suscribe automáticamente al Observable devuelto por los guards cuando estos son configurados en las rutas en el archivo app-routing.module.ts:
    canActivate: [canActivateGuard], //Anclamos la función del canActive
    canMatch: [canMatchGuard] //Anclamos la función del canMatch
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
