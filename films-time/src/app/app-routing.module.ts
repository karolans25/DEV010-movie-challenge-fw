import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { DashboardModule } from '@pages/dashboard/dashboard.module';

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent
  },
  {
    path: 'movies',
    loadChildren: () => import('@pages/dashboard/dashboard.module').then(m => m.DashboardModule),
  },
  {
    path: 'series',
    loadChildren: () => import('@pages/dashboard/dashboard.module').then(m => m.DashboardModule),
  },
  {
    path: '**', redirectTo: '', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
