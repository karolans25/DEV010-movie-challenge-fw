import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Movie } from '../interfaces/movie';
import { environment } from '../environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private readonly API = environment._APIkey;
  private readonly URL = environment._APIUrl;

  private readonly filters = ['', 'Now playing', 'Popular', 'Top Rated', 'Upcoming', 'Genres'];

  private readonly orderParam = ['popularity.desc', 'popularity.desc', 'popularity.asc', 'revenue.desc', 'revenue.asc', 'primary_release_date.desc', 'primary_release_date.asc', 'vote_average.desc', 'vote_average.asc', 'vote_count.desc', 'vote_count.asc'];

  constructor(private readonly http: HttpClient) { }

  getAllFilterOptions(): string[] {
    return this.filters;
  }

  getAllOrderOptions(): string[] {
    return ['', 'Popularity Descending', 'Popularity Ascending', 'Revenues Descending', 'Revenues Ascending', 'Release date Descending', 'Release date Ascending', 'Vote average Descending', 'Vote average Ascending', 'Vote count Descending', 'Vote count Ascending'];
  }

  getAllGenres(): Observable<any> {
    const params = new HttpParams()
      .set('api_key', this.API)
      .set('language', 'en')
      .set('type', 'movie');
    const entity = 'genre/movie/list';
    return this.http.get<any>(`${this.URL}${entity}`, { params })
      .pipe(map(response => {
        return { genres: response.genres };
      }));
  }

  getFilms(page: number, extraParams: {search:string, filter:string, order:string}, type: string): Observable<any>{
    const params = this.constructParams(page, extraParams);
    const entity = this.constructEntity(type, extraParams.filter);
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

  constructParams(page: number, extraParams: {search:string, filter:string, order:string}): HttpParams{
    let params: HttpParams = new HttpParams()
    .set('api_key', this.API)
    .set('include_adult', false)
    .set('include_video', false)
    .set('language', 'en-US')
    .set('page', page)
    .set('sort_by', this.orderParam[parseInt(extraParams.order)]);

  if (extraParams.search !== '') params = params.append('query', extraParams.search);
  if (extraParams.order !== '0')
    params = params.set('sort_by', this.orderParam[parseInt(extraParams.order)]);  

    //    params = new HttpParams()
    //   .set('api_key', this.API)
    //   .set('include_adult', false)
    //   .set('include_video', false)
    //   .set('language', 'en-US')
    //   .set('page', page)
    //   .set('sort_by', this.orderParam[parseInt(extraParams.order)]);  
    // }
    console.log(params);
    return params; 
  }

  constructEntity(type: string, extraParams: {}): string {
    let entity!: string;
    switch (type){
      case '0':
        entity = 'discover/movie';
        break;
      case '1':
        entity = 'discover/tv';
        break;
      default:
        entity = 'discover/movie'
        break;
    }
    return entity;
  }

}
