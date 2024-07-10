import { Pipe, PipeTransform } from '@angular/core';
import { Hero } from '../interfaces/hero.interface';

@Pipe({
  name: 'heroImage'
})
export class HeroImagePipe implements PipeTransform {

  transform(hero: Hero): string { //recie un hero y retorna un string

    if(!hero.id && !hero.alt_img) {
      return 'assets/no-image.png';
    }

    if (hero.alt_img) return hero.alt_img; //retorna un string de este tipo assets/heroes/dc-batman.jpg

    return `assets/heroes/${hero.id}.jpg`; //cuando no existe hero.alt_img pero si existe hero.id

  }

}
