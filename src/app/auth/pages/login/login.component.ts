import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Notify, Loading, Report } from 'notiflix';
import { AuthService } from './../../services/auth.service';
import { ISignUp } from '../../interfaces/ISignUp';
import { ActivatedRoute, Router } from '@angular/router';

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
        Validators.minLength(4),
        Validators.pattern('[a-zA-Z0-9]*'),
      ],
    ],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });
  signupForm = this.fb.group({
    username: [
      '',
      [
        Validators.required,
        Validators.minLength(4),
        Validators.pattern('[a-zA-Z0-9]*'),
      ],
    ],
    password: ['', [Validators.required, Validators.minLength(8)]],
    re_password: ['', [Validators.required, Validators.minLength(8)]],
    is_staff: [false],
    name: [
      '',
      [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern('[a-zA-Z ]*'),
      ],
    ],
    lastname: [
      '',
      [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern('[a-zA-Z ]*'),
      ],
    ],
  });

  nuevoAdmin: boolean = false;
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    if (this.activatedRoute.snapshot.data['isSignUp']) {
      this.mostrarSignUp();
    }
    if (this.activatedRoute.snapshot.data['isAdmin']) {
      this.nuevoAdmin = true;
    }
  }

  login(form: any) {
    if (this.loginForm.invalid) {
      Notify.failure('Invalid form', {
        position: 'center-bottom',
      });
      this.loginForm.markAllAsTouched();
      return;
    }
    Loading.dots('Signing in ', {
      svgColor: '#5c2b8a',
    });
    this.auth.login(form.username, form.password).subscribe({
      next: (data: { user: any; token: string }) => {
        if (data.user) {
          Notify.success('Login success', {
            position: 'center-bottom',
          });
          this.router.navigate(['/']);
          Loading.remove();
        } else {
          Loading.remove();

          Report.failure('Error', 'Error while trying to log in.', 'OK');
        }
      },
      error: (error) => {
        Loading.remove();
        console.log(
          '🚀 ~ file: login.component.ts ~ line 63 ~ LoginComponent ~ this.auth.login ~ error',
          error
        );

        Report.failure(
          'Error',
          error.error.message || 'Invalid username or password',
          'OK'
        );
      },
    });
  }
  signup(form: any) {
    if (this.signupForm.invalid) {
      Notify.failure('Invalid form', {
        position: 'center-bottom',
      });
      this.signupForm.markAllAsTouched();
      return;
    }
    if (form.password !== form.re_password) {
      Notify.failure('Passwords do not match', {
        position: 'center-bottom',
      });
      return;
    }
    Loading.dots('Loading...', {
      svgColor: '#5c2b8a',
    });
    const data: ISignUp = {
      username: form.username,
      password: form.password,
      re_password: form.re_password,
      is_staff: form.is_staff,
      first_name: form.name,
      last_name: form.lastname,
    };
    this.postSignUp(data);
  }
  postSignUp(data: ISignUp) {
    this.auth.signup(data).subscribe({
      next: (data: any) => {
        const { detail } = data;
        Loading.remove();
        Notify.success(detail, {
          position: 'center-bottom',
        });
      },
      error: (error: any) => {
        Loading.remove();
        Report.failure(
          'Error',
          error.error.message || 'Error during signup',
          'OK'
        );
      },
      complete: () => {
        this.signupForm.reset();
        this.mostrarLogIn();
      },
    });
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
