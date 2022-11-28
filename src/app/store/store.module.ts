import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreRoutingModule } from './store-routing.module';
import { MainComponent } from './pages/main/main.component';
import { ShopComponent } from './pages/shop/shop.component';
import { MaterialModule } from '../material/material.module';
import { ProductsAdminComponent } from './pages/products-admin/products-admin.component';
import { ModalProductComponent } from './components/modal-product/modal-product.component';
import { TruncatePipe } from '../global/pipes/truncate.pipe';
import { GlobalModule } from '../global/global.module';

@NgModule({
  declarations: [
    MainComponent,
    ShopComponent,
    ProductsAdminComponent,
    ModalProductComponent,
  ],
  imports: [
    CommonModule,
    StoreRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    GlobalModule,
  ],
  providers: [TruncatePipe],
})
export class StoreModule {}
