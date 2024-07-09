import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'heroes-hero-card',
  templateUrl: './card.component.html',
  styles: ``
})
export class CardComponent implements OnInit {

  @Input() //para recibir datos de un componente padre, en este caso ListPageComponent
  public hero!: Hero;

  ngOnInit(): void {
   if (!this.hero) throw Error('Hero property is required')
  }
}
