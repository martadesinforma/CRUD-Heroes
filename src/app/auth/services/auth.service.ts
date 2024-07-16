import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from '../../../environments/environments';
import { User } from '../interfaces/user.interface';
import { Observable, tap } from 'rxjs';

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

  //para limpiar información
  logout() {
    this.user = undefined; //para eliminar la info que estaba guardada en user
    localStorage.clear(); //para eliminar la info que estaba guardada en el localStorage
  }


}
