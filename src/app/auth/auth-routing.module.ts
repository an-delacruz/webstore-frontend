import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { LoginComponent } from './pages/login/login.component';
import { RoleGuard } from '../guards/role.guard';

const routes: Routes = [
  {
    path: 'signup/admin',
    component: LoginComponent,
    canActivate: [RoleGuard],
    data: {
      role: 'staff',
      isSignUp: true,
      isAdmin: true,
    },
  },
  {
    path: '',
    component: LoginComponent,
    data: {
      data: {
        isSignUp: false,
        isAdmin: false,
      },
    },
  },
  {
    path: 'signup',
    component: LoginComponent,
    data: {
      isSignUp: true,
      isAdmin: false,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
