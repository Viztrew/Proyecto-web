import { Component, OnInit } from '@angular/core';
import detailOfRecipes from 'src/assets/json/detail-recipe.json';
import * as $ from 'jquery';
//import { ActivatedRoute,Params } from '@angular/router';
declare var bootstrap: any;

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  RecipeDetails: any = detailOfRecipes;

  constructor() { 
  
  }

  ngOnInit(): void {
    var estado = false;
    $("span").click(function(){
      if(!estado){
        $("span").removeClass("not-fill");  
        $("span").addClass("fill");
        estado=true;
      }else{
        $("span").removeClass("fill");  
        $("span").addClass("not-fill");
        estado=false;
      }
    });

    // Bootstrap tooltip initialization
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip2"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
    })
    /*
    this.rutaActiva.params.subscribe((params: Params) =>{
      this.url = params.url;
    });*/
  }

}
