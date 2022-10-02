import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
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

  }
}
