import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AdminServiceService } from '../../services/admin.service';

@Component({
  selector: 'app-get-bookings',
  templateUrl: './get-bookings.component.html',
  styleUrls: ['./get-bookings.component.scss'],
  standalone: true,
  imports: [HttpClientModule,RouterModule] // Import necessary modules here
})
export class GetBookingsComponent {
  bookings: any;
  isSpinning: boolean = false;

  constructor(private adminService: AdminServiceService, private message: NzMessageService) {
    this.getBookings();
  }

  getBookings() {
    this.isSpinning = true;

    this.adminService.getCarBookings().subscribe((res) => {
      this.isSpinning = false;
      this.bookings = res;
      console.log(this.bookings);
    }, (error) => {
      this.isSpinning = false;
      console.error(error);
    });
  }

  changeBookingStatus(bookingId: number, status: string) {
    this.isSpinning = true;
    this.adminService.changeBookingStatus(bookingId, status).subscribe((res) => {
      this.isSpinning = false;
      console.log(res);
      this.getBookings();
      this.message.success("Booking status changed successfully", { nzDuration: 5000 });
    }, error => {
      this.isSpinning = false;
      this.message.error("Something went wrong", { nzDuration: 5000 });
    });
  }
}
