import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  baseURL = 'http://localhost:3000/api/';

  sendRequest = false;
  /* Este atributo se utilizaba cuando se realizaban las peticiones GET desde el cliente (Angular) a la api OMDB,
  para que el interceptor no adjuntara el token de autorización en el header de la petición, ya que la otra API utilizada (OMDB) también utiliza el header 'Authorization', por lo que se generaba un error.
  */

  constructor(private http: HttpClient) { }

  getMovie(movieTitle: string, movieYear: string) {
    this.sendRequest = true
    return this.http.post<any>(this.baseURL + "movies", { movieTitle, movieYear })
      .pipe(map(res => {
        this.sendRequest = false;
        return res
      }));
  }

}