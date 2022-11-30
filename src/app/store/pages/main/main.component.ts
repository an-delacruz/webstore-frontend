import { Component, OnInit } from '@angular/core';
import { Report } from 'notiflix';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';
import { CartService } from './../../services/cart.service';
import { IProduct } from './../../interfaces/IProduct';
import { MatDialog } from '@angular/material/dialog';
import { ModalUsuarioComponent } from 'src/app/global/components/modal-usuario/modal-usuario.component';

export interface ICartItem {
  id: number;
  id_user: number;
  cost: number;
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

  total: number = 0;
  constructor(
    private authService: AuthService,
    private router: Router,
    private cartService: CartService,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.cartService.cartUpdated.subscribe((resp) => {
      if (resp) this.getUserCart();
    });
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
      this.itemsInCart = resp.map((r: any) => {
        return { product: r.id_product, ...r };
      });
      this.total = this.itemsInCart.reduce((acc, item) => {
        return acc + item.cost;
      }, 0);
    });
  }
  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/']);
  }
  incrementItemInCart(item: ICartItem) {
    this.cartService.increaseQuantity(item.id).subscribe((resp: any) => {
      this.getUserCart();
    });
  }
  decrementItemInCart(item: ICartItem) {
    this.cartService.decreaseQuantity(item.id).subscribe((resp: any) => {
      this.getUserCart();
    });
  }
  deleteItemInCart(item: ICartItem) {
    this.cartService.deleteItem(item.id).subscribe((resp: any) => {
      this.getUserCart();
    });
  }
  clearCart() {
    this.cartService.clearCart().subscribe((resp: any) => {
      this.getUserCart();
    });
  }
  checkout() {
    this.router.navigate(['/order']);
  }
  abrirModalUsuario() {
    this.dialog
      .open(ModalUsuarioComponent, {
        data: this.user,
      })
      .afterClosed()
      .subscribe((resp) => {
        if (resp) {
          this.getInfoUsuario();
        }
      });
  }
}
