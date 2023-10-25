import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(private readonly router: Router){}

  title = '🎞 \t Movie Time \t 📽️';//'🎞️🎬 \t Movie Time \t 📽️';
  links = [
    {text: 'Movies', link: '/dashboard/movies'}, 
    {text: 'Series', link: '/dashboard/series'},
    {text: 'Home', link: '/home'}
  ];

  goPath(link: any):void {
    const index = this.links.indexOf(link);
    if (index !== this.links.length - 1){
      this.router.navigate([link.link], {queryParams: {type: index}});
    } else {
      this.router.navigate([link.link], {queryParams: {}});
    }
  }
}
