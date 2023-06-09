import {Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';

export const AppRoutes: Routes = [
  {
    path: '', pathMatch: 'full',  redirectTo: 'home'
  },
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'data-driven', loadChildren: () => import('./pages/data-driven/data-driven.module').then(x => x.DataDrivenModule)
  },
];

