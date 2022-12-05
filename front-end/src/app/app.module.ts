import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './bars/header/header.component';
import { FooterComponent } from './bars/footer/footer.component';
import { LoginComponent } from './forms/login/login.component';
import { ContactComponent } from './forms/contact/contact.component';
import { RecipeCardComponent } from './recipe-card/recipe-card.component';
import { SearchComponent } from './forms/search/search.component';
import { TagifyModule } from 'ngx-tagify'; 
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecetaComponent } from './receta/receta.component';
import { PasoRecetaComponent } from './paso-receta/paso-receta.component';
import { CrearRecetaComponent } from './modify/create/crear-receta/crear-receta.component';
import { EditarRecetaCardComponent } from './modify/edit/editar-receta-card/editar-receta-card.component';
import { EditarRecetaComponent } from './modify/edit/editar-receta/editar-receta.component';
import { EditarComponent } from './modify/edit/editar/editar.component';
import { SigninComponent } from './forms/signin/signin.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    ContactComponent,
    RecipeCardComponent,
    SearchComponent,
    RecetaComponent,
    PasoRecetaComponent,
    CrearRecetaComponent,
    EditarRecetaComponent,
    EditarRecetaCardComponent,
    EditarComponent,
    SigninComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    TagifyModule.forRoot(),
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
