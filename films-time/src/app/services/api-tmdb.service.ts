import { Injectable } from '@angular/core';
import { environment } from '@envs/environment';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiTmdbService {
  // private readonly API = environment._APIkey;
  private readonly API = '';
  // private readonly URL = environment.APIUrl;
  private readonly URL = '';

  constructor(private readonly http: HttpClient) { }

  getMovies(page: number){

  }

  getSeries(page: number){
    
  }

}
