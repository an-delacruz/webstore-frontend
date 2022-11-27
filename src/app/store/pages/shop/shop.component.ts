import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../interfaces/IProduct';
import { CartService } from '../../services/cart.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit {
  productos: IProduct[] = [];

  constructor(
    private productosService: ProductsService,
    private cartService: CartService
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
    let data = {
      id_product: id,
      quantity: 1,
    };

    this.cartService.postCart(data).subscribe((resp: any) => {
      console.log('resp', resp);
    });
  }
}
