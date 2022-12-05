import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { eventListeners } from '@popperjs/core';
import { Recetas } from 'src/app/interfaces/data-types';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-receta-card',
  templateUrl: './editar-receta-card.component.html',
  styleUrls: ['./editar-receta-card.component.scss']
})
export class EditarRecetaCardComponent implements OnInit {
  @Input() receta: any
  @Output() sendReceta = new EventEmitter<any>();
  @Input () recibirConfirmacion = new EventTarget();
  valoracion:any= 0;
  constructor() { }

  ngOnInit(): void {
    this.valoracion = this.receta?.valoracion
  }

  async eliminarReceta(receta: Recetas){
    let nombre_receta = (receta.nombre)
    Swal.fire({
      title: '¿Deseas eliminar la Receta:' + nombre_receta.concat('?'),
      text: "La elección será irreversible!",
      icon: 'warning',
      showDenyButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      denyButtonText: `Cancelar`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        let copiaReceta = receta
        this.sendReceta.emit(copiaReceta);
        Swal.fire(
          'Eliminada!',
          'La Receta: ' + nombre_receta + ' ha sido eliminada.',
          'success'
        ).then(result=>{
          window.location.reload()
        })
      }
    })
  }
}
