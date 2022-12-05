import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss']
})

export class RecipeCardComponent implements OnInit {
  
  @Input() receta :any
  

  valoracion:any= 0;
  constructor() {}
  
  ngOnInit(): void {
    this.valoracion = this.receta?.valoracion
  }
}

