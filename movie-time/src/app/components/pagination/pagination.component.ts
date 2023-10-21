import { Component, OnChanges, OnInit, OnDestroy, SimpleChanges, Output, EventEmitter, ChangeDetectionStrategy, Input, Renderer2, ElementRef } from '@angular/core';

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
  totalPages: Array<number>[] = [];
  indixes!: number;
  msg!: string;

  constructor(private renderer: Renderer2, private el: ElementRef){}
  // ngOnChanges(changes: SimpleChanges): void{
  //   console.log(changes);
  // }

  ngOnInit(): void{
    this.maxButtons = 12;
    this.selection = 1;
    // this.numPages = 15;
    // console.log(this.numOfPages);
    // this.pages = [].constructor(this.selection + this.maxButtons);
    // console.log(this.numOfPages);
    let packages:number [] = [];
    for (let i = 1; i < this.numOfPages + 1; i++){
      // const num: number = 501;
      // console.log(this.pages);
      // for (let i = 1; i < num; i++){
      // console.log(i);
      if( i % this.maxButtons === 0) {
        packages.push(i);
        this.totalPages.push(packages);
        packages = [];
      } else {
        packages.push(i); 
        if(i===this.numOfPages) this.totalPages.push(packages);
      }
    }
    // this.indixes = this.totalPages.length;
    this.indixes = 0;
    this.pages = this.totalPages[this.indixes];
    // console.log(this.totalPages[this.indixes]);
    // console.log(this.pages);
  }

  onPageClicked(index: number): void{
    // console.log('index -> ', index);
    if(index === 1){
      this.indixes = 0;
      this.pages = this.totalPages[this.indixes];
    } else if(index === this.numOfPages){
      this.indixes = this.totalPages.length - 1;
      this.pages = this.totalPages[this.indixes];
    }

    if (this.selection !== index) {
      this.selection = index;
      // console.log('page -> ', this.selection);
      this.newPageEvent.emit(this.selection);
    } else {
      this.msg = `This is already the page ${index}`;
      this.showToast();
    }
  }

  onPreviousClicked(): void {
    if (this.selection > 1){
      if(this.selection%this.maxButtons === 1){
        this.indixes --;
        this.pages = this.totalPages[this.indixes];
        // console.log(this.pages);
      }
      this.selection -= 1;
      this.newPageEvent.emit(this.selection);
    } else {
      this.msg = `This is already the first page`;
      this.showToast();
    }
  }

  onNextClicked(): void {
    if (this.selection < this.numOfPages){
      if(this.selection%this.maxButtons === 0){
        this.indixes ++;
        this.pages = this.totalPages[this.indixes];
        // console.log(this.pages);
      }
      this.selection += 1;
      this.newPageEvent.emit(this.selection);
    } else {
      this.msg = `This is already the last page`;
      // alert('This is already the last page');
      this.showToast();
    }
  }

  showToast() {
    const toastElement = this.el.nativeElement.querySelector('.toast');
    this.renderer.addClass(toastElement, 'show');
    setTimeout(() => {
      this.renderer.removeClass(toastElement, 'show');
    }, 3000);
  }
}
