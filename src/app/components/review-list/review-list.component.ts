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
  pageIndex: number = 0;
  pageSize: number = 6;
  lowValue: number = 0;
  highValue: number = 6;

  constructor(private reviewsService: ReviewsService) { }

  ngOnInit(): void {
    this.getReviews();
  }

  getPaginatorData(event) {
    console.log(event)
    if (event.pageIndex == this.pageIndex + 1) {
      this.lowValue += this.pageSize;
      this.highValue += this.pageSize;
    }

    else if (event.pageIndex == this.pageIndex - 1) {
      this.lowValue -= this.pageSize;
      this.highValue -= this.pageSize;
    }

    this.pageIndex = event.pageIndex;
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

}