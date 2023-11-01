import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Movie } from 'src/app/interfaces/movie';
import { Serie } from 'src/app/interfaces/serie';
import { Options } from 'src/app/interfaces/options';
import { Genre } from 'src/app/interfaces/genre';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  
  @Output() updateNumOfPages = new EventEmitter<number>();

  genres!: Genre[];
  numOfPages!: number;
  currentPage!: number;
  params!: Options;
  films!: Movie[] | Serie[];
  type!: string;
  filterOptions!: string[];
  orderOptions!: string[];

  constructor(private readonly dataSvc: DataService, private readonly route: ActivatedRoute, private readonly router: Router){}
  
  ngOnInit(): void {
    this.orderOptions = this.dataSvc.getAllOrderOptions();

    this.route.queryParams.subscribe( (params: Params) => {
      this.type = params['type'];
      this.filterOptions = this.dataSvc.getAllFilterOptions()[parseInt(this.type)];
      this.dataSvc.getAllGenres(this.type)
      .subscribe( response => this.genres = response.genres);
    });

    this.params = {search: '', filter: '0', order: '0', genre: []};
    this.makeARequest(1, this.params);
  }

  searchByPage(page: number): void{
    this.makeARequest(page, this.params);
    this.currentPage = page;
  }

  searchWithOptions(options: Options): void {
    this.params = options;
    this.makeARequest(1, this.params);
  }

  makeARequest(page: number, params: Options): void{
    this.dataSvc.getFilms(page, params, this.type)
    .subscribe( response => {
      this.numOfPages = response.pages;
      this.films = response.films;
      this.updateNumOfPages.emit(this.numOfPages);
    });
  }

  showDetailFilm(index: number): void{
    const link = this.type === '0' ? 'detail/movie' : 'detail/serie';
    const data = {type: this.type, id: this.films[index].id.toString()}
    const queryParams = new URLSearchParams(data).toString();
    const newTab = window.open( link + '?' + queryParams, '_blank');
  }
}
