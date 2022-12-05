import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './forms/contact/contact.component';
import { LoginComponent } from './forms/login/login.component';
import { SearchComponent } from './forms/search/search.component';
import { RecetaComponent } from './receta/receta.component';
import { CrearRecetaComponent } from './modify/create/crear-receta/crear-receta.component';
import { EditarComponent } from './modify/edit/editar/editar.component';
import { EditarRecetaComponent } from './modify/edit/editar-receta/editar-receta.component';
import { SigninComponent } from './forms/signin/signin.component';

const routes: Routes = [
  {path:"home", component:HomeComponent},
  {path:"receta/:url", component:RecetaComponent},
  {path:"contact",component:ContactComponent},
  {path:"login",component:LoginComponent},
  {path:"signin",component:SigninComponent},
  {path:"search",component:SearchComponent},
  {path:"crear-receta",component:CrearRecetaComponent},
  {path:"editar",component:EditarComponent},
  {path:"editar/:url",component:EditarRecetaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

