import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsComponent } from './clients/clients.component';
import { ClientsRoutingModule } from './clients-routing.module';
import { RatingModule } from 'ngx-bootstrap/rating';



@NgModule({
  declarations: [
    ClientsComponent
  ],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    RatingModule.forRoot(
    )
  ]
})
export class ClientsModule { }
