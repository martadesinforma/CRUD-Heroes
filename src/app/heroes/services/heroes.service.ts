import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; //para poder hacer uso de este HttpClient, tengo que importar el modulo HttpClientModule en mi app.module.ts (ya que lo solemos usar en todos los modulos)
import { catchError, map, Observable, of } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';
import { environments } from '../../../environments/environments';

@Injectable({ providedIn: 'root' })
export class HeroesService {

  private baseUrl: string = environments.baseUrl;

  constructor(private http: HttpClient) { }


  //método para traernos la info de todos los heroes en la pagina http://localhost:4200/heroes/list
  getHeroes(): Observable<Hero[]> { //esta funcion regresa un Observable que va a estar emitiendo un arreglo de Hero
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes`); //la peticion get me va ha regresar un arreglo de Hero
  }


  //método para traernos la info de cada heroe segun su id en cada pagina http://localhost:4200/heroes/id
  getHeroById(id: string): Observable<Hero | undefined> {//esta funcion regresa un Observable que va a estar emitiendo un Hero o  un undefined
    return this.http.get<Hero>(`${this.baseUrl}/heroes/${id}`) //la peticion get me va ha regresar un Hero
      .pipe( //El método pipe se usa para encadenar operadores que pueden manipular el Observable resultante. En este caso, Si ocurre un error durante la petición HTTP, catchError se activa y ejecuta la función proporcionada, y en vez de regresar un Observable que va a estar emitiendo un Hero, ahora el observable va a estar emitiendo undefined
        catchError(error => of(undefined)) //Si tengo un error voy a regresar un Observable que retorna undefined. La función of de RxJS se usa para crear un Observable que en este caso emite el valor undefined.
      )
  }


  //método para crear el autocompletado de la pagina http://localhost:4200/heroes/search
  getSuggestions(query: string): Observable<Hero[]> { //esta funcion regresa un Observable que va a estar emitiendo un arreglo de Hero
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes?q=${query}&_limit=6`); //la peticion get me va ha regresar un arreglo de Hero o un arreglo de Hero vacio si lo que escribimos no existe en la base de datos
  }


  //CRUD
  //quiero subir un nuevo objeto, un nuevo registro
  addHero(hero: Hero): Observable<Hero> { //esta funcion regresa un Observable que va a estar emitiendo un  Hero
    return this.http.post<Hero>(`${this.baseUrl}/heroes`, hero) //el segundo argumento es la data que quiero enviar en la peticion Post y el primer argumento es donde la voy a enviar. la peticion post me va ha regresar un Hero
  }


  //solo quiero actualizar parte del objeto, parte de su registro
  updateHero(hero: Hero): Observable<Hero> { //esta funcion regresa un Observable que va a estar emitiendo un  Hero
    if (!hero.id) throw Error('Hero id is requiered')
    return this.http.patch<Hero>(`${this.baseUrl}/heroes/${hero.id}`, hero) //el segundo argumento es la data que quiero enviar en la peticion Path y el primer argumento es donde la voy a enviar. la peticion path me va ha regresar un Hero
  }


  // quiero borrar un  objeto, su registro. Quiero que me retorne un valor booleano que me diga si se ha borrado correctamente o no
  deleteHeroById(id: string): Observable<boolean> { //esta funcion regresa un Observable que va a estar emitiendo un booleano
    return this.http.delete(`${this.baseUrl}/heroes/${id}`) // el primer argumento es donde la voy a enviar
      .pipe( //El método pipe se usa para encadenar operadores que pueden manipular el Observable resultante. En este caso, Si ocurre un error durante la petición HTTP, catchError se activa y ejecuta la función proporcionada, y en vez de regresar un Observable que va a estar emitiendo un booleano, ahora el observable va a estar emitiendo false
        catchError(error => of(false)), //Si tengo un error voy a regresar un Observable que retorna false. La función of de RxJS se usa para crear un Observable que en este caso emite el valor false ya que catchError se utiliza para transformar ese error en un nuevo flujo que emite un valor específico
        map(resp => true) //El operador `map` toma cada valor emitido por un `Observable` y lo transforma. No crea un nuevo `Observable`, sino que transforma los valores dentro del flujo del `Observable` existente. En este caso, transforma cualquier respuesta (`resp`) de la solicitud HTTP en `true`, estamos diciendo que el `Observable` emitirá `true` en lugar de la respuesta HTTP original.
      )
  }
}


