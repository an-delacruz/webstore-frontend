import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Loading, Notify, Report } from 'notiflix';
import { ICartItem } from '../main/main.component';
import { CartService } from './../../services/cart.service';
import { OrdersService } from './../../services/orders.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  itemsInCart: ICartItem[] = [];
  addressForm = this.fb.group({
    street: ['', [Validators.required]],
    number: ['', [Validators.pattern('[0-9]*')]],
    zip: [, [Validators.required, Validators.pattern('[0-9]*')]],
    state: ['', [Validators.required]],
  });
  constructor(
    private cartService: CartService,
    private ordersService: OrdersService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUserCart();
  }

  getUserCart() {
    this.cartService.getCart().subscribe((resp: any) => {
      this.itemsInCart = resp.map((r: any) => {
        return { product: r.id_product, ...r };
      });
    });
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

  subtotal() {
    return this.itemsInCart.reduce((acc, item) => {
      return acc + item.cost;
    }, 0);
  }

  tax() {
    return this.subtotal() * 0.16;
  }

  total() {
    return this.subtotal();
  }

  pay(form: any) {
    console.log(form);
    if (this.addressForm.invalid) {
      this.addressForm.markAllAsTouched();
      return;
    }
    Loading.circle('Creating order...', {
      svgColor: '#5c2b8a',
    });
    const direction = `${form.street} ${form.number}, ${form.zip}, ${form.state}`;
    this.ordersService.createOrder(direction).subscribe({
      next: (resp: any) => {
        Loading.remove();
        Notify.success('Order Created', {
          position: 'center-bottom',
        });

        this.generarPDF(resp.order.id);
        this.cartService.cartUpdated.emit(true);
        this.router.navigate(['/']);
      },
      error: (err) => {
        Loading.remove();
        Report.failure(
          'Error',
          err.error.detail || err.msg || 'Error updating product',
          'OK'
        );
      },
    });
  }
  generarPDF(idOrder: number) {
    this.ordersService.generatePDFOrder(idOrder).subscribe({
      next: (resp: any) => {
        const dataurl = `data:application/pdf;base64,${resp}`;
        const pdf = this.convertStringToPDF(dataurl);
        const url = window.URL.createObjectURL(pdf);
        window.open(url, '_blank');
      },
    });
  }
  convertStringToPDF = (dataurl: string) => {
    var arr: any = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  };
}
