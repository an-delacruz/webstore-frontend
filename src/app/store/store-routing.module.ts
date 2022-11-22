import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { ShopComponent } from './pages/shop/shop.component';
import { ProductsAdminComponent } from './pages/products-admin/products-admin.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'products',
        component: ProductsAdminComponent,
      },
      // {
      //   path: '**',
      //   component: ShopComponent,
      // },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreRoutingModule {}
