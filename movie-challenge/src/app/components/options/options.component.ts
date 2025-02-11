import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class OptionsComponent implements OnInit {
  selectedSearch!: string;
  selectedFilter!: string;
  selectedOrder!: string;

  filterOptions: string[] = ['Filter by', 'Genres'];
  orderOptions: string[] = ['Order by', 'Popularity (desc.)', 'Popularity (asc.)', 'Year (desc.)', 'Year (asc.)', 'Vote average (desc.)', 'Vote average (asc.)', 'Vote count (desc.)', 'Vote count (asc.)'];

  ngOnInit(): void{
    this.selectedFilter = '0';
    this.selectedOrder = '0';
  }

}
