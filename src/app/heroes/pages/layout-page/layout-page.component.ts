import { Component } from '@angular/core';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styles: ``
})
export class LayoutPageComponent {
  //opciones del menú para poder navegar entre diferentes pantallas
  public sidebarItems = [
    {label: 'Listado', icon: 'label', url: './list'}, //path relativo a donde me encuentro que muestra la url http://localhost:4200/heroes/list
    {label: 'Añadir', icon: 'add', url: './new-hero'}, //path relativo a donde me encuentro que muestra la url http://localhost:4200/heroes/new-hero
    {label: 'Buscar', icon: 'search', url: './search'}, //path relativo a donde me encuentro que muestra la url http://localhost:4200/heroes/search
  ]

}
