import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { FilmsComponent } from '@features/films/films.component';
import { DetailsComponent } from '@features/films/details/details.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        // component: FilmsComponent,
        loadChildren: () => import('@pages/dashboard/films/films.module').then( m => m.FilmsModule),
        // pathMatch: 'full',
      },
      // {
      //   path: ':id',
      //   component: DetailsComponent,
      //   // loadChildren: () => import('@pages/dashboard/details/details.module').then( m => m.DetailsModule),
      //   // pathMatch: 'full',
      // },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
