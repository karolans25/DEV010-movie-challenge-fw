import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../interfaces/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiKey = 'd580ec26e1f8c65cc52327659f9f2cc5';
  private apiUrl = 'https://api.themoviedb.org/3/';

  constructor(private httpClient: HttpClient) { }

  getAllGenres(): Observable<object> {
    const params = new HttpParams()
      .set('apikey', this.apiKey)
      .set('language', 'en')
      .set('type', 'movie');

    return this.httpClient.get<string[]>(`${this.apiUrl}genre/movie/list`, { params });
  }

  getMoviesByPage(page: number): Observable <object> {
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('include_adult', false)
      .set('include_video', false)
      .set('language', 'en-US')
      .set('page', page)
      .set('sort_by', 'popularity.desc');

    return this.httpClient.get(`${this.apiUrl}discover/movie`, { params });
    // return this.httpClient.get(`${this.apiUrl}discover/movie`, { params }).pipe(map((resp:any) => { return resp.results as Movie[] }));
  }

  getMovieByTitle(page: number, title: string): Observable<any> {
    const params = new HttpParams()
    .set('api_key', this.apiKey)
    .set('include_adult', false)
    .set('include_video', false)
    .set('language', 'en-US')
    .set('page', page)
    .set('query', title);

    return this.httpClient.get(`${this.apiUrl}search/movie`, { params });
  }


  getMovieYears(): Observable<number[]> {
    const params = new HttpParams()
      .set('apikey', this.apiKey)
      .set('type', 'movie');
    return this.httpClient.get<number[]>(this.apiUrl, { params });
  }

  getMovieImdbRatings(): Observable<string[]> {
    const params = new HttpParams()
      .set('apikey', this.apiKey)
      .set('type', 'movie');
    return this.httpClient.get<string[]>(this.apiUrl, { params });
  }
}
