import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

import { LoginComponent } from '../login/login.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, OnDestroy {

  userData: any = undefined;
  subscription: Subscription;
  profilePicture: string = undefined;

  constructor(public dialog: MatDialog,
    public auth: AuthService) { }

  ngOnInit(): void {
    this.auth.loadUserCredentials();
    this.subscription = this.auth.getUserData().subscribe(usr => this.userData = usr);
    /* Se suscribe pero aún no se le ha emitido ningún valor de "userData", el cual se emite cuando se termina 
    de realizar la petición GET a users/checkToken 
    */
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  openLogin(): void {
    this.dialog.open(LoginComponent, { width: "300px", height: "370px" });
  }

  logOut() {
    this.auth.logOut();
    console.log('logout!');
  }

}