import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { ShopComponent } from './pages/shop/shop.component';
import { ProductsAdminComponent } from './pages/products-admin/products-admin.component';
import { RoleGuard } from '../guards/role.guard';
import { OrderComponent } from './pages/order/order.component';
import { UserComponent } from './pages/user/user.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'products',
        component: ProductsAdminComponent,
        canActivate: [RoleGuard],
        data: { role: 'staff' },
      },
      {
        path: 'order',
        component: OrderComponent,
        canActivate: [RoleGuard],
        data: { role: 'staff' },
      },
      {
        path: 'profile',
        component: UserComponent,
        canActivate: [RoleGuard],
        data: { role: 'staff' },
      },
      {
        path: '',
        component: ShopComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreRoutingModule {}
