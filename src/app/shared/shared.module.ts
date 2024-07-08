import { NgModule } from '@angular/core';
import { Error404PageComponent } from './pages/error404-page/error404-page.component';



@NgModule({
  declarations: [ //Declarar componentes en el archivo module.ts correspondiente a su carpeta es crucial para mantener el código limpio y manejable.
    Error404PageComponent
  ],

  exports: [ // exporto este componente porque quiero que sea una ruta  que voy a tener  por defecto en mi app-routing.module.ts
    Error404PageComponent,
  ]
})
export class SharedModule { }
