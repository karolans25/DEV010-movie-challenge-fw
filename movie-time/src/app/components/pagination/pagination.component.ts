import { Component, OnChanges, OnInit, OnDestroy, SimpleChanges, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
// export class PaginationComponent implements OnChanges, OnInit, OnDestroy{
export class PaginationComponent implements OnInit{
  @Output() newPageEvent= new EventEmitter<number>();

  selection!: number;
  numPages!: number;
  pages!: [];

  // ngOnChanges(changes: SimpleChanges): void{
  //   console.log(changes);
  // }

  ngOnInit(): void{
    this.selection = 0;
    this.numPages = 10;
    this.pages = [].constructor(this.numPages);
  }

  onPageClicked(index: number): void{
    if (this.selection !== index) {
      this.selection = index;
      this.newPageEvent.emit(this.selection);
    } else {
      alert(`This is already the page ${index+1}`);
    }
  }

  onPreviousClicked(): void {
    if (this.selection > 0){
      this.selection -= 1;
      this.newPageEvent.emit(this.selection);
    } else {
      alert('This is already the first page');
    }
  }

  onNextClicked(): void {
    if (this.selection < 9){
      this.selection += 1;
      this.newPageEvent.emit(this.selection);
    } else {
      alert('This is already the last page');
    }
  }
}
