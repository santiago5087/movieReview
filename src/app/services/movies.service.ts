import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Movie } from '../models/Movie';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  API_URI = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getMovies() {
    return this.http.get<Movie[]>(`${this.API_URI}/movies`);
  }

  getMovie(id: string): Observable<Movie> {
    return this.http.get<Movie>(`${this.API_URI}/movies/${id}`);
  }

  saveMovie(movie: Movie) {
    return this.http.post(`${this.API_URI}/movies`, movie);
  }

  deleteMovie(id: string) {
    return this.http.delete(`${this.API_URI}/movies/${id}`);
  }

  updateMovie(id: string | number, updatedMovie: Movie): Observable<Movie> {
    return this.http.put<Movie>(`${this.API_URI}/movies/${id}`, updatedMovie);
  }

}