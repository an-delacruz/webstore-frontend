import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { ProductsComponent } from './pages/products/products.component';
import { MainComponent } from './pages/main/main.component';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [
    ProductsComponent,
    MainComponent
  ],
  imports: [
    CommonModule,
    AdminPanelRoutingModule,
    MaterialModule
  ]
})
export class AdminPanelModule { }
