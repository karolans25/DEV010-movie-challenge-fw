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

  constructor(private readonly http: HttpClient) { }

  // getGenres(): Observable<[]>{
  //   return this.http.get<>(this.url);
  // }

  getAllGenres(): Observable<object> {
    const params = new HttpParams()
      .set('api_key', this.API)
      .set('language', 'en')
      .set('type', 'movie');
    const entity = 'genre/movie/list';
    return this.http.get<object>(`${this.URL}${entity}`, { params });
  }

  getMovies(): Observable<Movie[]>{
    const params = new HttpParams()
      .set('api_key', this.API)
      .set('include_adult', false)
      .set('include_video', false)
      .set('language', 'en-US')
      .set('page', 1)
      .set('sort_by', 'popularity.desc');
    const entity = 'discover/movie';
    return this.http.get<any>(`${this.URL}${entity}`, {params})
      .pipe(map(response => response.results));
  }

  // getAllGenres(): Observable<object> {
  //   const params = new HttpParams()
  //     .set('apikey', this.apiKey)
  //     .set('language', 'en')
  //     .set('type', 'movie');

  //   return this.httpClient.get<string[]>(`${this.apiUrl}genre/movie/list`, { params });
  // }


}
