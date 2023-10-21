import { Component, OnChanges, OnInit, OnDestroy, SimpleChanges, Output, EventEmitter, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class PaginationComponent implements OnInit{

  @Input() numOfPages!: number;
  @Output() newPageEvent= new EventEmitter<number>();

  maxButtons!: number;
  selection!: number;
  pages: number[] = [];

  // ngOnChanges(changes: SimpleChanges): void{
  //   console.log(changes);
  // }

  ngOnInit(): void{
    this.maxButtons = 15;
    this.selection = 1;
    // this.numPages = 15;
    // console.log(this.numOfPages);
    // this.pages = [].constructor(this.selection + this.maxButtons);
    console.log(this.numOfPages);
    for (let i = 1; i < this.numOfPages + 1; i++){
      console.log(i);
    // const num: number = 501;
    // console.log(this.pages);
    // for (let i = 1; i < num; i++){
      this.pages.push(i);
    }
  }

  onPageClicked(index: number): void{
    if (this.selection !== index) {
      this.selection = index;
      console.log('page -> ', this.selection);
      this.newPageEvent.emit(this.selection);
    } else {
      alert(`This is already the page ${index}`);
    }
  }

  onPreviousClicked(): void {
    if (this.selection > 1){
      this.selection -= 1;
      this.newPageEvent.emit(this.selection);
    } else {
      alert('This is already the first page');
    }
  }

  onNextClicked(): void {
    if (this.selection < this.numOfPages){
      this.selection += 1;
      this.newPageEvent.emit(this.selection);
    } else {
      alert('This is already the last page');
    }
  }
}
