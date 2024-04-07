import { Component, OnInit } from '@angular/core';
import { Params, Router } from '@angular/router';
import { Genre } from '@shared/models/genre.interface';
import { Movie } from '@shared/models/movie.interface';
import { Serie } from '@shared/models/serie.interface';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  film !: Movie | Serie;

  poster!: string;
  backdrop!: string;
  title!: string;
  year!: number;
  date!: string;
  vote_average!: number;
  vote_count!: number;
  genres!: Genre[];
  overview!: string;

  // constructor(private readonly dataSvc: DataService, private readonly route: ActivatedRoute){}
  constructor(private router: Router) {
    console.log(this.router.url);
    console.log(document.location.pathname);
  }

  ngOnInit(){
    // this.route.queryParams.subscribe( (params: Params) => {
    //   this.dataSvc.getFilmById(parseInt(params['id']), params['type'])
    //   .subscribe( (response:any) => {
    //     // const link = this.type === '0' ? 'detail/movie' : 'detail/serie';
    //     // const queryParams = new URLSearchParams(response).toString();
    //     // const newTab = window.open( link + '?' + queryParams, '_blank');
    //     console.log(response);

    //     this.backdrop = typeof response['backdrop_path'] === 'string' ? "url(\'https:\/\/image.tmdb.org/t/p/w780" + response['backdrop_path'] + "\')" : 'url(../../../assets/not-available.png) no-repeat top';

    //     this.poster = typeof response['poster_path'] === 'string' ? "url(\'https:\/\/image.tmdb.org/t/p/w342" + response['poster_path'] + "\')" : 'url(../../../assets/not-available.png)';

    //     this.title = response['title']? response['title'] : response['name'];

    //     this.date = response['release_date']? response['release_date'] : response['first_air_date'];
    //     this.year = this.getYearOfDate(this.date);

    //     this.vote_average = response['vote_average'].toFixed(1);
    //     this.vote_count = response['vote_count'];

    //     this.genres = response['genres'];

    //     this.overview = response['overview'];
    //   });

    // });
  }

  getYearOfDate(date: string): number{
    const objectDate = new Date(date);
    return objectDate.getFullYear();
  }

  onClick(index: any){
    console.log('Details: ', index);
  }

}
