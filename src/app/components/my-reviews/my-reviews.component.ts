import { Component, OnInit } from '@angular/core';

import { ReviewsService } from '../../services/reviews.service';
import { Review } from '../../models/Review';

@Component({
  selector: 'app-my-reviews',
  templateUrl: './my-reviews.component.html',
  styleUrls: ['./my-reviews.component.scss']
})
export class MyReviewsComponent implements OnInit {

  reviews: Review[];

  constructor(private reviewsService: ReviewsService) { }

  ngOnInit(): void {
    this.reviewsService.getUserReviews().subscribe(res => {
      this.reviews = res.result;
    });
  }

  deleteReview(id: string) {
    this.reviewsService.deleteReview(id).subscribe(res => {
      this.reviews = res.result;
      console.log(res);
    },
    err => console.log(err)
  );
  } 

}
