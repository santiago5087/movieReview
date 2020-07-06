import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { OverlayContainer } from '@angular/cdk/overlay';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators, ValidationErrors, ValidatorFn, Form } from '@angular/forms';

import { AuthService } from '../../services/auth.service'

const comparePwdsValidator: ValidatorFn = (control: FormGroup):
  ValidationErrors | null => {
    const password = control.get('password');
    const passwordVerify = control.get('passwordVer');

    return password && passwordVerify && password.value !== passwordVerify.value ? {'comparePwds': true}: null; 
  }

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  @ViewChild('form') signupFormDirective;

  constructor(private dialogRef: MatDialogRef<SignupComponent>,
    private authService: AuthService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    overlayContainer: OverlayContainer) { 
    
    overlayContainer.getContainerElement().classList.add('my-dark-theme2');
    }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      profilePicture: [''],
      password: ['', Validators.required],
      passwordVer: ['', Validators.required]
    }, { validators: comparePwdsValidator });
  }

  onSubmit() {
    this.authService.signUp(this.signupForm.value)
      .subscribe(signup => {
        console.log('Successful registration');
        this.signupForm.reset({
          username: '',
          email: '',
          profilePicture: '',
          password: '',
          passwordVer: ''
        });

        this.signupFormDirective.resetForm();
        console.log(signup);
        // this.snackBar.open(signup.status , "Ok!", { duration: 10000 });
        this.dialogRef.close();
      },
      err => {
        let snackBarMsg: string;
        let errorMessage: string = err.err.sqlMessage;

        if (errorMessage.includes("Duplicate entry")) {
          if (errorMessage.includes("email")) {
            snackBarMsg = "Email entered already exists, please enter a different one";
          }
          else if (errorMessage.includes("PRIMARY")) {
            snackBarMsg = "Username entered already exists, please enter a different one";
          }
        } else {
          snackBarMsg = errorMessage;
        }

        this.snackBar.open(snackBarMsg, "Ok!", { duration: 6000 });
        console.log(err);
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}