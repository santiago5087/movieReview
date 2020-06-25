import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

import { MoviesService } from '../../services/movies.service';
import { Movie } from '../../models/Movie';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.scss']
})
export class MovieFormComponent implements OnInit {

  movieForm: FormGroup;
  edit = false;

  constructor(private moviesService: MoviesService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder) { 
      this.createForm();
    }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    if (params.id) {
      this.moviesService.getMovie(params.id)
        .subscribe(
          res => {
            this.movieForm = this.fb.group({
              id: [res.id],
              title: [res.title],
              description: [res.description],
              image: [res.image],
              created_at: [new Date()]
            });
            console.log(res);
            this.edit = true;
          },
          err => console.error(err)
        );
    } 
  }

  createForm() {
    this.movieForm = this.fb.group({
      id: [0],
      title: [''],
      description: [''],
      image: [''],
      created_at: [new Date()]
    });
  }

  saveNewMovie() {
    let movie: Movie = this.movieForm.value;
    delete movie.id;
    delete movie.created_at;
    
    this.moviesService.saveMovie(movie)
      .subscribe(
        res => {
          console.log(res);
          this.movieForm.reset()
          this.router.navigate(['/movies']);
        },
        err => console.error(err));

  }

  updateMovie() {
    let movie: Movie = this.movieForm.value;
    delete movie.created_at;
    this.moviesService.updateMovie(movie.id, movie)
      .subscribe(
        res => {
          console.log(res);
          this.movieForm.reset()
          this.router.navigate(['/movies']);
        },
        err => console.error(err)
      );
  }

}