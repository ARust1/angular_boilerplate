import { CredentialsService } from './../app/services/credentials/credentials.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  form: FormGroup;
  email: '';
  password: '';
  memberNames: any[] = [];
  memberSubscription: Subscription;
  bAuthKey: any;

  constructor(public credentials: CredentialsService,
              private formBuilder: FormBuilder,
              public authService: AuthService) {
    this.form = this.formBuilder.group({
      'email': [null, Validators.required],
      'password': [null, Validators.required]
    });
   }

  ngOnInit() {
    // this.form.get('validate').valueChanges.subscribe(
    //   (validate) => {
    //     console.log('bla');
    //     this.form.get('email').updateValueAndValidity();
    //     this.form.get('password').updateValueAndValidity();
    //   }
    // );
  }

  ngOnDestroy() {
    this.memberSubscription.unsubscribe();
  }

  login(authData: any) {
    this.authService.auth(authData.email, authData.password).then(result => {
      this.getMemberNames();
    });
  }

  getMemberNames() {
    this.memberSubscription = this.authService.getMember().subscribe(result => {
      this.memberNames = result;
    }, err => {
      console.log(err);
    }, () => {
      console.log(this.memberNames);

      console.log(this.memberSubscription);
    });
  }
}
