import { Component, OnInit, Output } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { MOVIES } from '../films/mock-movies';
import { Movie } from 'src/app/interfaces/movie';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  
  genres!: [];
  movies!: Movie[];
  numOfPages!: number;
  params!: object;

  constructor(private readonly dataSvc: DataService){}
  
  ngOnInit(): void {
    // throw new Error('Method not implemented.');

    // this.dataSvc.getAllGenres()
    // .subscribe( response => {
    //   this.genres = response.genres;
    //   console.log(this.genres);
    // });

    this.movies = MOVIES;
    this.params = {};
    // this.makeARequest(1, this.params);
  }

  searchByPage(page: number): void{
    // console.log('page -> ', page);
    this.makeARequest(page, this.params);
  }

  searchWithOptions(options: object): void{
    console.log(options);
    this.params = options;
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
