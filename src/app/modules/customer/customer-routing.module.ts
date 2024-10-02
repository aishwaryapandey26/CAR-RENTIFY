import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BookCarComponent } from "../admin/components/book-car/book-car.component";
import { MyBookingsComponent } from "../admin/components/my-bookings/my-bookings.component";
import { CustomerDashboardComponent } from "./components/customer-dashboard/customer-dashboard.component";


const route:Routes=[
  {
    path:"dashboard",component:CustomerDashboardComponent
  },
  {
    path:"book/:id",component:BookCarComponent
  },
  {
    path:"my_bookings",component:MyBookingsComponent
  },
];

@NgModule({
  imports:[RouterModule.forChild(route)],
  exports:[RouterModule]
})
export class CustomerRoutingModule{}