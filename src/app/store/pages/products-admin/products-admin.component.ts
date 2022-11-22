import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { Report, Loading, Confirm } from 'notiflix';
import { ProductsService } from '../../services/products.service';
import { IProduct } from '../../interfaces/IProduct';
import { MatDialog } from '@angular/material/dialog';
import { ModalProductComponent } from '../../components/modal-product/modal-product.component';

@Component({
  selector: 'app-products-admin',
  templateUrl: './products-admin.component.html',
  styleUrls: ['./products-admin.component.css'],
})
export class ProductsAdminComponent implements OnInit {
  horaActualizacion: string = moment().format(' HH:mm');

  products: any[] = [];
  dataSourceProducts = new MatTableDataSource<any>(this.products);
  productsColumns: string[] = ['name', 'description', 'price', 'stock'];
  @ViewChild('productsPaginator') productsPaginator: MatPaginator | any;

  constructor(
    private productsService: ProductsService,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    Loading.circle('Loading products...');
    this.getProducts();
  }

  getProducts() {
    this.productsService.getProducts().subscribe({
      next: (data) => {
        this.products = data.results;
        this.dataSourceProducts = new MatTableDataSource<any>(this.products);
        this.dataSourceProducts.paginator = this.productsPaginator;
        Loading.remove();
      },
      error: (err) => {
        Loading.remove();
        Report.failure(
          'Error',
          err.error.message || err.detail || 'Error obtaining products',
          'OK'
        );
      },
    });
  }
  eliminarProducto(producto: IProduct) {
    Confirm.show(
      'Are you sure?',
      '¿Do you want to delete this product?',
      'Yes',
      'No',
      () => {
        Loading.circle('Deleting product...', {
          svgColor: '#5c2b8a',
        });
        this.productsService.deleteProduct(producto.id || 0).subscribe({
          next: (data) => {
            Loading.remove();
            console.log(data);
          },
          error: (err) => {
            Loading.remove();
            Report.failure(
              'Error',
              err.error.message ||
                err.detail ||
                'Error obtaining user information',
              'OK'
            );
          },
        });
      },
      () => {}
    );
  }
  abrirModalNuevoProducto() {
    this.dialog.open(ModalProductComponent, {
      width: '50%',
    });
  }
  abrirModalEditarProducto(producto: IProduct) {
    this.dialog.open(ModalProductComponent, {
      width: '50%',
      data: producto,
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceProducts.filter = filterValue.trim().toLowerCase();
  }
}
