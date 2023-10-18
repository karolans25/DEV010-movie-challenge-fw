import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  selectedSearch!: string;
  selectedFilter!: string;
  selectedOrder!: string;

  filterOptions: string[] = ['Filter by', 'Genres'];
  orderOptions: string[] = ['Order by', 'Popularity (desc.)', 'Popularity (asc.)', 'Year (desc.)', 'Year (asc.)', 'Vote average (desc.)', 'Vote average (asc.)', 'Vote count (desc.)', 'Vote count (asc.)'];

  ngOnInit(): void{
    this.selectedFilter = '0';
    this.selectedOrder = '0';
  }
  // capturar() {
  //   this.selectedFilter = this.selectedFilter;
  //   this.selectedOrder = this.selectedOrder;
  // }
  searchByPage(page: number): void{
    console.log('click on page -> ', page+1);
  }
}
