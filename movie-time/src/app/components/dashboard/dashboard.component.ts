import { Component, OnInit, Output } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { MOVIES } from 'src/app/components/films/mock-movies';
import { SERIES } from 'src/app/components/films/mock-series';
import { Movie } from 'src/app/interfaces/movie';
import { Serie } from 'src/app/interfaces/serie';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  
  genres!: [];
  // movies!: Movie[];
  // series!: Serie[];
  numOfPages!: number;
  params!: object;
  films!: Movie[] | Serie[];
  filterOptions!: string[];
  orderOptions!: string[];

  constructor(private readonly dataSvc: DataService, private readonly route: ActivatedRoute){}
  
  ngOnInit(): void {
    // throw new Error('Method not implemented.');

    // this.dataSvc.getAllGenres()
    // .subscribe( response => {
    //   this.genres = response.genres;
    //   console.log(this.genres);
    // });
    this.filterOptions = this.dataSvc.getAllFilterOptions();

    this.orderOptions = this.dataSvc.getAllOrderOptions();

    this.route.queryParams.subscribe( (params: Params) => {
      console.log(params['type']);
      console.log(params['type'] === '0')
      switch (params['type']) {
        case '0':
          this.films = MOVIES;
          break;
        case '1':
          this.films = SERIES;
          break; 
        default:
          this.films = MOVIES;
          break;
      }
      // this.movies= this.data;
    });
    this.params = {};
    // this.movies = MOVIES;
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
      this.films = response.movies;
      // this.movies = movies? movies : MOVIES;
      this.numOfPages = response.pages;
      console.log(this.numOfPages);
    });
  }
}
