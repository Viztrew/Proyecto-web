import { Component, OnInit } from '@angular/core';
import { Recetas, Tipos } from 'src/app/interfaces/data-types';
import { RecetasService } from 'src/app/services/recetas.service';
import { BehaviorSubject, debounceTime, distinctUntilChanged, Subject, Subscription } from 'rxjs';
import { TagData, TagifySettings } from 'ngx-tagify';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  Recetas = new Array<Recetas>();
  Tipos = new Array<Tipos>();
  tipoRecetaTerm$= new Subject<FormGroup>();
  TiposFiltrado = new Array<Tipos>();

  subscription!: Subscription;
  form = new FormGroup({
    tags: new FormControl([])
  });

  settings: TagifySettings = {
    placeholder: 'Tipo de Receta',
    callbacks: {
      click: (e) => { console.log(e.detail); }
    }
  };
  //
  constructor(private http: RecetasService) { }

  ngOnInit(): void {
    this.form
    .valueChanges.subscribe(value => {
      console.log('form value changed', value);
    });

    this.http.getRecetas().subscribe(data =>{
      for (let i = 0 ; i < data.items.length ; i++){
        this.Recetas.push(data.items[i])
      }
    })
    
    this.http.getTipos().subscribe(data =>{
      for (let i = 0 ; i < data.items.length ; i++){
        this.Tipos.push(data.items[i])
      }
    })
    this.TiposFiltrado=this.Tipos;
    this.filtrarTipos();
  }
  filtrarTipos():void{ 
    this.tipoRecetaTerm$
    .pipe(
      debounceTime(400),
      distinctUntilChanged()
    )
    this.subscription = 
    this.tipoRecetaTerm$.subscribe(term =>{
      this.TiposFiltrado = this.Tipos.filter(tipo=>tipo.tipo_receta.toLowerCase().indexOf(term.value.toLowerCase())>=0)
      
    });
  };
  aplicarFiltro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
   //this.tipoRecetaTerm$.next(filterValue)
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
