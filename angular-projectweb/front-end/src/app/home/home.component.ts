import { Component, OnInit } from '@angular/core';

import listRecipes from 'src/assets/json/recipes.json';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  Recipes: any = listRecipes;
  constructor() { }

  ngOnInit(): void {
  }

}
