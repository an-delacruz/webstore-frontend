import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../interfaces/IProduct';
import { CartService } from '../../services/cart.service';
import { ProductsService } from '../../services/products.service';
import { MainComponent } from '../main/main.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit {
  productos: IProduct[] = [];

  constructor(
    private productosService: ProductsService,
    private cartService: CartService,
    private router: Router,
    private mainComponent: MainComponent
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productosService.getProducts().subscribe((resp) => {
      this.productos = resp.results;
    });
  }

  addProductToCart($event: any, id: number) {
    if (!this.mainComponent.isLoggedIn) {
      this.router.navigate(['/auth']);
      return;
    }

    let data = {
      id_product: id,
      quantity: 1,
    };

    this.cartService.postCart(data).subscribe((resp: any) => {
      this.cartService.cartUpdated.emit(true);
    });
  }
}
