import { Component, OnInit,OnDestroy, Input } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Subscription } from 'rxjs';
import { RecetasService } from '../services/recetas.service';
import { Recetas, Pasos} from '../interfaces/data-types';
@Component({
  selector: 'app-receta',
  templateUrl: './receta.component.html',
  styleUrls: ['./receta.component.scss']
})
export class RecetaComponent implements OnInit {
  
  /*------ Rutas reactivas -------*/
  // ruta activa
  currentUrl:any
  // suscripcion
  paramsSubscription: Subscription | undefined

  /* json con los detalles de la receta obtenidos del servicio recetas*/
  DetallesReceta: Recetas | undefined;
 /*-------------------------------*/

  PasosReceta = new Array<Pasos>();
  id_receta:any
  valoracion:any= 0;
  
  constructor(private route:ActivatedRoute, private http:RecetasService) { }

  ngOnInit(): void {
    
    // Se obtiene la url en el instante en que el componente es creado
    this.currentUrl = this.route.snapshot.params['url']

    // Se suscribe al observable params para obtener la url actualizada
    this.paramsSubscription = this.route.params.subscribe((updateUrl)=>{
      this.currentUrl = updateUrl['url']
    });

    // Se obtiene la receta mediante el metodo getReceta del servicio recetas
    this.http.getReceta(this.currentUrl).subscribe(data =>{
      this.DetallesReceta = data.item
      this.valoracion = this.DetallesReceta?.valoracion
      this.id_receta = this.DetallesReceta?.id_receta
      
      this.http.getPasosReceta(this.id_receta).subscribe(data =>{
        for (let i = 0 ; i < data.items.length ; i++){
          this.PasosReceta.push(data.items[i])
        }
      })
    })
  }

  // al destruir el componente, se desinscribe el observable
  ngOnDestroy(){
    this.paramsSubscription?.unsubscribe();
  }
}