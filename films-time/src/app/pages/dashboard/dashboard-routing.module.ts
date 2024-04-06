import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { FilmsComponent } from '@features/films/films.component';
import { DetailsComponent } from '@features/films/details/details.component';

const routes: Routes = [
  {
    path: 'series',
    // component: FilmsComponent
    loadChildren: () => import('@pages/dashboard/dashboard.module').then(m => m.DashboardModule),
  },
  {
    path: 'movies',
    // component: FilmsComponent
    loadChildren: () => import('@pages/dashboard/dashboard.module').then(m => m.DashboardModule),
  },
  {
    path: '',
    component: DashboardComponent
    // loadChildren: () => import('@pages/dashboard/dashboard.module').then(m => m.DashboardModule),
  },
  // {
    // path: ':id',
    // component: DetailsComponent
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
