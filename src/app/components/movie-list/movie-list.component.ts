import { Component, OnInit } from '@angular/core';

import { flyInOut } from '../../animations/app.animation';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
  host: {
    '[@flyInOut]' : 'true' // Se aplica al padre porque es el encargado de crear/destruir los elem.
  },
  animations: [
    flyInOut()
    ]
})
export class MovieListComponent implements OnInit {

  movies: any = [];

  constructor(private moviesService: MoviesService) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies() {
    this.moviesService.getMovies()
    .subscribe(
      movies => this.movies = movies,
      err => console.error(err)
    );
  }

  deleteMovie(id: string) {
    this.moviesService.deleteMovie(id)
      .subscribe(
        res => {
          console.log(res);
          this.getMovies();
        },
        err => console.log(err)
      );
  }

}