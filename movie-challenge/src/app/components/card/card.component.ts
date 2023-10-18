import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit{
  // @Input() transform!: string;
  @Input() background!: string;
  @Input() title!: string;
  @Input() year!: string;

  ngOnInit(): void {
      // console.log(this.background);
      console.log(this.title?this.title:'noexiste');
  }
}
