import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  title = '🎞 \t Movie Time \t 📽️';//'🎞️🎬 \t Movie Time \t 📽️';
  links = [
    {text: 'Movies', link: '/dashboard/movies'}, 
    {text: 'Series', link: '/dashboard/series'},
    {text: 'Home', link: '/home'}
  ];
}
