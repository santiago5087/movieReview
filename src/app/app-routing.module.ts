import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';

import { ReviewListComponent } from './components/review-list/review-list.component';
import { ReviewFormComponent } from './components/review-form/review-form.component';
import { MyReviewsComponent } from './components/my-reviews/my-reviews.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';

const routerOptions: ExtraOptions = {
  anchorScrolling: "enabled",
  scrollPositionRestoration: "enabled"
}

const routes: Routes = [
  { path: '', redirectTo: '/reviews', pathMatch: 'full' },
  { path: 'reviews', component: ReviewListComponent },
  { path: 'reviews/add', component: ReviewFormComponent },
  { path: 'reviews/my-reviews', component: MyReviewsComponent },
  { path: 'reviews/edit/:id', component: ReviewFormComponent },
  { path: 'edit-profile', component: EditProfileComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
