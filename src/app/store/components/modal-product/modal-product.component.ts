import { FormBuilder, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { Notify, Loading, Report } from 'notiflix';
import { IProduct } from '../../interfaces/IProduct';
import { ProductsService } from '../../services/products.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-product',
  templateUrl: './modal-product.component.html',
  styleUrls: ['./modal-product.component.css'],
})
export class ModalProductComponent implements OnInit {
  productForm = this.fb.group({
    name: [
      '',
      [
        Validators.required,
        Validators.minLength(4),
        Validators.pattern('[a-zA-Z0-9 ]*'),
      ],
    ],
    description: [
      '',
      [
        Validators.required,
        Validators.minLength(4),
        Validators.pattern('[a-zA-Z0-9 ]*'),
      ],
    ],
    price: [
      0,
      [
        Validators.required,
        Validators.minLength(4),
        Validators.pattern('[0-9].*'),
      ],
    ],
    stock: [
      0,
      [
        Validators.required,
        Validators.minLength(4),
        Validators.pattern('[0-9]*'),
      ],
    ],
  });

  file: any;
  fileName: any;
  productImg: any;

  esEditar: boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private productsService: ProductsService,
    private dialogRef: MatDialogRef<ModalProductComponent>
  ) {
    if (data) {
      this.esEditar = true;
      this.productForm.patchValue({
        ...data,
      });
    }
  }
  ngOnInit(): void {}
  onSubmit(form: any) {
    if (this.productForm.invalid) {
      Notify.failure('Invalid form', {
        position: 'center-bottom',
      });
      this.productForm.markAllAsTouched();
      return;
    }

    const data: IProduct = {
      name: form.name,
      description: form.description,
      price: form.price,
      stock: form.stock,
      img: this.productImg,
    };
    if (this.esEditar) {
      Loading.circle('Updating product...', {
        svgColor: '#5c2b8a',
      });
      this.putProduct(data);
      return;
    }
    Loading.circle('Saving product...', {
      svgColor: '#5c2b8a',
    });
    this.postProduct(data);
  }
  postProduct(product: IProduct) {
    this.productsService.postProduct(product).subscribe({
      next: (data) => {
        Loading.remove();
        Notify.success('Product Saved', {
          position: 'center-bottom',
        });
        this.dialogRef.close(true);
        this.productForm.reset();
      },
      error: (err) => {
        Loading.remove();
        Report.failure(
          'Error',
          err.error.message || 'Error saving product',
          'OK'
        );
      },
    });
  }
  putProduct(product: IProduct) {
    this.productsService.putProduct(product).subscribe({
      next: (data) => {
        Loading.remove();
        Notify.success('Product Updated', {
          position: 'center-bottom',
        });
        this.dialogRef.close(true);
        this.productForm.reset();
      },
      error: (err) => {
        Loading.remove();
        Report.failure(
          'Error',
          err.error.message || 'Error updating product',
          'OK'
        );
      },
    });
  }
  onFileSelected(event: any) {
    this.file = event.target.files[0];

    let reader = new FileReader();
    reader.readAsDataURL(this.file);
    reader.onload = (_event) => {
      this.productImg = reader.result as string;
    };
    if (this.file) {
      //Aqui se guarda el nombre del archivo.
      this.fileName = this.file.name.slice(0, 16) + '...';
    }
  }
}
