import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardComponent } from './components/card/card.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { MoviesComponent } from './components/movies/movies.component';
import { FormsModule } from '@angular/forms';
import { PaginationComponent } from './components/pagination/pagination.component';
import { OptionsComponent } from './components/options/options.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    MoviesComponent,
    PaginationComponent,
    OptionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
