import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customer-dashboard',
  standalone:true,
  imports: [RouterModule] // Add RouterModule here
,
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.scss'] // Fixed: Changed 'styleUrl' to 'styleUrls'
})
export class CustomerDashboardComponent {
  cars:any=[];
  constructor(private service: CustomerService) {} // Fixed: Constructor implementation syntax

  ngOnInit(){
    this.getAllCars();
  }
 
  getAllCars() {
    this.service.getAllCars().subscribe((res) => {
      console.log(res);
      res.forEach((element: any) => {  // Corrected forEach syntax and used 'element'
        element.processesImg = 'data:image/jpeg;base64,' + element.returnedImage;  // Fixed 'elementAt'
        this.cars.push(element);  // Push the element to the 'cars' array
      });
    });
  }

}
