import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DetailComponent } from './components/detail/detail.component';

const routes: Routes = [
  {path: '', redirectTo:'/home', pathMatch: 'full' },
  {path: 'home', component: HomeComponent },
  {path: 'dashboard/movies', component: DashboardComponent },
  {path: 'dashboard/series', component: DashboardComponent },
  {path: 'detail', component: DetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
