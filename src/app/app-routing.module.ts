import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component'; // Direct reference to the component
import { SignupComponent } from './auth/components/signup/signup.component';

const routes: Routes = [
  { path: 'register', component: SignupComponent }, // Use consistent naming ('register')
  { path: 'login', component: LoginComponent },  // No lazy loading for components

  // Lazy-loaded modules for admin and customer
  { path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule) },
  { path: 'customer', loadChildren: () => import('./modules/customer/customer.module').then(m => m.CustomerModule) },
  
  // Default route to login
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  
  // Wildcard route to handle unmatched paths
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
