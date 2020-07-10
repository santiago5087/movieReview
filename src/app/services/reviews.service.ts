import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Review } from '../models/Review';

interface responseReview {
  err?: any
  success: boolean;
  result?: any
}

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  API_URI = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getReviews() {
    return this.http.get<responseReview>(`${this.API_URI}/reviews`);
  }

  getUserReviews() {
    return this.http.get<responseReview>(`${this.API_URI}/reviews/my-reviews`);
  }

  getReview(id: string): Observable<responseReview> {
    return this.http.get<responseReview>(`${this.API_URI}/reviews/${id}`);
  }

  saveReview(review: Review) {
    return this.http.post(`${this.API_URI}/reviews`, review);
  }

  deleteReview(id: string): Observable<any> {
    return this.http.delete(`${this.API_URI}/reviews/${id}`);
  }

  updateReview(id: string | number, updatedReview: Review): Observable<responseReview> {
    return this.http.put<responseReview>(`${this.API_URI}/reviews/${id}`, updatedReview);
  }

}