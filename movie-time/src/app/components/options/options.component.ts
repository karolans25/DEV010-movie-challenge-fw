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

  filterOptions!: string[];
  orderOptions!: string[];
  genres!: object[]; 

  ngOnInit(): void{
    this.selectedFilter = '0';
    this.selectedOrder = '0';
    this.filterOptions = ['Now playing', 'Popular', 'Top Rated', 'Upcoming', 'Genres'];
    this.orderOptions = ['Popularity (desc.)', 'Popularity (asc.)', 'Year (desc.)', 'Year (asc.)', 'Vote average (desc.)', 'Vote average (asc.)', 'Vote count (desc.)', 'Vote count (asc.)'];
    this.genres = [{id: 35, name: "Comedy"}, {id: 14, name: 'Fantasy'},{id: 10751, name: 'Family'}];
  }

}
