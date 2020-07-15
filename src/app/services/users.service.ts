import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

interface responseUser {
  err?: any
  success: boolean;
  result?: any
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  API_URI = environment.apiURL;

  constructor(private http: HttpClient) { }


  changePassword(pwds: any): Observable<any> {
    return this.http.put<responseUser>(`${this.API_URI}/users/changePass`, pwds);
  }

  updateProfile(profile: any): Observable<any> {
    return this.http.put<responseUser>(`${this.API_URI}/users/updateProfile`, profile);
  }

}
