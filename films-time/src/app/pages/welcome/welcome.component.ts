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
    // const item = this.links.find(m => m.link === link);
    // console.log(item);
    // if (item?.link === ''){
      // this.router.navigate([item.link]);      
    // }
    // console.log(item?.link || '');
    
    // if (index !== 0){
    //   // this.router.navigate([link.link], {queryParams: {type: index}});
    //   console.log(link.link)
    //   this.router.navigate([link.link], {
    //     queryParams: {type: index},
    //     // skipLocationChange: true
    //     // state: {link: link.link}
    //   });
    // } else {
    //   this.router.navigate([link.link], {queryParams: {}});
    // }
  }

}
