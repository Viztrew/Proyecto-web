import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginMsg:boolean=false;
  login:FormGroup;

  constructor(public FormB:FormBuilder) {
    this.login=this.FormB.group({
      email: ["",[Validators.required,Validators.email]],
      password: ["",Validators.required]
    })
  }

  ngOnInit(): void {
  }
  validacion(){
    this.loginMsg = true;
  }

}
