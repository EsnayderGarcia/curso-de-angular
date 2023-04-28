import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutes} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {DataDrivenModule} from "./pages/data-driven/data-driven.module";
import {RouterModule} from "@angular/router";

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
    DataDrivenModule,
    RouterModule.forRoot(AppRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
