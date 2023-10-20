import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent implements OnInit{
  // @Input() transform!: string;
  @Input() background!: string;
  @Input() title!: string;
  @Input() year!: number;

  ngOnInit(): void {
      // console.log(this.background);
      console.log(this.title?this.title:'noexiste');
  }
}