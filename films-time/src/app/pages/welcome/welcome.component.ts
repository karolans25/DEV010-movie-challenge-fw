import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PATHS } from 'app/data/consts';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  links = PATHS;
  
  constructor(private readonly router: Router){}
  
  ngOnInit(){ }

  goPath(link: string):void {
    console.log(link);
    this.router.navigate([link], {queryParams: {}});
  }

}
