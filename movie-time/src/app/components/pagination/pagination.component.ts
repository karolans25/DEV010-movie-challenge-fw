import { Component, OnChanges, OnInit, OnDestroy, SimpleChanges, Output, EventEmitter, ChangeDetectionStrategy, Input, Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class PaginationComponent implements OnInit, OnChanges{

  @Input() numTotalPages!: number; // Num total of buttons needed
  @Output() newPageEvent= new EventEmitter<number>();

  maxButtons!: number; // Num of buttons per view
  selection!: number;  // Page selected
  pages: number[] = []; // 
  totalPagesPackaged: Array<number>[] = [];
  index!: number;
  msg!: string;
  nums!: number[];
  // max!: number;

  constructor(private renderer: Renderer2, private el: ElementRef){}
  // ngOnChanges(changes: SimpleChanges): void{
  //   console.log(changes);
  // }

  ngOnChanges(changes: SimpleChanges): void {
      console.log('Hubo un cambioo -> ', this.numTotalPages);
      this.nums = [];
      for(let i = 1; i< this.numTotalPages +1 ; i++) this.nums.push(i);
      this.result = [];
      // this.result.splice(0, this.result.length);
      this.createPagesButton(this.nums);
  }

  ngOnInit(): void{
    // this.maxButtons = 12;
    // this.selection = 1;
    // this.index = 0;
    // this.nums.splice(0, this.nums.length);
    // for(let i = 1; i< this.max +1 ; i++) this.nums.push(i);
    // this.pages = this.result[this.index];
    // console.log(this.nums);
    // this.result.splice(0, this.result.length);
    // this.createPagesButton(this.nums);
  }

  onPageClicked(index: number): void{
    // console.log('index -> ', index);
    if(index === 1){
      this.index = 0;
      this.pages = this.result[this.index];
    } else if(index === this.numTotalPages){
      this.index = this.result.length - 1;
      this.pages = this.result[this.index];
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
        this.index --;
        this.pages = this.result[this.index];
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
    // console.log(this.numOfPages);
    if (this.selection < this.numTotalPages){
      if(this.selection%this.maxButtons === 0){
        this.index ++;
        this.pages = this.result[this.index];
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

  result: Array<number>[] = [];
  createPagesButton(totalButtons: number[]) {
    let pack:number [] = [];
    if (totalButtons.length > 12) {
      pack = totalButtons.splice(0, this.maxButtons);
      this.result.push(pack);
      this.createPagesButton(totalButtons);
    } else if(totalButtons.length > 0) {
      pack = totalButtons.splice(0, totalButtons.length);
      this.result.push(pack);
    } else return;
  }
}
