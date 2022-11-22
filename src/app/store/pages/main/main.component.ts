import { Component, OnInit } from '@angular/core';
import { Report } from 'notiflix';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  itemsInCart = 0;

  usuario: any;

  isLoggedIn: boolean = false;
  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    // if (localStorage.getItem('token')) {
    //   this.isLoggedIn = true;
    // }
    if (!localStorage.getItem('token')) {
      this.isLoggedIn = false;
      return;
    }
    if (localStorage.getItem('token')) {
      this.getInfoUsuario();
    }
  }

  getInfoUsuario() {
    this.authService.getInfoUsuario().subscribe({
      next: (data) => {
        if (data.user) {
          this.isLoggedIn = true;
        }
      },
      error: (err) => {
        Report.failure(
          'Error',
          err.error.message || err.detail || 'Error obtaining user information',
          'OK'
        );
        this.router.navigate(['/auth/']);
      },
    });
  }
  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/']);
  }
}
