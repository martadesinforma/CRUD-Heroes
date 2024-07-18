import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: ``
})
export class SearchPageComponent {

  public searchInput = new FormControl(''); //cuando usamos formularios reactivos tenemos que importar en el .module.ts el ReactiveFormsModule. Este código  crea un FormControl con un valor inicial vacío. Los cambios en el input actualizarán el FormControl automáticamente.
  public heroes: Hero[] = [];
  public selectedHero?: Hero;

  constructor(private heroesService: HeroesService) {}

  searchHero() {
    if(this.searchInput.value === '') {
      this.selectedHero = undefined
      return
    }
    const value: string = this.searchInput.value || ''; //al principio cuando no hayamos buscado nada en el input el valor es un ''

    this.heroesService.getSuggestions(value)
      .subscribe(heroes =>this.heroes = heroes)

  }

  onSelectedOption(event: MatAutocompleteSelectedEvent): void {
    if(!event.option.value) {
      this.selectedHero = undefined;
      return
    }

    const hero: Hero = event.option.value;
    this.searchInput.setValue(hero.superhero); //Cuando el usuario selecciona un héroe de la lista de opciones autocompletadas, el campo de entrada de búsqueda (searchInput) debe actualizarse para reflejar el nombre del héroe seleccionado. Sino en el input aparecerá [object Object] en vez del nombre del heroe que ha clicado

    this.selectedHero = hero;
  }
}
