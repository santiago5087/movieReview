import { Component, OnInit } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';

import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<LoginComponent>,
    public auth: AuthService,
    overlayContainer: OverlayContainer) { 
      overlayContainer.getContainerElement().classList.add('my-dark-theme2');
    }

  user = { username: "", password: "" };

  ngOnInit(): void {
  }

  onSubmit() {
    this.auth.logIn(this.user.username, this.user.password)
      .subscribe(res => {
        if (res.success) {
          this.dialogRef.close();
        } else {
          console.log(res);
        }
      },
      err => {
        console.log(err);
      });
  }

  onNoClick(): void {
    this.dialogRef.close()
  }

}
