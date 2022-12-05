import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-paso-receta',
  templateUrl: './paso-receta.component.html',
  styleUrls: ['./paso-receta.component.scss']
})
export class PasoRecetaComponent implements OnInit {

  @Input() pasoreceta :any

  constructor() { }

  ngOnInit(): void {
  }

}
