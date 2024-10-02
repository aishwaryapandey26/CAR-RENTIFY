import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CustomerService } from '../../../customer/services/customer.service';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './post-car.component.html',
  styleUrls: ['./post-car.component.scss'],
  standalone: true,
  imports: [HttpClientModule,RouterModule] // Import necessary modules here
})
export class MyBookingsComponent {
  bookings: any;
  isSpinning: boolean = false;

  constructor(private service: CustomerService) {
    this.getMyBookings();
  }

  getMyBookings() {
    this.isSpinning = true;
    this.service.getBookingsByUserId().subscribe((res) => {
      this.isSpinning = false;
      this.bookings = res;
    });
  }
}
