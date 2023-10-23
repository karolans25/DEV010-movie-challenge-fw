import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Genre } from 'src/app/interfaces/genre';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit{

  poster!: string;
  backdrop!: string;
  title!: string;
  year!: number;
  date!: string;
  vote_average!: number;
  vote_count!: number;
  genres!: Genre[];
  overview!: string;

  constructor(private readonly route: ActivatedRoute){}

  ngOnInit(){
    this.route.queryParams.subscribe( (params: Params) => {
      console.log(params);

      this.backdrop = params['backdrop_path']?"url(\'https:\/\/image.tmdb.org/t/p/w780" + params['backdrop_path'] + "\')" : 'url(../../../assets/not-available.png) no-repeat top';

      this.poster = params['poster_path']? "url(\'https:\/\/image.tmdb.org/t/p/w342" + params['poster_path'] + "\')" : 'url(../../../assets/not-available.png)';

      this.title = params['title']? params['title'] : params['name'];

      this.date = params['release_date']? params['release_date'] : params['first_air_date'];
      this.year = this.getYearOfDate(this.date);

      this.vote_average = params['vote_average'];
      this.vote_count = params['vote_count'];

      this.genres = params['genres'];

      this.overview = params['overview'];
    });

  }

  getYearOfDate(date: string): number{
    const objectDate = new Date(date);
    return objectDate.getFullYear();
  }

}
