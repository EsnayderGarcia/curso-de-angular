import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsComponent } from './clients/clients.component';
import { ClientsRoutingModule } from './clients-routing.module';
import { CpfPipe } from 'src/app/pipes/cpf.pipe';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ClientsComponent,
    CpfPipe
  ],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    FormsModule
  ]
})
export class ClientsModule { }
