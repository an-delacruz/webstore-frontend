import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Notify } from 'notiflix';
import { AuthService } from './../../services/auth.service';

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
  constructor(private fb: FormBuilder, private auth: AuthService) {}
  ngOnInit(): void {}
  login(form: any) {
    if (this.loginForm.invalid) {
      Notify.failure('Invalid form', {
        position: 'center-bottom',
      });
      return;
    }

    this.auth.login(form.username, form.password).subscribe({
      next: (data: { user: any; token: string }) => {
        const { token } = data;
        localStorage.setItem('token', token);
        Notify.success('Login success', {
          position: 'center-bottom',
        });
      },
      error: (error) => {
        console.log(
          '🚀 ~ file: login.component.ts ~ line 63 ~ LoginComponent ~ this.auth.login ~ error',
          error
        );
        Notify.failure(error.error.message, {
          position: 'center-bottom',
        });
      },
    });
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
