import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  constructor() { }

  // ngOnInit(): void {
  // }
  @Input() backgroundImg!: string | null;
  @Input() title!: string;
  @Input() year!: number;

  backgroundUrl!: string;
  
  ngOnInit(): void {
    this.backgroundUrl = typeof this.backgroundImg === 'string' ? "url(\'https:\/\/image.tmdb.org/t/p/w154" + this.backgroundImg + "\')" : 'url(../../../assets/not-available.png)';
  }

}
