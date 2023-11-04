import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Genre } from 'src/app/interfaces/genre';
import { Options } from 'src/app/interfaces/options';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})

export class OptionsComponent implements OnInit {
  selectedSearch!: string;
  selectedFilter!: string;
  selectedOrder!: string;
  selectedGenre!: string;

  // @Input() genres!: any[];
  @Input() filterOptions!: string[];
  @Input() orderOptions!: string[];
  @Input() genres!: Genre[];
  @Output() newOptionsEvent= new EventEmitter<Options>();

  optionsForm!: FormGroup;
  colors!: string[];
  // genres!: {id: number, name: string}[]; 

  constructor(private readonly fb:FormBuilder){ }

  ngOnInit(): void{    
    // this.genres = [{id: 35, name: "Comedy"}, {id: 14, name: 'Fantasy'},{id: 10751, name: 'Family'}];
    this.optionsForm = this.initForm();
    this.selectedSearch = this.optionsForm.get('search')?.value;
    this.selectedFilter = this.optionsForm.get('filter')?.value;
    this.selectedOrder = this.optionsForm.get('order')?.value;
    this.selectedGenre = this.optionsForm.get('genre')?.value;
    this.colors = ['wheat', 'aquamarine', 'palegreen', 'darkorange', 'pink', 
    'violet', 'mistyrose', 'orchid', 'springgreen', 'goldenrod', 
    'skyblue', 'salmon', 'papayawhip', 'darkturquoise', 'sandybrown', 
    'mediumspringgreen', 'plum', 'powderblue', 'yellowgreen', 'thistle'];
  }

  onSubmit():void{
    this.newOptionsEvent.emit(this.optionsForm.value);
  }

  initForm():FormGroup{
    return this.fb.group({
      // search: ['', [Validators.required, Validators.minLength(3)]]
      search: [''],
      filter: ['0'],
      order: ['0'],
      genre: [[]]
    })
  }

  resetForm(): void{
    for (let genre of this.optionsForm.get('genre')?.value)
      this.paintGreyGenreBadge(genre);

    this.optionsForm.setValue({search: '', filter: '0', order: '0', genre: []});
    this.newOptionsEvent.emit(this.optionsForm.value);
  }

  addGenreToFilter(genre: Genre, index: number): void {
    const badge = document.getElementById(genre.id.toString());
    if(badge){
      this.optionsForm.get('genre')?.value.push(genre.id.toString());
      badge.style.backgroundColor = this.colors[index].toString();
    }
  }

  paintGreyGenreBadge(genreId: string): void {
    const badge = document.getElementById(genreId);
    console.log(badge);
    if(badge){
      badge.style.backgroundColor = 'grey';
    }
  }
}
