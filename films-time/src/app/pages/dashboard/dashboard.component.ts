import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Movie } from '@shared/models/movie.interface';
import { Serie } from '@shared/models/serie.interface';
import { MOVIES, SERIES } from 'app/data/consts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  films!: Movie[] | Serie[];
  movies: Movie[] = MOVIES;
  series: Serie[] = SERIES;

  constructor(@Inject(DOCUMENT) document: any) {
    console.log(document.location.href);
    if(document.location.href === 'http://localhost:4200/movies'){
      this.films = this.movies;
    } else if (document.location.href === 'http://localhost:4200/series'){
      this.films = this.series;
    }
  }

  ngOnInit() {
  
  }

  clickedCardEvent(index: number){
    console.log('Dashboard: ', index);
  }
}
