import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AuthService } from '../../services/auth.service';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user';

const comparePwdsValidator: ValidatorFn = (control: FormGroup):
  ValidationErrors | null => {
    const password = control.get('password');
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
      username: ['', Validators.required],
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
        this.authService.checkJWT(); //Para que se acutialice la foto de perfil del header
        this.router.navigate(['/reviews']);
      }, err => console.log(err));
  }

  savePassword(): void {
    this.usersService.changePassword(this.passwordForm.value)
      .subscribe(res => {
        console.log(res);
        this.authService.checkJWT();
        this.router.navigate(['/reviews']);
      }, err => console.log(err));
  }

}