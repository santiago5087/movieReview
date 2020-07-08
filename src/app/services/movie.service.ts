import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  omdbApiKey = "ac49107d";
  omdbBaseURL = "https://www.omdbapi.com/?apikey=";
  sendRequest = false;

  constructor(private http: HttpClient) { }

  getMovie(movieTitle: string, movieYear: string) {
    this.sendRequest = true
    return this.http.get<any>(this.omdbBaseURL + this.omdbApiKey + "&t=" + movieTitle + "&y=" + movieYear)
      .pipe(map(res => {
        this.sendRequest = false;
        return res
      }));
  }

}