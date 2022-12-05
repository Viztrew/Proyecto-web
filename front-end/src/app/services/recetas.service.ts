import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class RecetasService {

  constructor(private http:HttpClient) { }

  HttpUploadOptions = {
    headers:new HttpHeaders(
      {
      'Access-Control-Allow-Origin':'*',
      'Access-Control-Allow-Headers':'Content-Type',
      'Access-Control-Allow-Methods':'GET,POST,DELETE,PUT',
      'Content-Type': 'application/json',
      }
    ),
  }

  getRecetas():Observable<any>{
    return this.http.get(`${environment.baseUrl}/recetas`)
  }

  getReceta(url:string):Observable<any>{
    return this.http.get(`${environment.baseUrl}/receta/${url}`)
  }

  getPasosReceta(id:string):Observable<any>{
    return this.http.get(`${environment.baseUrl}/pasos-receta/${id}`)
  }

  getTipos():Observable<any>{
    return this.http.get(`${environment.baseUrl}/tipos-receta`)
  }
  getDificultades():Observable<any>{
    return this.http.get(`${environment.baseUrl}/dificultades`)
  }
  getPorciones():Observable<any>{
    return this.http.get(`${environment.baseUrl}/porciones`)
  }

  postReceta(receta:any):Observable<any>{
    return this.http.post(`${environment.baseUrl}/insertar-receta`,receta, this.HttpUploadOptions);
  }

  deleteReceta(id:any):Observable<any>{
    return this.http.delete(`${environment.baseUrl}/eliminar-receta/${id}`,this.HttpUploadOptions);
  }

  putReceta(id:any, receta:any):Observable<any>{
    return this.http.put(`${environment.baseUrl}/actualizar-receta/${id}`,receta,this.HttpUploadOptions);
  }

  postSignup(usuario:any):Observable<any>{
    return this.http.post(`${environment.baseUrl}/registrar-usuario`,usuario, this.HttpUploadOptions);
  }
  postLogin(usuario:any):Observable<any>{
    return this.http.post(`${environment.baseUrl}/login`,usuario, this.HttpUploadOptions);
  }
}
