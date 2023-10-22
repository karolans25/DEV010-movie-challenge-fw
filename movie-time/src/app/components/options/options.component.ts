import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})

export class OptionsComponent implements OnInit {
  
  @Output() newOptionsEvent= new EventEmitter<object>();

  optionsForm!: FormGroup;
  
  filterOptions!: string[];
  orderOptions!: string[];
  genres!: any[]; 

  constructor(private readonly fb:FormBuilder){ }

  ngOnInit(): void{    
    this.filterOptions = ['', 'Now playing', 'Popular', 'Top Rated', 'Upcoming', 'Genres'];

    this.filterOptions = ['', 'Now playing', 'Popular', 'Top Rated', 'Upcoming', 'Genres'];

    
    this.orderOptions = ['', 'Popularity (desc.)', 'Popularity (asc.)', 'Year (desc.)', 'Year (asc.)', 'Vote average (desc.)', 'Vote average (asc.)', 'Vote count (desc.)', 'Vote count (asc.)'];
    
    this.genres = [{id: 35, name: "Comedy"}, {id: 14, name: 'Fantasy'},{id: 10751, name: 'Family'}];

    // this.optionsForm = new FormGroup({
    //   search: new FormControl(),
    //   filter: new FormControl(),
    //   order: new FormControl(),
    // });
    this.optionsForm = this.initForm();
  }

  onSubmit():void{
    console.log('Form ->', this.optionsForm.value);
    this.newOptionsEvent.emit(this.optionsForm.value);
  }

  initForm():FormGroup{
    return this.fb.group({
      // search: ['', [Validators.required, Validators.minLength(3)]]
      search: ['', [Validators.required, Validators.minLength(3)]],
      filter: ['',],
      order: ['',]
    })
  }
}
