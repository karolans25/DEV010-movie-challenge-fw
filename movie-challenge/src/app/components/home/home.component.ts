import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  filterOptions: string[] = ['Filter by', 'Filter by genres'];
  orderOptions: string[] = ['Order by', 'Popularity (desc.)', 'Popularity (asc.)', 'Year (desc.)', 'Year (asc.)', 'Vote average (desc.)', 'Vote average (asc.)', 'Vote count (desc.)', 'Vote count (asc.)'];
}
