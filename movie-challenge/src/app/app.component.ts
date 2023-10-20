import { Component, OnChanges, OnInit, OnDestroy, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnChanges, OnInit, OnDestroy {
  title = 'movie-challenge';
  pageTitle = 'Movie Time';

  // constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Change -> ', changes);
  }

  ngOnInit(): void {
    console.log('OnInit -> ');
  }

  ngOnDestroy(): void {
    console.log('Destroy -> ');
  }
}
