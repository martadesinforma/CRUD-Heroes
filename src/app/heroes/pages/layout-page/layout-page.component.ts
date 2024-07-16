import { Component } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { User } from '../../../auth/interfaces/user.interface';
import { Router } from '@angular/router';

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
  ];

  constructor(private authService: AuthService, private router: Router) {}

  get user(): User | undefined{
    return this.authService.currentUser;
  }

  onLogout() {
    this.authService.logout(); //para limpiar
    this.router.navigate(['/auth/login'])
  }

}
