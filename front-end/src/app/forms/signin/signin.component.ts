import { Component, OnInit } from '@angular/core';
import { RecetasService } from 'src/app/services/recetas.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  email: string | undefined;
  password: string | undefined;
  confirmPassword: string | undefined;

  constructor(private http: RecetasService) {}

  register() {
    if (this.password != this.confirmPassword){
      console.log("contraseñas no coinciden")
    }else{
      let usuario = {"email":this.email,"pass":this.password}
      this.http.postSignup(usuario).subscribe(data=>{
        if(data.status=='registered'){
          Swal.fire({
            icon: 'success',
            title: 'Registrado',
            showConfirmButton: false,
            timer: 1500
          })
          setTimeout(() => {
            window.location.assign('/login')
          }, 2000);
         
        }else{
          Swal.fire({
            icon: 'warning',
            title: 'Usuario no encontrado',
            showConfirmButton: false,
            timer: 1500
          })
          setTimeout(() => {
            window.location.assign('/signin')
          }, 2000);
        }
      })
    }
    
  }
  ngOnInit(): void {
  }

}
