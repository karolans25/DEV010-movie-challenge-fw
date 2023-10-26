import { Component, OnChanges, OnInit, OnDestroy, SimpleChanges, Output, EventEmitter, ChangeDetectionStrategy, Input, Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class PaginationComponent implements OnInit, OnChanges{

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

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Hubo un cambioo -> ', this.numOfPages);
    // this.numOfPages = 13;
    this.selection = 1;
    this.indixes = 0;
    this.totalPages = [];
    this.createPagesButton(this.createArrayOfTotalNums());
    this.pages = this.totalPages[this.indixes];
    // console.log(this.totalPages);
  }

  ngOnInit(): void{
    this.maxButtons = 12;
    this.selection = 1;
    this.indixes = 0;
    // console.log(this.numOfPages);
    this.totalPages = [];
    this.createPagesButton(this.createArrayOfTotalNums());
    this.pages = this.totalPages[this.indixes];
    // console.log(this.totalPages);
  }

  onPageClicked(index: number): void{
    // console.log('index -> ', index);
    if(index === 1){
      this.indixes = 0;
      this.pages = this.totalPages[this.indixes];
      console.log(this.totalPages);
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
    console.log(this.numOfPages);
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

  createArrayOfTotalNums(): number []{
    const nums: number[] = [];
    for (let i = 1; i < this.numOfPages + 1 ; i++){
      nums.push(i);
    }
    return nums;
  }
  // createPagesButton(){
  //   let packages:number [] = [];
  //   for (let i = 1; i < this.numOfPages + 1; i++){
  //     console.log(this.numOfPages);
  //     if( i % this.maxButtons === 0) {
  //       packages.push(i);
  //       this.totalPages.push(packages);
  //       packages = [];
  //     } else {
  //       packages.push(i); 
  //       if(i===this.numOfPages) this.totalPages.push(packages);
  //     }
  //   }
  // }

  createPagesButton(totalButtons: number[]) {
    let pack: number[];
    console.log(totalButtons);
    if (totalButtons.length > this.maxButtons) {
      console.log('136');
      console.log(this.maxButtons);
      pack = totalButtons.slice(0, this.maxButtons);
      console.log(pack);
      console.log(totalButtons.slice(this.maxButtons, totalButtons.length));
      this.totalPages.push(pack);
      console.log(this.totalPages);
      console.log(totalButtons.length);
      // if(totalButtons.length > 12) this.createPagesButton(totalButtons);
      // else this.totalPages.push(pack);
      // this.totalPages.push(pack);
      // console.log(totalButtons.length);
      this.createPagesButton(totalButtons.slice(this.maxButtons, totalButtons.length));
    } else if(totalButtons.length > 0) {
      console.log('144');
      pack = totalButtons.splice(0, totalButtons.length+1);
      this.totalPages.push(pack);
    } else return;
  }
}