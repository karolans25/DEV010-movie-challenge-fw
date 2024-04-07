import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilmsRoutingModule } from './films-routing.module';
import { CardComponent } from '@features/films/card/card.component';
import { FilmsComponent } from '@features/films/films.component';
import { OptionsComponent } from '@features/films/options/options.component';
import { PaginatorComponent } from '@features/films/paginator/paginator.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    FilmsComponent,
    CardComponent,
    OptionsComponent,
    PaginatorComponent,
  ],
  imports: [
    CommonModule,
    FilmsRoutingModule,
    ReactiveFormsModule
  ]
})
export class FilmsModule { }
