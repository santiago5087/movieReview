import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface responseUser {
  err?: any
  success: boolean;
  result?: any
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  API_URI = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }


  changePassword(pwds: any): Observable<any> {
    return this.http.put<responseUser>(`${this.API_URI}/users/changePass`, pwds);
  }

  updateProfile(profile: any): Observable<any> {
    return this.http.put<responseUser>(`${this.API_URI}/users/updateProfile`, profile);
  }

}
