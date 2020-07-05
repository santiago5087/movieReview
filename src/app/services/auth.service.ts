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

interface Credentials {
  username: string;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  tokenKey = 'JWT';
  isAuthenticated = false;
  username: Subject<string> = new Subject<string>();
  authToken: string = undefined;
  baseURL = 'http://localhost:3000/api/';

  constructor(public http: HttpClient) { }

  checkJWT(): void {
    this.http.get<AuthResponse>(this.baseURL + 'users/checkToken')
      .subscribe(res => {
        console.log("JWT valid!", res);
        this.sendUsername(res.user.username);
      },
      err => {
        console.log("JWT invalid!", err);
        this.destroyUserCredentials();
      });
  }

  sendUsername(name: string): void {
    this.username.next(name);
  }

  clearUsername(): void {
    this.username.next(undefined);
  }

  destroyUserCredentials(): void {
    this.isAuthenticated = false;
    this.clearUsername();
    this.authToken = undefined;
    localStorage.removeItem(this.tokenKey);
  }

  useCredentials(credentials: Credentials): void {
    this.isAuthenticated = true;
    this.sendUsername(credentials.username);
    this.authToken = credentials.token;
  }

  storeUserCredentials(credentials: Credentials): void {
    localStorage.setItem(this.tokenKey, JSON.stringify(credentials));
    this.useCredentials(credentials);
  }

  loadUserCredentials(): void  {
    const credentials: Credentials = JSON.parse(localStorage.getItem(this.tokenKey));
    console.log('loadUserCredentilas', credentials);
    if (credentials && credentials) {
      this.useCredentials(credentials);
      if (this.authToken) {
        this.checkJWT(); // Para verificar si el token aún es válido
      }
    }
  }

  logIn(username: string, password: string): Observable<any> {
    return this.http.post<AuthResponse>(this.baseURL + 'users/login', { username, password })
      .pipe(map(res => {
        this.storeUserCredentials({ "username": username, "token": res.token });
        return { 'success': true, 'username': username }
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

  getUsername() {
    return this.username.asObservable();
  }

}