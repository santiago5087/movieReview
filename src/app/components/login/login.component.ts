import { Component, OnInit } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';

import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<LoginComponent>,
      overlayContainer: OverlayContainer) { 
        overlayContainer.getContainerElement().classList.add('my-dark-theme2');
      }

  user = { username: "", password: "" };

  ngOnInit(): void {
  }

  onSubmit() {

  }

  onNoClick(): void {
    this.dialogRef.close()
  }

}
