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

  username: string;
  subscription: Subscription;

  constructor(public dialog: MatDialog,
    public auth: AuthService) { }

  ngOnInit(): void {
    this.auth.loadUserCredentials();
    this.subscription = this.auth.getUsername().subscribe(usrn => this.username = usrn);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  openLogin() {
    this.dialog.open(LoginComponent, { width: "300px", height: "370px" });
  }

}
