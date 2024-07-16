import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from '../../../environments/environments';
import { User } from '../interfaces/user.interface';
import { catchError, map, Observable, of, tap } from 'rxjs';

@Injectable({providedIn: 'root'}) //Si se establece en 'root', el servicio será registrado en el inyector de la raíz de la aplicación. Esto hace que el servicio esté disponible de manera global y se comparta una única instancia en toda la aplicación.
export class AuthService {

  private baseUrl = environments.baseUrl;
  private user?: User; //En un determinado momento (cuando la aplicacion se carga por primera vez y no tenemos autenticación) este user no va a existir

  constructor(private http: HttpClient) { }

  get currentUser(): User | undefined {
    if (!this.user) return undefined; //si no existe user
    return structuredClone(this.user)//si existe user, se usa la función structuredClone para devolver una copia profunda del objeto  this.user
  }

  login(email: string, password:string):Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users/1`)
      .pipe(
        tap(user => this.user = user), //el tap no modifica el flujo
        tap(user => localStorage.setItem('token', user.id.toString()) )//quiero grabar el ID del usuario en el localStorage con el nombre de token
        )
  }



  //La función checkAuthentication verifica si hay un token en el localStorage y, si existe, realiza una solicitud HTTP para obtener los datos del usuario, devolviendo un Observable que emite true si el usuario existe y false en caso contrario o si hay algún error.
  checkAuthentication(): Observable<boolean>{ //la función devolverá un Observable que emite valores de tipo boolean.
    if(!localStorage.getItem(`token`)) return of(false) //si el usuario no esta autenticado es porque no existe ningun token en el localStorage y entonces quiero que me retorne  un Observable que emite false

    const token = localStorage.getItem('token');

    return this.http.get<User>(`${this.baseUrl}/users/1`)
      .pipe(
        tap(user => this.user = user), //el tap no hace modificaciones en el flujo
        map(user => !!user), //si el usuario existe necesito que me devuelva un booleano true por eso pongo !!user. Pero al estar el map dentro del pipe me va a devolver un observable que retorne un booleano, un un booleano en sí.
        catchError(err => of(false))
      )
  }



  //para limpiar información
  logout() {
    this.user = undefined; //para eliminar la info que estaba guardada en user
    localStorage.clear(); //para eliminar la info que estaba guardada en el localStorage
  }


}
