import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import Swal from 'sweetalert2'
import { Recetas, Tipos, Dificultades, Porciones} from '../../../interfaces/data-types';
import { RecetasService } from '../../../services/recetas.service';
@Component({
  selector: 'app-crear-receta',
  templateUrl: './crear-receta.component.html',
  styleUrls: ['./crear-receta.component.scss']
})
export class CrearRecetaComponent implements OnInit {

  urls:any = []
  Tipos = new Array<Tipos>();
  Dificultades = new Array<Dificultades>();
  Porciones = new Array<Porciones>();
  // Place Holders de una receta, Valores editables
  PlaceHolders:Recetas = {'id_receta':0,'nombre':'Nombre Receta','imagen':'assets/img/no-image.jpg','valoracion':0,'porcion':'1 Persona','valor':0,'tiempo':0,
  'dificultad':'Baja',tipo_receta:'Desayuno',calorias:0,descripcion:'Descripcion de la receta',url:'a'};

  DatosReceta:any = {'nombre':'Nombre Receta','imagen':'assets/img/non-photo.jpg','valoracion':0,'porcion':1,'valor':0,'tiempo':0,
  'dificultad':1,tipo_receta:1,calorias:0,descripcion:'Descripcion de la receta',url:'a'}

  private notificarCargaCompleta = new Subject();

  constructor(private http: RecetasService) {
    this.notificarCargaCompleta.subscribe(r => {
      // código a ejecutar cuando la imágen esté cargada
      console.log("imagenes cargadas");
      console.log(this.urls);
      this.PlaceHolders.imagen=this.urls[0];
      this.DatosReceta.imagen=this.urls[0];
    }); 
  }

  ngOnInit(): void {
    // Se obtienes los tipo de receta mediante el servicio recetas
    this.http.getTipos().subscribe(data =>{
      for (let i = 0 ; i < data.items.length ; i++){
        this.Tipos.push(data.items[i])
      }
    })
     // Se obtienes las dificultades de las recetas mediante el servicio recetas
     this.http.getDificultades().subscribe(data =>{
      for (let i = 0 ; i < data.items.length ; i++){
        this.Dificultades.push(data.items[i])
      }
      console.log(this.Dificultades)
    })
     // Se obtienes los tipo de receta mediante el servicio recetas
     this.http.getPorciones().subscribe(data =>{
      for (let i = 0 ; i < data.items.length ; i++){
        this.Porciones.push(data.items[i])
      }
      console.log(this.Porciones)
    })

    
  }
  /*---- Funciones de edicion -----*/
  // Nombre Receta
  async editarTitulo(){
    const {value:nombre} = await Swal.fire({
      title:'Nombre Receta',
      input:'text',
      showCancelButton: true,
    })
    if(nombre){
      this.PlaceHolders.nombre=nombre;
      this.DatosReceta.nombre=nombre;
      this.DatosReceta.url = this.crearURL(nombre.split(" "));
    }
  }
  crearURL(nombre:string[]){
    let url:string = ''
    for ( let i = 0 ; i < nombre.length ; i++){
      if((i+1) == nombre.length){
        url=url.concat(nombre[i].toLocaleLowerCase()) 
      }else{
        url=url.concat(nombre[i].toLocaleLowerCase(),'-') 
      }
    }
    return url;
  }
  // Descripcion
  async editarDescripcion(){
    const {value:descripcion} = await Swal.fire({
      title:'Descripcion de la Receta',
      input:'text',
      showCancelButton: true,
    })
    if(descripcion){
      this.PlaceHolders.descripcion=descripcion;
      this.DatosReceta.descripcion=descripcion;
    }
  }
  // Calorias
  async editarCalorias(){
    const {value:calorias} = await Swal.fire({
      title:'Calorías de la Receta',
      input:'number',
      showCancelButton: true,
    })
    if(calorias){
      this.PlaceHolders.calorias=calorias;
      this.DatosReceta.calorias=calorias;
    }
  }
  // Tiempo Preparación
  async editarTiempo(){
    const {value:tiempo} = await Swal.fire({
      title:'Tiempo de Preparación',
      input:'number',
      inputLabel:'Minutos',
      showCancelButton: true,
    })
    if(tiempo){
      this.PlaceHolders.tiempo=tiempo;
      this.DatosReceta.tiempo=tiempo;
    }
  }
  // Valor Preparación
  async editarValor(){
    const {value:valor} = await Swal.fire({
      title:'Valor de Preparación',
      input:'number',
      showCancelButton: true,
    })
    if(valor){
      this.PlaceHolders.valor=valor;
      this.DatosReceta.valor=valor;
    }
  }
  // Tipo de Receta
  async editarTipo(){
    const { value: tipo} = await Swal.fire({
      title: 'Tipo de Receta',
      input: 'select',
      inputOptions: this.Tipos.map(e=>e.tipo_receta),
      inputPlaceholder: 'Tipo de Receta',
      showCancelButton: true
    })
    if (tipo) {
      let id_tipo:any;
      let nombre_tipo:any;
      this.Tipos.map(function(element,index,arr){
        if (tipo == index){
          id_tipo=(element.id_tipo_receta)
          nombre_tipo=(element.tipo_receta)
        }
      })
      this.PlaceHolders.tipo_receta=nombre_tipo;
      this.DatosReceta.tipo_receta=id_tipo;
    }
  }
  // Porcion de Receta
  async editarPorcion(){
    const { value: porcion} = await Swal.fire({
      title: 'Porcion de Receta',
      input: 'select',
      inputOptions: this.Porciones.map(e=>e.porcion),
      inputPlaceholder: 'Cantidad de Porciones',
      showCancelButton: true
    })
    if (porcion) {
      let id_porcion:any;
      let nombre_porcion:any;
      this.Porciones.map(function(element,index,arr){
        if (porcion == index){
          id_porcion=(element.id_porcion)
          nombre_porcion=(element.porcion)
        }
      })
      this.PlaceHolders.porcion=nombre_porcion;
      this.DatosReceta.porcion=id_porcion;
    }
  }
  // Dificultad de Receta
  async editarDificultad(){
    const { value: dificultad} = await Swal.fire({
      title: 'Dificultad de Receta',
      input: 'select',
      inputOptions: this.Dificultades.map(e=>e.dificultad),
      inputPlaceholder: 'Dificultad',
      showCancelButton: true
    })
    if (dificultad) {
      let id_dificultad:any;
      let nombre_dificultad:any;
      this.Dificultades.map(function(element,index,arr){
        if (dificultad == index){
          id_dificultad=(element.id_dificultad)
          nombre_dificultad=(element.dificultad)
        }
      })
      console.log('Tipo:'+nombre_dificultad+'id: '+id_dificultad)
      this.PlaceHolders.dificultad = nombre_dificultad;
      this.DatosReceta.dificultad = id_dificultad;
      ;
    }
  }
  postReceta(){
    let nombre = this.DatosReceta.nombre
    Swal.fire({
      title: '¿Deseas crear la Receta:'+'    '+ '"' + nombre +'"?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Crear',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.postReceta(JSON.stringify(this.DatosReceta)).subscribe(data=>{
          console.log(data)
        });
        Swal.fire('Receta Creada!', '', 'success').then((result) =>{
          window.location.assign('/receta/'+this.DatosReceta.url)
        })
      } else if (result.isDenied) {
        Swal.fire('No se ha creado la Receta', '', 'info')
      }
    })
      
  }
  /*------------------------------------*/
  onselect(e:any) {
    if (e.target.files) {
      this.urls = []
      var filesAmount = e.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[i]);
        reader.onload = (events: any) => {
          this.urls.push(events.target.result);

          if (this.urls.length == filesAmount) {
           
            this.notificarCargaCompleta.next(1);
          }
        }
      }
    }
    console.log(this.urls)
  }
}
