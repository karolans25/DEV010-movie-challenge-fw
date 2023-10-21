import { Component, OnInit, Output } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
// import { MOVIES } from '../movies/mock-movies';
import { Movie } from 'src/app/interfaces/movie';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  
  genres!: object;
  movies!: Movie[];
  numOfPages!: number;

  constructor(private readonly dataSvc: DataService){}
  
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    // this.dataSvc.getAllGenres()
    // .subscribe( genres => {
    //   this.genres = genres;
    // });

    // this.movies = MOVIES;

    this.makeARequest(1, {});
  }

  searchByPage(page: number): void{
    // console.log('page -> ', page);
    this.makeARequest(page, {});
  }

  makeARequest(page: number, params: object): void{
    this.dataSvc.getMovies(page, params)
    .subscribe( response => {
      this.movies = response.movies;
      // this.movies = movies? movies : MOVIES;
      this.numOfPages = response.pages;
      console.log(this.numOfPages);
    });
  }
}
