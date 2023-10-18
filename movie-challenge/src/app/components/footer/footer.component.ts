import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  text = 'Made with ❤️ ';
  msgs: string[] = ['by Carolina Pulido', 'using TMDB and Angular', 'to have fun with movies', 'in Laboratoria Bootcamp'];
}
