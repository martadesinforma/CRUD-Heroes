import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayautPageComponent } from './pages/layaut-page/layaut-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';

const routes: Routes = [
  {
    path: '', //cuando el path sea localhost:4200/auth quiero que se muestre LayautPageComponent
    component: LayautPageComponent,//todas las rutas van a mostrar este componente
    children: //si quisieramos que las rutas hijas se cargasen por lazyload en vez de escribir children, escribimos loadChildren
    [
      {path: 'login', component: LoginPageComponent},
      {path: 'new-account', component: RegisterPageComponent},
      {path: '**', redirectTo: 'login'}, //cuando tengamos el componente vacio (localhost:4200/auth) se va a mostrar como ruta hija login
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
