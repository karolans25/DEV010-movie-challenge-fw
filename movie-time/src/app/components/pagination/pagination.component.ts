import { Component, OnChanges, OnInit, OnDestroy, SimpleChanges, Output, EventEmitter, ChangeDetectionStrategy, Input, Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class PaginationComponent implements OnInit, OnChanges{
  // @ViewChild('toastElement', { read: ElementRef }) el: ElementRef;

  @Input() numOfPages!: number;
  @Output() newPageEvent= new EventEmitter<number>();

  maxButtons!: number;
  selection!: number;
  pages: number[] = [];
  totalPages: Array<number>[] = [];
  indixes!: number;
  msg!: string;

  constructor(private renderer: Renderer2, private el: ElementRef){}

  ngOnChanges(changes: SimpleChanges): void {
    // console.log('Hubo un cambioo -> ', this.numOfPages);
    this.selection = 1;
    this.indixes = 0;
    this.totalPages = [];
    this.createPagesButton(this.createArrayOfTotalNums());
    this.pages = this.totalPages[this.indixes];
  }

  ngOnInit(): void{
    this.maxButtons = 12;
    this.selection = 1;
    this.indixes = 0;
    this.totalPages = [];
    this.createPagesButton(this.createArrayOfTotalNums());
    this.pages = this.totalPages[this.indixes];
  }

  onPageClicked(index: number): void{
    if(index === 1){
      this.indixes = 0;
      this.pages = this.totalPages[this.indixes];
    } else if(index === this.numOfPages){
      this.indixes = this.totalPages.length - 1;
      this.pages = this.totalPages[this.indixes];
    }

    if (this.selection !== index) {
      this.selection = index;
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
      }
      this.selection += 1;
      this.newPageEvent.emit(this.selection);
    } else {
      this.msg = `This is already the last page`;
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
 
  createPagesButton(totalButtons: number[]) {
    let pack: number[];
    if (totalButtons.length > this.maxButtons) {
      pack = totalButtons.slice(0, this.maxButtons);
      this.totalPages.push(pack);
      this.createPagesButton(totalButtons.slice(this.maxButtons, totalButtons.length));
    } else {
      this.totalPages.push(totalButtons);
    }
  }
}