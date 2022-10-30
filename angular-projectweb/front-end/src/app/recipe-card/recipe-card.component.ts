import { Component, OnInit, Input } from '@angular/core';
import listRecipes from 'src/assets/json/recipes.json';
declare var bootstrap: any;
@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss']
})

export class RecipeCardComponent implements OnInit {
  
  @Input() recipe :any = listRecipes;

  constructor() {
    
  }
  
  ngOnInit(): void {
    var estado = false;
    $(".favorite-overlay").click(function(){
      if(!estado){
        $(".favorite-overlay").removeClass("not-fill");  
        $(".favorite-overlay").addClass("fill");
        estado=true;
      }else{
        $(".favorite-overlay").removeClass("fill");  
        $(".favorite-overlay").addClass("not-fill");
        estado=false;
      }
    });

    // Bootstrap tooltip initialization
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
    })
        
  }
}
