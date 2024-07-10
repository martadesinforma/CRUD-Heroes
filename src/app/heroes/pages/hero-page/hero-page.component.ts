import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Hero } from '../../interfaces/hero.interface';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styles: ``
})
export class HeroPageComponent implements OnInit{

  public hero?: Hero; //hero contiene la informacion de cada heroe cuando se carga. Hasta que no se cargue esta info, hero tendrá el valor de undefined

  constructor(private heroesService: HeroesService, private activatedRoute:ActivatedRoute, private router: Router) {} // se utiliza ActivatedRoute: para acceder a los parámetros de la ruta activa (por ejemplo, el id del héroe) y Router: para navegar a diferentes rutas si es necesario.


  ngOnInit(): void {
   this.activatedRoute.params //this.activatedRoute.params es un observable que emite los parámetros de la ruta activa (por ejemplo, { id: 'dc-batman' }).
    .pipe( //pipe se usa para encadenar operadores de RxJS.
      switchMap((params) => this.heroesService.getHeroById(params['id'])), //switchMap se utiliza para transformar un observable en otro observable. Toma los parámetros de la ruta y devuelve un nuevo observable que es el resultado de getHeroById.
    )
    .subscribe(hero => {
      if (!hero) return this.router.navigate(['/heroes/list']);

      this.hero = hero
      return;
    })
  }

  goBack():void {
    this.router.navigateByUrl('heroes/list')
  }
}
