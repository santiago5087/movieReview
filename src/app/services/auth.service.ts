import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

interface AuthResponse {
  status: string;
  success: string;
  error?: any;
  token?: string;
  user?: any;
}

interface UserData {
  username: string;
  email: string;
  profilePicture: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  tokenKey = 'JWT';
  userKey = 'USK';
  isAuthenticated = false;
  userData: Subject<UserData> = new Subject<UserData>();
  authToken: string = undefined;
  baseURL = 'http://localhost:3000/api/';

  constructor(public http: HttpClient) { }

  checkJWT(): void {
    this.http.get<AuthResponse>(this.baseURL + 'users/checkToken')
      .subscribe(res => {
        console.log("JWT valid!", res);

        let user: UserData = { 
          username: res.user.username,
          profilePicture: res.user.profilePicture,
          email: res.user.email
        }

        this.sendUserData(user);
      },
      err => {
        console.log("JWT invalid!", err);
        this.destroyUserCredentials();
      });
  }

  sendUserData(user: UserData): void {
    this.userData.next(user);
  }

  clearUserData(): void {
    this.userData.next(undefined);
  }

  destroyUserCredentials(): void {
    this.isAuthenticated = false;
    this.clearUserData();
    this.authToken = undefined;
    localStorage.removeItem(this.userKey);
    localStorage.removeItem(this.tokenKey);
  }

  useCredentials(userData: UserData, token: string): void {
    this.isAuthenticated = true;
    this.sendUserData(userData);
    this.authToken = token;
  }

  storeUserCredentials(userData: UserData, token: string): void {
    localStorage.setItem(this.userKey, JSON.stringify(userData));
    localStorage.setItem(this.tokenKey, token);
    this.useCredentials(userData, token);
  }

  loadUserCredentials(): void  {
    const userData: UserData = JSON.parse(localStorage.getItem(this.userKey));
    const token: string = localStorage.getItem(this.tokenKey);
    console.log('loadUserData', userData);
    if (userData && userData.username) {
      this.useCredentials(userData, token);
      if (this.authToken) {
        this.checkJWT(); // Para verificar si el token aún es válido
      }
    }
  }

  logIn(username: string, password: string): Observable<any> {
    return this.http.post<AuthResponse>(this.baseURL + 'users/login', { username, password })
      .pipe(map(res => {
        this.storeUserCredentials({ 
          "username": res.user.username, 
          "profilePicture": res.user.profilePicture,
          "email": res.user.email }, res.token);

        return { 'success': true }
      }),
      catchError(err => throwError(err)));
      /* catchError atrapa un error cuando sucede y retorna otro observable o arroja (throw) un error
      */
  }

  logOut(): void {
    this.destroyUserCredentials();
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  getToken(): string {
    return this.authToken;
  }

  getUserData() {
    return this.userData.asObservable();
  }

}