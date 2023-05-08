import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClientsFormComponent } from './clients-form/clients-form.component';
import { ClientsComponent } from './clients/clients.component';

const routes: Routes = [
  {
    path: '',
    component: ClientsComponent,
  },
  {
    path: 'new',
    component: ClientsFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientsRoutingModule {}
