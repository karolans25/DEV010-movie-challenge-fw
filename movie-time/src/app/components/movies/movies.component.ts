import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../../interfaces/movie';
// import { MOVIES } from './mock-movies';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit{
  selection!: number;
  @Input() movies!: any;
  // caption!: EventTarget | null;

  ngOnInit(): void {
    // this.movies = MOVIES;
    console.log(this.movies);
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