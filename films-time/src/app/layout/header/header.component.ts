import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PATHS } from 'app/data/consts';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private readonly router: Router){}

  ngOnInit(): void {
  }

  title = '🎞 \t Movie Time \t 📽️';//'🎞️🎬 \t Movie Time \t 📽️';
  links = PATHS;

  goPath(link: string):void {
    this.router.navigate([link], {queryParams: {}});
  }


}
