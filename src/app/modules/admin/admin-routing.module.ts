// src/app/modules/admin/admin-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { GetBookingsComponent } from './components/get-bookings/get-bookings.component';

import { UpdateCarComponent } from './components/update-car/update-car.component';

const routes: Routes = [
  { path: 'dashboard', component: AdminDashboardComponent },
  //{ path: 'car', component: PostCarComponent },

  { path: 'car', component: UpdateCarComponent },
  { path: 'car/:id', component: UpdateCarComponent },
  { path: 'bookings', component: GetBookingsComponent },


  // Add other admin routes here
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
