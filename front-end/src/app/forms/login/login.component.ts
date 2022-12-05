import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { RecetasService } from 'src/app/services/recetas.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    email: string| undefined;
    password: string | undefined;

  constructor(private http: RecetasService) {}

  login() {
    let usuario = {"email":this.email,"pass":this.password}
    console.log(this.email);
    console.log(this.password);
    this.http.postLogin(usuario).subscribe(data=>{
      if(data.status=='loged'){
        Swal.fire({
          icon: 'success',
          title: 'Logeado',
          showConfirmButton: false,
          timer: 1500
        })
        setTimeout(() => {
          window.location.assign('/home')
        }, 2000);
       
      }
    })
  }
  ngOnInit(): void {
  }
  validacion(){
  }

}
