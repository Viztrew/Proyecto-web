
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor() {
   }
   
  ngOnInit(){
    $(function()
    {
      $("#contact-form").validate({
        rules: {
          name: {
            required: true,
            minlength: 3
          },
          subject: {
            required: true,
            minlength: 3
          },
          email: {
            required: true,
            email: true
          },
          comments: {
            required:true,
            minlenght: 20
          }
        },
        messages : {
          name: {
            required: "Campo obligatorio",
            minlength: "Nombre debe tener al menos 3 caracteres"
          },
          subject: {
            required: "Campo obligatorio",
            minlength: "Asunto debe tener al menos 3 caracteres"
          },
          email: {
            required: "Campo obligatorio",
            email: "Formato inválido, ingrese un email válido, Ej: Example@mail.com"
          },
          comments: {
            required: "Campo obligatorio",
          }
        },
        submitHandler: function(form) {
          form.submit();
          
        }
      });
    })
  }
}