import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; //para poder hacer uso de este HttpClient, tengo que importar el modulo HttpClientModule en mi app.module.ts (ya que lo solemos usar en todos los modulos)
import { catchError, Observable, of } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';
import { environments } from '../../../environments/environments';

@Injectable({providedIn: 'root'})
export class HeroesService {

  private baseUrl: string = environments.baseUrl;

  constructor(private http: HttpClient) { }


  //método para traernos la info de todos los heroes en la pagina http://localhost:4200/heroes/list
  getHeroes():Observable<Hero[]> { //esta funcion regresa un Observable que va a estar emitiendo un arreglo de Hero
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes`); //la peticion get me va ha regresar un arreglo de Hero
  }


  //método para traernos la info de cada heroe segun su id en cada pagina http://localhost:4200/heroes/id
  getHeroById(id:string):Observable<Hero|undefined> {//esta funcion regresa un Observable que va a estar emitiendo un Hero o  un undefined
    return this.http.get<Hero>(`${this.baseUrl}/heroes/${id}`) //la peticion get me va ha regresar un Hero
      .pipe( //El método pipe se usa para encadenar operadores que pueden manipular el Observable resultante. En este caso, Si ocurre un error durante la petición HTTP, catchError se activa y ejecuta la función proporcionada, y en vez de regresar un Observable que va a estar emitiendo un Hero, ahora el observable va a estar emitiendo undefined
        catchError(error => of(undefined)) //Si tengo un error voy a regresar un Observable que retorna undefined. La función of de RxJS se usa para crear un Observable que emite el valor undefined.
      )
  }


  //método para crear el autocompletado de la pagina http://localhost:4200/heroes/search
  getSuggestions(query: string):Observable<Hero[]> { //esta funcion regresa un Observable que va a estar emitiendo un arreglo de Hero
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes?q=${query}&_limit=6`); //la peticion get me va ha regresar un arreglo de Hero o un arreglo de Hero vacio si lo que escribimos no existe en la base de datos
  }
}
