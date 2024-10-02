import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CustomerService } from '../../../customer/services/customer.service';

@Component({
  selector: 'app-book-car',
  templateUrl: './book-car.component.html',
  styleUrls: ['./book-car.component.scss'],
  standalone: true,
  imports: [HttpClientModule,RouterModule] // Import necessary modules here
})
export class BookCarComponent implements OnInit {
  carId: number = 0;
  car: any;
  processedImage: string | undefined;
  validateForm!: FormGroup;
  isSpinning: boolean = false;

  constructor(
    private service: CustomerService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private message: NzMessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carId = this.activatedRoute.snapshot.params['id']; // Moved inside ngOnInit
    this.validateForm = this.fb.group({
      toDate: [null, Validators.required],
      fromDate: [null, Validators.required],
    });
    this.getCarById();
  }

  getCarById(): void {
    this.isSpinning = true;
    this.service.getCarById(this.carId).subscribe(
      (res) => {
        this.car = res;
        this.processedImage = 'data:image/jpeg;base64,' + res.returnedImage;
        this.isSpinning = false;
      },
      (err) => {
        console.error('Error fetching car details:', err);
        this.isSpinning = false;
      }
    );
  }

  bookACar(date: any) {
    console.log(date);
    this.isSpinning = true;
    let bookCarDto = {
      fromDate: date.fromDate,
      toDate: date.toDate,
     // userId: /* your logic to get user ID */,
      carId: this.carId
    };

    this.service.bookACar(bookCarDto).subscribe(
      (res) => {
        this.message.success("Booking request submitted successfully", { nzDuration: 5000 });
        this.router.navigateByUrl("/customer/dashboard");
        this.isSpinning = false;
      },
      (error) => {
        console.error(error);
        this.message.error("Something went wrong", { nzDuration: 5000 });
        this.isSpinning = false;
      }
    );
  }
}
