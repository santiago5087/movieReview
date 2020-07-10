import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/services/auth.service';
import { ReviewsService } from '../../services/reviews.service';
import { MovieService } from '../../services/movie.service';
import { Review } from '../../models/Review';

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.scss']
})
export class ReviewFormComponent implements OnInit, OnDestroy {

  userData: any = undefined;
  subscription: Subscription;
  reviewForm: FormGroup;
  searchMovieForm: FormGroup;
  review: Review = new Review();
  errMsg = { err: true, msg: "" };
  edit = false;

  constructor(private reviewsService: ReviewsService,
    private authService: AuthService,
    private movieService: MovieService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder) { 
      this.createForm();
    }

  ngOnInit(): void {
    this.authService.loadUserCredentials();
    this.subscription = this.authService.getUserData().subscribe(usr => this.userData = usr);

    const params = this.activatedRoute.snapshot.params;
    if (params.id) {
      this.reviewsService.getReview(params.id)
        .subscribe(
          res => {
            if (res.success) {
              let review: Review = res.result;
              this.reviewForm = this.fb.group({
                id: [review.id],
                title: [review.movieTitle],
                description: [review.moviePlot],
                image: [review.moviePoster],
                created_at: [review.created_at]
              });
              console.log(res);
              this.edit = true;
            } else {
              throw new Error(res.err.sqlMessage);
            }
          },
          err => console.error(err)
        );
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  createForm() {
    this.reviewForm = this.fb.group({
      review: ['', Validators.required],
      userRating: [1]
    });

    this.searchMovieForm = this.fb.group({
      movieTitle: ['', Validators.required],
      movieYear: ['']
    });
  }

  searchMovie() {
    let movie: any = this.searchMovieForm.value;
    this.movieService.getMovie(movie.movieTitle, movie.movieYear)
      .subscribe(res => {
        console.log(res);

        if (res.Response === "True") {
          this.errMsg.err = false

          this.review.movieTitle = res.Title;
          this.review.type = res.Type;
          this.review.movieYear = res.Year;
          this.review.movieGenre = res.Genre;
          this.review.moviePlot = res.Plot;
          this.review.moviePoster = res.Poster;
          this.review.movieRating = res.Ratings[0].Value;
          
        } else {
          this.errMsg.err = true;
          this.errMsg.msg = res.Error;
        }

      });
  }

  saveNewReview() {
    this.review.username = this.userData.username;
    this.review.review = this.reviewForm.value.review;
    this.review.userRating = this.reviewForm.value.userRating;
    console.log(this.review);
     
    this.reviewsService.saveReview(this.review)
      .subscribe(
        res => {
          console.log(res);
          // this.reviewForm.reset()
          this.router.navigate(['/reviews']);
        },
        err => console.error(err));
  }

  updateReview() {
    let review: Review = this.reviewForm.value;
    // delete review.created_at;
    this.reviewsService.updateReview(review.id, review)
      .subscribe(
        res => {
          console.log(res);
          // this.reviewForm.reset()
          this.router.navigate(['/reviews']);
        },
        err => console.error(err)
      );
  }

}