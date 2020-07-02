import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ReviewsService } from '../../services/reviews.service';
import { Review } from '../../models/Review';

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.scss']
})
export class ReviewFormComponent implements OnInit {

  reviewForm: FormGroup;
  edit = false;

  constructor(private reviewsService: ReviewsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder) { 
      this.createForm();
    }

  ngOnInit(): void {
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
            }
          },
          err => console.error(err)
        );
    } 
  }

  createForm() {
    this.reviewForm = this.fb.group({
      id: [0],
      title: [''],
      description: [''],
      image: [''],
      created_at: [new Date()]
    });
  }

  saveNewReview() {
    let review: Review = this.reviewForm.value;
    delete review.id;
    delete review.created_at;
    
    this.reviewsService.saveReview(review)
      .subscribe(
        res => {
          console.log(res);
          this.reviewForm.reset()
          this.router.navigate(['/reviews']);
        },
        err => console.error(err));

  }

  updateReview() {
    let review: Review = this.reviewForm.value;
    delete review.created_at;
    this.reviewsService.updateReview(review.id, review)
      .subscribe(
        res => {
          console.log(res);
          this.reviewForm.reset()
          this.router.navigate(['/reviews']);
        },
        err => console.error(err)
      );
  }

}