import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutes} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from "@angular/router";
import {DropdownService} from "./services/dropdown.service";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule, //Módulo que nos permite trabalhar com formulários reativos no angular
    HttpClientModule,
    RouterModule.forRoot(AppRoutes)
  ],
  providers: [DropdownService],
  bootstrap: [AppComponent]
})
export class AppModule { }
