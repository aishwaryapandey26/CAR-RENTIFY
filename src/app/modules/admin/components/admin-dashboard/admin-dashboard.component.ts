import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AdminServiceService } from '../../services/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
  standalone: true,
  imports: [HttpClientModule,RouterModule] // Import necessary modules here
})
export class AdminDashboardComponent implements OnInit {
  cars: any[] = [];

  constructor(private adminService: AdminServiceService, private message: NzMessageService) {}

  ngOnInit() {
    this.getAllCars();
  }

  getAllCars() {
    this.adminService.getAllCars().subscribe((res) => {
      console.log(res);
      this.cars = res.map((element: any) => {
        element.processesImg = 'data:image/jpeg;base64,' + element.returnedImage;
        return element;
      });
    });
  }

  deleteCar(carId: number) {
    this.adminService.deleteCar(carId).subscribe((res) => {
      console.log('Car deleted:', res);
      this.cars = this.cars.filter((car: { id: number; }) => car.id !== carId);
      this.message.success("Car deleted successfully", { nzDuration: 5000 });
    });
  }
}
