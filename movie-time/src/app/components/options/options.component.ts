import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Options } from 'src/app/interfaces/options';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})

export class OptionsComponent implements OnInit {

  // @Input() genres!: any[];
  @Input() filterOptions!: string[];
  @Input() orderOptions!: string[];
  @Input() genres!: {id: number, name:string }[];
  @Output() newOptionsEvent= new EventEmitter<Options>();

  optionsForm!: FormGroup;
  // genres!: {id: number, name: string}[]; 

  constructor(private readonly fb:FormBuilder){ }

  ngOnInit(): void{    
    // this.genres = [{id: 35, name: "Comedy"}, {id: 14, name: 'Fantasy'},{id: 10751, name: 'Family'}];
    this.optionsForm = this.initForm();
  }

  onSubmit():void{
    this.newOptionsEvent.emit(this.optionsForm.value);
  }

  initForm():FormGroup{
    return this.fb.group({
      // search: ['', [Validators.required, Validators.minLength(3)]]
      search: [''],
      filter: ['0'],
      order: ['0']
    })
  }
}
