import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from '@features/films/details/details.component';
import { FilmsComponent } from '@features/films/films.component';

const routes: Routes = [
  {
    path: '',
    component: FilmsComponent
  },
  {
    path: ':id',
    component: DetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FilmsRoutingModule { }
