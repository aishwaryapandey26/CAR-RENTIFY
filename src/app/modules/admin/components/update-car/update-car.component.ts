import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AdminServiceService } from '../../services/admin.service';

@Component({
  selector: 'app-update-car',
  standalone:true,
  imports: [RouterModule], // Add RouterModule here

  templateUrl: './update-car.component.html',
  styleUrls: ['./update-car.component.scss']
})
export class UpdateCarComponent implements OnInit {
  carId: number = this.activatedRoute.snapshot.params["id"];
  updateForm!: FormGroup;
  imgChanged=false;
  selectedFile:any;
  imagePreview:string | ArrayBuffer | null | undefined;
  isSpinning = false;
  existingImage: string | null = null;  // Declared the existingImage
  listOfBrands = ["BMW", "AUDI", "FERRARI", "TESLA", "VOLVO", "TOYOTA", "HONDA", "FORD", "NISSAN", "HYUNDAI"];
  listOfType = ["Petrol", "Hybrid", "Diesel", "Electric", "CNG"];
  listOfColor = ["Red", "Black", "White", "Blue", "Orange", "Grey", "Silver"];
  listOfTransmission = ["Manual", "Automatic"];
  listOfPrices = ["20,000 USD", "25,000 USD", "30,000 USD", "35,000 USD"];

  constructor(
    private adminService: AdminServiceService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private message:NzMessageService,
    private router:Router

  ) {}

  ngOnInit(): void {
    this.updateForm = this.fb.group({
      name: [null, Validators.required],
      brand: [null, Validators.required],
      type: [null, Validators.required],
      color: [null, Validators.required],
      transmission: [null, Validators.required],
      price: [null, Validators.required],
      description: [null, Validators.required],
      year: [null, Validators.required]
    });
    this.getCarById();
  }

  submitForm(): void {
    if (this.updateForm?.valid) {
      console.log('Form Submitted', this.updateForm.value);
      // You can add further logic here, like making an API call
    } else {
      console.log('Form is invalid');
      this.updateForm?.markAllAsTouched(); // This will show validation errors
    }
  }


  getCarById() {
    this.isSpinning=true;
    this.adminService.getCarById(this.carId).subscribe((res) => {
      this.isSpinning=false;
      const carDto = res;
      this.existingImage = 'data:image/jpeg;base64,' + res.returnedImage;
      console.log(carDto);
      console.log(this.existingImage);
  
      // Patch the form with the car details (make sure carDto keys match the form control names)
      this.updateForm?.patchValue({
        name: carDto.name,
        brand: carDto.brand,
        type: carDto.type,
        color: carDto.color,
        transmission: carDto.transmission,
        price: carDto.price,
        description: carDto.description,
        year: carDto.year
      });
    });
  }

  updateCar(){
    if (this.updateForm.valid) {
      console.log(this.updateForm.value);
      const formData: FormData = new FormData();
      if (this.imgChanged&& this.selectedFile) {
        formData.append('img', this.selectedFile); // Append the selected file
      }
      formData.append('brand', this.updateForm.get('brand')?.value); // Using postCarform here
      formData.append('name', this.updateForm.get('name')?.value);
      formData.append('type', this.updateForm.get('type')?.value);
      formData.append('color', this.updateForm.get('color')?.value);
      formData.append('year', this.updateForm.get('year')?.value);
      formData.append('transmission', this.updateForm.get('transmission')?.value);
      formData.append('description', this.updateForm.get('description')?.value);
      formData.append('price', this.updateForm.get('price')?.value);
      console.log(formData);
      this.adminService.updateCar(this.carId,formData).subscribe((res)=>{
        this.isSpinning=false;
        this.message.success("car updated successfully",{nzDuration:5000});
        this.router.navigate(['/admin/dashboard']);

        console.log(res);
      }, error=>{
        this.message.error("error while uploading car",{nzDuration:5000})
      })
    } else {
      console.log('Form is invalid');
    }
  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.imgChanged = true;
    this.existingImage = null;
    this.previewImage();
  }
  
  previewImage() {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result; // reader.result gives the base64 encoded image
    };
    reader.readAsDataURL(this.selectedFile);
  }
  
}
