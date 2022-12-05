import { Component, OnInit } from '@angular/core';
import { RecetasService } from '../services/recetas.service';
import { Recetas } from '../interfaces/data-types';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  Recetas = new Array<Recetas>();
  constructor(private http: RecetasService) { }

  ngOnInit(): void {
    this.http.getRecetas().subscribe(data =>{
      for (let i = 0 ; i < data.items.length ; i++){
        this.Recetas.push(data.items[i])
      }
      console.log(this.Recetas.length)
    })
  }

}
