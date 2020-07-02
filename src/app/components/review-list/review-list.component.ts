import { Component, OnInit } from '@angular/core';

import { flyInOut } from '../../animations/app.animation';
import { Review } from '../../models/Review';
import { ReviewsService } from '../../services/reviews.service';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.scss'],
  host: {
    '[@flyInOut]' : 'true', // Se aplica al padre porque es el encargado de crear/destruir los elem.
    'style': 'display: block' // Para que pueda funcionar la animación sobre el container
  },
  animations: [
    flyInOut()
    ]
})
export class ReviewListComponent implements OnInit {

  reviews: Review[] = [];

  constructor(private reviewsService: ReviewsService) { }

  ngOnInit(): void {
    this.getReviews();
  }

  getReviews() {
    this.reviewsService.getReviews()
    .subscribe(
      review => {
        if (review.success) {
          this.reviews = review.result;
        } else {
          throw new Error(review.err.sqlMessage);
        }
      },
      err => console.error(err)
    );
  }

  deleteReview(id: string) {
    this.reviewsService.deleteReview(id)
      .subscribe(
        res => {
          console.log(res);
          this.getReviews();
        },
        err => console.log(err)
      );
  }

}