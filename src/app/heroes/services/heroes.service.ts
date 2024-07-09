import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; //para poder hacer uso de este HttpClient, tengo que importar el modulo HttpClientModule en mi app.module.ts (ya que lo solemos usar en todos los modulos)
import { Observable } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';
import { environments } from '../../../environments/environments';

@Injectable({providedIn: 'root'})
export class HeroesService {

  private baseUrl: string = environments.baseUrl;

  constructor(private http: HttpClient) { }

  getHeroes():Observable<Hero[]> { //esta funcion regresa un Observable que va a estar emitiendo un arreglo de Hero
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes`); //la peticion get me va ha regresar un arreglo de Hero
  }

}
