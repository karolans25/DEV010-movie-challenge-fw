import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  typeFilms!: string[];
  routerTypes!: string[];

  ngOnInit(){
    this.typeFilms = ['Movies', 'Series'];
    this.routerTypes = ['/dashboard/movies', '/dashboard/series'];
  }

  // getMovies(): void{
  //   console.log('Get Movies');
  //   alert('Get movies');
  // };

  // getSeries(): void{
  //   console.log('Get Series');
  //   alert('Get movies');
  // };
}
