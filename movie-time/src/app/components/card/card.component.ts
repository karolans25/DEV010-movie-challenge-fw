import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent implements OnInit{
  // @Input() transform!: string;
  @Input() backgroundImg!: string | null;
  @Input() title!: string;
  @Input() year!: number;

  backgroundUrl!: string;
  
  ngOnInit(): void {
    this.backgroundUrl = typeof this.backgroundImg === 'string' ? "url(\'https:\/\/image.tmdb.org/t/p/w154" + this.backgroundImg + "\')" : 'url(../../../assets/not-available.png)';
  }
}