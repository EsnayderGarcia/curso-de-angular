import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsComponent } from './clients/clients.component';
import { ClientsRoutingModule } from './clients-routing.module';
import { CpfPipe } from 'src/app/pipes/cpf.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientsFormComponent } from './clients-form/clients-form.component';

@NgModule({
  declarations: [
    ClientsComponent,
    CpfPipe,
    ClientsFormComponent
  ],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ClientsModule { }
