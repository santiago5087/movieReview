import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OverlayContainer } from '@angular/cdk/overlay';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';

import { AuthService } from '../../services/auth.service';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<LoginComponent>,
    private auth: AuthService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
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
        this.snackBar.open(err.err.message, "Ok!", { duration: 6000 });
        console.log(err);
      });
  }

  openSignup(): void {
    this.onNoClick();
    this.dialog.open(SignupComponent, { width: "450px", height: "585px" });
  }

  onNoClick(): void {
    this.dialogRef.close()
  }

}
