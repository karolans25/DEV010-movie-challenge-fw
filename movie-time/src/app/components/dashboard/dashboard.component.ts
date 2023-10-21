import { Component, OnInit, Output } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { MOVIES } from '../movies/mock-movies';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  
  genres!: object;
  movies!: object;

  constructor(private readonly dataSvc: DataService){}
  
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.dataSvc.getAllGenres()
    .subscribe( genres => {
      this.genres = genres;
    });

    this.dataSvc.getMovies()
    .subscribe( movies => {
      console.log(movies);
      this.movies = movies;
      // this.movies = movies? movies : MOVIES;
    });

    console.log(this.genres);
    console.log(this.movies);
  }

  searchByPage(page: number): void{
    console.log('click on page -> ', page+1);
  }
}
