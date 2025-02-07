import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  typeFilms!: any[];
  
  constructor(private readonly router: Router){}
  
  ngOnInit(){
    this.typeFilms = [
      {text: 'Movies', link: '/dashboard/movies'}, 
      {text: 'Series', link: '/dashboard/series'}
    ];
  }

  goRoute(index: number): void {
    this.router.navigate([this.typeFilms[index].link], {queryParams: {type: index.toString()}});
  }
}
