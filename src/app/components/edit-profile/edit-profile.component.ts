import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

import { AuthService } from '../../services/auth.service';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user';

const comparePwdsValidator: ValidatorFn = (control: FormGroup):
  ValidationErrors | null => {
    const password = control.get('newPassword');
    const passwordVerify = control.get('passwordVer');

    return password && passwordVerify && password.value !== passwordVerify.value ? {'comparePwds': true}: null; 
  }

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit, OnDestroy {

  userData: User = undefined;
  subscription: Subscription;
  profileForm: FormGroup;
  passwordForm: FormGroup;

  constructor(private authService: AuthService,
    private usersService: UsersService,
    private router: Router,
    private snackBar: MatSnackBar,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.authService.loadUserCredentials();
    this.subscription =  this.authService.getUserData().subscribe(usr => {
      this.userData = usr
      this.fillForm();
    });
    this.createForm();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  createForm(): void {
    this.profileForm = this.fb.group({
      email: ['', Validators.required],
      profilePicture: ['', Validators.required]
    });

    this.passwordForm = this.fb.group({
      password: ['', Validators.required],
      newPassword: ['', Validators.required],
      passwordVer: ['', Validators.required]
    }, { validators: comparePwdsValidator });
  }

  fillForm(): void {
    this.profileForm.patchValue({
      username: this.userData.username,
      email: this.userData.email,
      profilePicture: this.userData.profilePicture
    });
  }

  saveProfile(): void {
    this.usersService.updateProfile(this.profileForm.value)
      .subscribe(res => {
        this.authService.checkJWT(); 
        /* Para que se acutialice la foto de perfil del header
        */
       
        this.snackBar.open(res.result, "Ok!", { duration: 6000 });
        this.router.navigate(['/reviews']);
      }, err => {
        let errMsg: string = err.error.err.sqlMessage; 
        if (errMsg.includes("Duplicate entry") && errMsg.includes("email")) {
          this.snackBar.open("The email entered already exists!, please enter in another",
           "Ok!", { duration: 6000 });
        } else {
          this.snackBar.open("An error has occurred, please try again", "Ok!", { duration: 6000 });
          console.log(err);
        }
      });
  }

  savePassword(): void {
    this.usersService.changePassword(this.passwordForm.value)
      .subscribe(res => {
        this.authService.checkJWT();
        this.snackBar.open(res.result, "Ok!", { duration: 6000 });
        this.router.navigate(['/reviews']);
      }, err => {
        this.snackBar.open(err.error.err  , "Ok!", { duration: 6000 });
      });
  }

}