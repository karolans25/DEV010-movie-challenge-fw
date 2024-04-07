import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiTmdbInterceptor } from '@shared/interceptors/api-tmdb.interceptor';
import { OptionsComponent } from './features/films/options/options.component';
import { PaginatorComponent } from './features/films/paginator/paginator.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiTmdbInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent],
  exports: [
    HeaderComponent,
    FooterComponent,
    CommonModule,
  ]
})
export class AppModule { }
