import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AuthService } from '../../services/auth.service';
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
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.authService.loadUserCredentials();
    this.subscription =  this.authService.getUserData().subscribe(usr => this.userData = usr);
  
    this.createForm();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  createForm(): void {
    this.profileForm = this.fb.group({
      username: [this.userData.username, Validators.required],
      email: [this.userData.email, Validators.required],
      profilePicture: [this.userData.profilePicture, Validators.required],
    });

    this.passwordForm = this.fb.group({
      password: ['', Validators.required],
      passwordVer: ['', Validators.required],
      newPassword: ['', Validators.required]
    }, { validators: comparePwdsValidator });
  }

  saveProfile(): void {
    
  }

  savePassword(): void {

  }

}
