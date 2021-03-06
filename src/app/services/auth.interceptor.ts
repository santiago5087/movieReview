import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { MovieService } from './movie.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(public auth: AuthService,
    public movieService: MovieService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.movieService.sendRequest) {
      const authToken = this.auth.getToken();
      var authReq = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + authToken) });
      
        return next.handle(authReq)
          .pipe(tap((event: HttpEvent<any>) => {
            //do nothing
          },
          err => {
            if(err.status === 401 && authToken) {
              console.log('Unauthorized Interceptor: ', err);
              this.auth.checkJWT();
            }
          }));
    } else {
      return next.handle(req);
    }
  }
  
}