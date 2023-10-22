import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  typeFilms!: any[];
  routerTypes!: string[];

  constructor(private readonly router: Router){}
  
  ngOnInit(){
    this.typeFilms = [
      {text: 'Movies', link: '/dashboard/movies'}, 
      {text: 'Series', link: '/dashboard/series'}
    ];
  }

  // data = [
  //   { type: 'movie', films: MOVIES},
  //   { type: 'tv', films: SERIES},
  //   { type: 'tv', films: SERIES},
  // ];

  // goSeriesDashboard():void {
  //   this.router.navigate([this.typeFilms[1].link], {queryParams: {data: this.data[1].films}});
  // }

  // getMovies(): void{
  //   console.log('Get Movies');
  //   alert('Get movies');
  // };

  // getSeries(): void{
  //   console.log('Get Series');
  //   alert('Get movies');
  // };
  goRoute(index: number): void {
    console.log(index);
    this.router.navigate([this.typeFilms[index].link], {queryParams: {type: index}});
  }
}
