import { Component, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styles: ``
})
export class ListPageComponent implements OnInit {

  public heroes: Hero[] = [];

  constructor(private heroesService:HeroesService){} //la inyeccion del servicio que queremos usar se hace en el constructor

  ngOnInit(): void { //El método `ngOnInit()` es una buena opción para realizar suscripciones a peticiones HTTP porque es el método del ciclo de vida de un componente Angular que se llama una vez que la inicialización del componente está completa
    this.heroesService.getHeroes() //this.heroesService.getHeroes() es un observable
      .subscribe(heroes => this.heroes = heroes)//mi propiedad heroes va a ser igual a los heroes que regresa el servicio
  }
}
