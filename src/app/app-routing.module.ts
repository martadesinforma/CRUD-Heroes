import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'heroes',
    loadChildren: () => import('./heroes/heroes.module').then(m => m.HeroesModule),
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
