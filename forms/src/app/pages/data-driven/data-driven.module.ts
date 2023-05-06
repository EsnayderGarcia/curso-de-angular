import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DataDrivenComponent} from "./data-driven.component";
import {RouterModule} from "@angular/router";
import {DataDrivenRoutes} from "./data-driven.routes";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ErrorMessageComponent } from 'src/app/shared/error-message/error-message.component';


@NgModule({
  declarations: [
    DataDrivenComponent,
    ErrorMessageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(DataDrivenRoutes),
  ]
})
export class DataDrivenModule { }
