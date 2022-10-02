import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  activarMsg:boolean=false;

  formulario:FormGroup;

  constructor(public FormB:FormBuilder) {
    this.formulario=this.FormB.group({
      nombre: ["",Validators.required],
      asunto: ["",Validators.required],
      email:  ["",[Validators.required,Validators.email]],
      comentarios:  ["",Validators.required]
    })
   }

  ngOnInit(): void {
  }
  validacion(){
    console.log(this.formulario.get("nombre")?.value);
    this.activarMsg=true;
  }
}
