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
  currentPage!: number;
  params!: {search: string, filter: string, order: string};
  films!: Movie[] | Serie[];
  type!: string;
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
      this.type = params['type'];
      // switch (params['type']) {
      //   case '0': {
      //     this.films = MOVIES;
      //     this.films = MOVIES;
      //     break;
      //   }
      //   case '1': {
      //     this.films = SERIES;
      //     this.films = MOVIES;
      //     break; 
      //   }
      //   default: {
      //     this.films = MOVIES;
      //     this.films = MOVIES;
      //     break;
      //   }
      // }
    });
    this.params = {search: '', filter: '0', order: '0'};
    // this.movies = MOVIES;
    this.makeARequest(1, this.params);
  }

  searchByPage(page: number): void{
    // console.log('page -> ', page);
    this.currentPage = page;
    this.makeARequest(this.currentPage, this.params);
  }

  searchWithOptions(options: {search: string, filter: string, order: string}): void{
  // searchWithOptions(options: object): void{
    // console.log(options);
    this.params = options;
    this.makeARequest(this.currentPage, this.params);
  }

  makeARequest(page: number, params: {search: string, filter:string, order:string}): void{
    this.dataSvc.getFilms(page, params, this.type)
    .subscribe( response => {
      this.films = response.films;
      // this.movies = movies? movies : MOVIES;
      this.numOfPages = response.pages;
    });
  }

  showDetailFilm(index: number): void{
    console.log(index);
    console.log(this.films[index].id, this.type);
    this.dataSvc.getFilmById(this.films[index].id, this.type)
    .subscribe( response => {
      console.log(response);
    });
  }
}
