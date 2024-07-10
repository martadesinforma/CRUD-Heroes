import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { NewPageComponent } from './pages/new-page/new-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { HeroPageComponent } from './pages/hero-page/hero-page.component';

const routes: Routes = [
  {
    path: '', //cuando el path sea localhost:4200/heroes quiero que se muestre LayautPageComponent
    component: LayoutPageComponent, //todas las rutas van a mostrar este componente
    children: //si quisieramos que las rutas hijas se cargasen por lazyload en vez de escribir children, escribimos loadChildren
    [
      {path: 'new-hero', component: NewPageComponent},
      {path: 'search', component: SearchPageComponent},
      {path: 'edit/:id', component: NewPageComponent}, //ejemplo de ruta: http://localhost:4200/heroes/edit/dc-batman. :id: Este parámetro es un marcador de posición que Angular reemplaza dinámicamente con un valor real cuando se navega a esa ruta.
      {path: 'list', component: ListPageComponent},
      {path: ':id', component: HeroPageComponent}, //ejmplo de ruta: http://localhost:4200/heroes/dc-batman.    :id: Este parámetro es un marcador de posición que Angular reemplaza dinámicamente con un valor real cuando se navega a esa ruta.
      {path: '**', redirectTo: 'list'}, //cuando tengamos el componente vacio (localhost:4200/heroes) se va a mostrar como ruta hija list

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeroesRoutingModule { }
