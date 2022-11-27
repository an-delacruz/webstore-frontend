import { Component, OnInit } from '@angular/core';
import { Report } from 'notiflix';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';
import { CartService } from './../../services/cart.service';
import { IProduct } from './../../interfaces/IProduct';

export interface ICartItem {
  id: number;
  id_user: number;
  product: IProduct;
  quantity: number;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  itemsInCart: ICartItem[] = [];

  usuario: any;

  isLoggedIn: boolean = false;

  isStaff: boolean = false;
  user: any;
  constructor(
    private authService: AuthService,
    private router: Router,
    private cartService: CartService
  ) {}
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
      this.getUserCart();
    }
  }

  getInfoUsuario() {
    this.authService.getInfoUsuario().subscribe({
      next: (data) => {
        if (data.user) {
          this.isLoggedIn = true;
          this.isStaff = data.user.is_staff;
          this.user = data.user;
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

  getUserCart() {
    this.cartService.getCart().subscribe((resp: any) => {
      console.log(resp);
      this.itemsInCart = resp.map((r: any) => {
        return { product: r.id_product, ...r };
      });
    });
  }
  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/']);
  }
}
