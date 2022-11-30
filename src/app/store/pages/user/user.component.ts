import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Report } from 'notiflix';
import { AuthService } from 'src/app/auth/services/auth.service';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  isLoggedIn: boolean = false;
  isStaff: any;
  user: any;

  userOrders: any[] = [];
  constructor(
    private authService: AuthService,
    private ordersService: OrdersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getInfoUsuario();
  }
  getInfoUsuario() {
    this.authService.getInfoUsuario().subscribe({
      next: (data) => {
        if (data.user) {
          this.isLoggedIn = true;
          this.isStaff = data.user.is_staff;
          this.user = data.user;
          this.getUserOrders();
        }
      },
      error: (err) => {
        Report.failure(
          'Error',
          err.error.message ||
            err.error.detail ||
            'Error obtaining user information',
          'OK'
        );
        this.router.navigate(['/auth/']);
      },
    });
  }

  getUserOrders() {
    this.ordersService.getUserOrders().subscribe({
      next: (data: any) => {
        this.userOrders = data.results;
        console.log(this.userOrders);
      },
    });
  }
}
