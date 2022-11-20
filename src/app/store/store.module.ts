import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreRoutingModule } from './store-routing.module';
import { MainComponent } from './pages/main/main.component';
import { ShopComponent } from './pages/shop/shop.component';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [
    MainComponent,
    ShopComponent
  ],
  imports: [
    CommonModule,
    StoreRoutingModule,
    MaterialModule
  ]
})
export class StoreModule { }
