import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  omdbApiKey = "ac49107d";
  omdbBaseURL = "http://www.omdbapi.com/?apikey=";

  constructor(private http: HttpClient) { }

  getMovie(movieTitle: string, movieYear: string) {
    return this.http.get<any>(this.omdbBaseURL + this.omdbApiKey + "&t=" + movieTitle + "&y=" + movieYear)
      .pipe(map(res => {
        // if (res.response === "True") {
        // }
        return res
      }));
  }




}