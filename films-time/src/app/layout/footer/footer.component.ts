import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  text = 'Made 💖 ';
  msgs: string[] = ['by Carolina Pulido 👩🏻‍💻', 'using TMDB and Angular', 'to have fun with movies', 'in Laboratoria Bootcamp'];

}
