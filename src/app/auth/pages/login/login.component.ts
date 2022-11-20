import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Notify } from 'notiflix';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  isLogIn: boolean = true;
  isSignUp: boolean = false;
  loginForm = this.fb.group({
    username: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('[a-zA-Z0-9]*'),
      ],
    ],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });
  signupForm = this.fb.group({
    name: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('[a-zA-Z ]*'),
      ],
    ],
    username: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('[a-zA-Z0-9]*'),
      ],
    ],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });
  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {}
  login(form: any) {
    if (this.loginForm.invalid) {
      Notify.failure('Invalid form', {
        position: 'center-bottom',
      });
      return;
    }
  }
  signup(form: any) {
    if (this.signupForm.invalid) {
      return;
    }
  }
  mostrarSignUp() {
    this.isLogIn = false;
    this.isSignUp = true;
  }
  mostrarLogIn() {
    this.isLogIn = true;
    this.isSignUp = false;
  }
}
