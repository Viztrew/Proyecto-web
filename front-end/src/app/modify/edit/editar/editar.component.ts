import { Component, EventEmitter, OnInit } from '@angular/core';
import { Recetas } from 'src/app/interfaces/data-types';
import { RecetasService } from 'src/app/services/recetas.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss']
})
export class EditarComponent implements OnInit {

  Recetas = new Array<Recetas>();
  enviarConfirmacion = new EventEmitter<any>();
  constructor(private http: RecetasService) { } 

  ngOnInit(): void {
    this.http.getRecetas().subscribe(data =>{
      for (let i = 0 ; i < data.items.length ; i++){
        this.Recetas.push(data.items[i])
      }
      console.log(this.Recetas.length)
    })
  }

  eliminarReceta(receta : Recetas){
    this.http.deleteReceta(receta.id_receta).subscribe(data=>{
      if(data.status == 'ok'){
        console.log("receta a eliminada: " + receta.nombre)
      }
    })
  }
}
