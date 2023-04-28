import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DataDrivenComponent} from "./data-driven.component";
import {RouterModule} from "@angular/router";
import {DataDrivenRoutes} from "./data-driven.routes";
import {ControlErrorComponent} from "../../shared/control-error/control-error.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    DataDrivenComponent,
    ControlErrorComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(DataDrivenRoutes),
  ]
})
export class DataDrivenModule { }
