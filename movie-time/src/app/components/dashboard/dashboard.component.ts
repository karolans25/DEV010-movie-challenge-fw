import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Movie } from 'src/app/interfaces/movie';
import { Serie } from 'src/app/interfaces/serie';
import { Options } from 'src/app/interfaces/options';
// import { MOVIES } from 'src/app/components/films/mock-movies';
// import { SERIES } from 'src/app/components/films/mock-series';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  
  @Output() updateNumOfPages = new EventEmitter<number>();

  genres!: [];
  // movies!: Movie[];
  // series!: Serie[];
  numOfPages!: number;
  currentPage!: number;
  params!: Options;
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
    this.orderOptions = this.dataSvc.getAllOrderOptions();

    this.route.queryParams.subscribe( (params: Params) => {
      this.type = params['type'];
      this.filterOptions = this.dataSvc.getAllFilterOptions()[parseInt(this.type)];
    });

    this.params = {search: '', filter: '0', order: '0'};
    console.log(this.numOfPages);
    console.log(this.films);
    this.makeARequest(this.numOfPages, this.params);
    console.log(this.films);
    console.log(this.numOfPages);
  }

  searchByPage(page: number): void{
    // console.log('page -> ', page);
    this.currentPage = page;
    this.makeARequest(this.currentPage, this.params);
  }

  searchWithOptions(options: Options): void {
    this.params = options;
    this.makeARequest(this.currentPage, this.params);
  }

  makeARequest(page: number, params: Options): void{
    this.dataSvc.getFilms(page, params, this.type)
    .subscribe( response => {
      this.numOfPages = response.pages;
      this.films = response.films;
      console.log(this.numOfPages);
      console.log(typeof this.numOfPages);
      this.updateNumOfPages.emit(this.numOfPages);
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
