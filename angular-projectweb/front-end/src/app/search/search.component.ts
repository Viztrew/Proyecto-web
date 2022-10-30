import { Component, OnInit } from '@angular/core';
import listRecipes from 'src/assets/json/recipes.json';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  Recipes: any = listRecipes;
  constructor() { }

  ngOnInit(): void {
  }

}
