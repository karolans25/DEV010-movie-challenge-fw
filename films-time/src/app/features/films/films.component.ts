import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from '@shared/models/movie.interface';
import { Serie } from '@shared/models/serie.interface';
import { MOVIES, SERIES } from 'app/data/consts';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.scss']
})
export class FilmsComponent implements OnInit {

  films!: any[];
  movies: Movie[] = MOVIES;
  series: Serie[] = SERIES;
  isMovie: boolean = false;
  isSerie: boolean = false;

  constructor(private router: Router) { 
    console.log(this.router.url);
    // console.log(document.location.pathname);
    if(this.router.url === '/movies'){
      this.films = this.movies;
      console.log(this.films);
      this.isMovie = true;
    } else if (this.router.url === '/series'){
      this.films = this.series;
      console.log(this.films);
      this.isSerie = true;
    }
  }

  // @Input() films!: Movie[] | Serie[];
  @Output() clickedCardEvent= new EventEmitter<number>();
  // caption!: EventTarget | null;
  ngOnInit(): void {
    // this.movies = MOVIES;
    // console.log(this.movies);
  }

  onCardClicked(index: number): void{
    // this.selection = index;
    console.log(index);
    this.clickedCardEvent.emit(index);
  }

  getYearOfDate(date: string): number{
    const objectDate = new Date(date);
    return objectDate.getFullYear();
  }

  showDetailFilm(index: number): void{
    const link = this.router.url + '/' + this.films[index].id;
    // const urlTree = this.router.createUrlTree([link]);
    // const url = this.router.serializeUrl(urlTree);
    const newTab = window.open(link, '_blank'); 
    if(newTab) {
      newTab.opener = null;
    }
  }

}
