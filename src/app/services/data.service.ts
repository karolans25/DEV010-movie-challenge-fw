import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Movie } from '../interfaces/movie';
import { environment } from '../environments/environment.dev';
import { Options } from '../interfaces/options';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private readonly API = environment._APIkey;
  private readonly URL = environment._APIUrl;

  private readonly filterEntity = [['discover/movie', 'discover/tv'], ['movie/now_playing', 'tv/airing_today'], ['movie/popular', 'tv/popular'], ['movie/top_rated', 'tv/top_rated'], ['movie/upcoming', 'tv/on_the_air']];

  private readonly orderParam = ['popularity.desc', 'popularity.desc', 'popularity.asc', 'revenue.desc', 'revenue.asc', 'primary_release_date.desc', 'primary_release_date.asc', 'vote_average.desc', 'vote_average.asc', 'vote_count.desc', 'vote_count.asc'];

  genres!: string[];

  constructor(private readonly http: HttpClient) { }

  getAllFilterOptions(): [string[], string[]] {
    return [['Filter by 🔽', 'Now playing', 'Popular', 'Top Rated', 'Upcoming'], ['Filter by 🔽', 'Airing today', 'Popular', 'Top Rated', 'On the air']];
  }

  getAllOrderOptions(): string[] {
    return ['Order by 📶', 'Popularity Descending', 'Popularity Ascending', 'Revenues Descending', 'Revenues Ascending', 'Release date Descending', 'Release date Ascending', 'Vote average Descending', 'Vote average Ascending', 'Vote count Descending', 'Vote count Ascending'];
  }

  getAllGenres(type: string): Observable<any> {
    const params = new HttpParams()
      .set('api_key', this.API)
      .set('language', 'en')
      .set('type', type === '0'? 'movie' : 'tv');
    const entity = 'genre/'+ params.get('type') +'/list';
    return this.http.get<any>(`${this.URL}${entity}`, { params })
      .pipe(map(response => {
        this.genres = response.genres;
        return { genres: response.genres };
      }));
  }

  getFilms(page: number, extraParams: Options, type: string): Observable<any>{
    const params = this.constructParams(page, extraParams);
    const entity = this.constructEntity(type, extraParams.filter, extraParams.search);
    // console.log(`${this.URL}${entity}`);
    // console.log(params);
    return this.http.get<any>(`${this.URL}${entity}`, {params})
      .pipe(map(response => {
        return { films: response.results, pages: response.total_pages > 500 ? 500 : response.total_pages };
      }));
  }

  getFilmById(id: number, type:string): Observable<any>{
    const params = new HttpParams()
      .set('api_key', this.API)
      .set('include_adult', false)
      .set('include_video', false)
      .set('language', 'en-US')
      .set('page', 1)
      .set('sort_by', 'popularity.desc');

    let entity!: string;
    switch (type){
      case '0':
        entity = `movie/${id}`;
        break;
      case '1':
        entity = `tv/${id}`;
        break;
      default:
        entity = `movie/${id}`;
        break;
    }
    return this.http.get<any>(`${this.URL}${entity}`, {params});
  }

  constructParams(page: number, extraParams: Options): HttpParams{
    let params: HttpParams = new HttpParams()
    .set('api_key', this.API)
    .set('include_adult', false)
    .set('include_video', false)
    .set('language', 'en-US')
    .set('page', page)
    .set('sort_by', this.orderParam[parseInt(extraParams.order)]);

  if (extraParams.search !== '') 
    params = params.append('query', extraParams.search);
  if (extraParams.order !== '0')
    params = params.set('sort_by', this.orderParam[parseInt(extraParams.order)]);
  if (extraParams.genre.length !== 0)
    params = params.set('with_genres', extraParams.genre.join());
  return params; 
  }

  constructEntity(type: string, filter: string, search: string): string {
    let entity!: string;
    if (search !== '') {
      if (type === '0') {
        entity = 'search/movie';
      } else if (type === '1') {
        entity = 'search/tv';
      }
    } else {
      entity = this.filterEntity[parseInt(filter)][parseInt(type)];
    }
    return entity;
  }

}
