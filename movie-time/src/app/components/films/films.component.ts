import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../../interfaces/movie';
import { Serie } from '../../interfaces/serie';
// import { MOVIES } from './mock-movies';

@Component({
  selector: 'app-movies',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.scss']
})
export class FilmsComponent implements OnInit {
  selection!: number;

  // @Input() films!: Movie[] | Serie[]; // ¿Por qué tenía que ser de tipo any?
  // caption!: EventTarget | null;
  @Input() films!: any[]; // ¿Por qué tenía que ser de tipo any?
  // caption!: EventTarget | null;

  ngOnInit(): void {
    // this.movies = MOVIES;
    // console.log(this.movies);
  }

  onCardClicked(index: number): void{
    this.selection = index;
    console.log(index);
  }

  getYearOfDate(date: string): number{
    const objectDate = new Date(date);
    return objectDate.getFullYear();
  }
}