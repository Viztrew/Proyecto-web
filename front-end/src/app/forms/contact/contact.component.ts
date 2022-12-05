import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { TitleStrategy } from '@angular/router';
import { Value } from 'sass';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactFormMsg:boolean=false;
  contactForm:FormGroup;

  constructor(public FormB:FormBuilder) {
    this.contactForm=this.FormB.group({
      email: ["",[Validators.required,Validators.email]],
      name: ["",Validators.required],
      subject: ["",Validators.required],
      comments: ["",Validators.required],
      newsletter: [false]
    })
  }
  ngOnInit(): void {
  }
  validacion(){
    this.contactFormMsg = true;
    console.log(this.contactForm.get("newsletter")?.value);
  }
}
