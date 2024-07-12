// voy a utilizar un formulario reactivo de la biblioteca de Angular Material, por lo que la mayoria de la logica la voy a tener centralizada en el documento ts. Para conectar nuestro formulario reactivo definido en el ts con el html tenemos que saber que cada uno de los elementos de nuestro formulario (en este caso id, superhero...que es como luce la interfaz de nuestros objetos hero)tienen que estar contenidos dentro de un elemento HTML. Tenemos que saber que tanto la pagina http://localhost:56598/heroes/new-hero que tenemos cuando pulsamos en Añadir del Menú como la pagina http://localhost:56598/heroes/edit/dc-batman que tenemos cuando en la parte de Listado le damos a editar un heroe, estan utilizando el mismo componente new-page.component (esto lo podemos ver en el heroes-routing.module.ts). Como aunque se este usando el mismo componente quiero que cuando estemos en la hoja new-hero se cree un nuevo heroe desde 0 y cuando estemos en la pagina edit se modifique un heroe existente, tenemos que usar el ngOnInit(). Lo que diferencia la pagina new-hero de la pagina edit es que en la pagina new-hero no existe un id en el objeto heroe pero en la pagina edit ya existe un id en el objeto heroe. El ngOnInit() es como el constructor pero de angular. solo se dispara 1 vez cuando se inicializa el componente. Si la url no incluye edit, el heroForm va a seguir sin un id, entonces el comportamiento del onSubmit() va a ser addHero en vez de updateHero. Si por el contrario si existe la palabra edit en la url, se va a obtener hero y se va a rellenar el formHero con los valores de hero, por lo que ahora formHero si va a tener un id y el comportamiento del onSubmit() va a ser updateHero en vez de addHero


import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { switchMap } from 'rxjs';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: ``
})
export class NewPageComponent implements OnInit {


  public heroForm = new FormGroup({ //heroForm va a ser mi formulario reactivo y dentro voy a definir cada una de las propiedades reactivas que quiero que mi formulario maneje.
    id: new FormControl<string>(''),
    superhero: new FormControl<string>('', { nonNullable: true }), //{nonNullable:true} dice que superhero siempre va a ser un string. Es una validación. Los demás al no tener validación pueden estar nuelos
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl(''),
    first_appearance: new FormControl(''),
    characters: new FormControl(''),
    alt_img: new FormControl(''),
  });

  public publishers = [
    { id: 'DC Comics', description: 'DC - Comics' },
    { id: 'Marvel Comics', description: 'Marvel - Comics' },
  ];

  constructor(private heroesService: HeroesService, private activatedRoute: ActivatedRoute, private router: Router, private snackbar: MatSnackBar, private dialog: MatDialog) { }

  get currentHero(): Hero {
    const hero = this.heroForm.value as Hero; //`this.heroForm.value as Hero;` está tomando los valores actuales del formulario y los está tratando como si fueran un objeto del tipo `Hero`
    return hero;
  }

  ngOnInit(): void {//tengo que saber cuando quiero agregar un heroe o cuando quiero actualizar un heroe y eso se sabe si al inicio el id es un string vacío o ya tiene un valor

    if (!this.router.url.includes('edit')) return; //si no incluye la palabra edit significa que estamos en la pagina http://localhost:4200/heroes/new-hero y no hago nada. Si no hago nada, el formulario está con sus valores por defecto (todos los campos estan vacios excepto publisher, es decir el id es un string vacio) y voy a crear un nuevo registro porque en la funcion onSubmit() vamos a caer en el addHero()

    //si si existe la palabra edit en la url, significa que hay que actualizar un heroe ya existente modificando su data
    this.activatedRoute.params
      .pipe(
        switchMap((params) => this.heroesService.getHeroById(params['id'])),
      ).subscribe(hero => {
        if (!hero) return this.router.navigateByUrl('/'); //si no existe el heroe saco a la persona de la pagina
        this.heroForm.reset(hero); //si existe el heroe, el formulario vacio se autocompleta con los valores de hero. Ahora el formulario tiene id y el comportamiento del onSubmit() va a ser updateHero en vez de addHero
        return;
      })
  }



  onSubmit(): void {
    if (this.heroForm.invalid) return; //esto es pq el formulario tiene una validacion en superhero

    //si nuestro heroForm o nuestro currentHero tienen un id  (da igual el que tome pq estan conectados) significa que quiero actuliazar, sino me quiero crear un nuevo objeto
    if (this.currentHero.id) {
      this.heroesService.updateHero(this.currentHero) //me tengo que suscribir al observable que me devuelve la funcion
        .subscribe(hero => {
           this.snackbar.open(`${hero.superhero} actualizado!`, 'done', {
            duration:2500,
           })
        });
      return;
    }

    this.heroesService.addHero(this.currentHero)
      .subscribe(hero => {
        this.router.navigate(['/heroes/edit', hero.id]); //al darle al boton guardar me redirige  a una url de este tipo: http://localhost:4200/heroes/edit/_qmiYCy. "id": "_qmiYCy", es el id que me ha creado para ese nuevo heroe
        this.snackbar.open(`${hero.superhero} creado!`, 'done', {
          duration:2500,
         })
      }
      )
  }

  onDeleteHero() {
    if( !this.currentHero.id) throw Error ('Hero id is required');

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.heroForm.value
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;

      this.heroesService.deleteHeroById(this.currentHero.id)
      .subscribe(wasDeleted => {
        if(wasDeleted) //si nos devuelve un true, entonces voy a redirigir a la pagina de heroes
          this.router.navigate(['/heroes'])
      })

    });
  }
}

