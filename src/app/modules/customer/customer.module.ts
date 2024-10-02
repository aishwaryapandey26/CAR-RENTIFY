
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker'; // Import the DatePicker module
import { NzFormModule } from 'ng-zorro-antd/form'; // Assuming you also need form elements
import { NzSpinModule } from 'ng-zorro-antd/spin'; // Add this import
import { NzTableModule } from 'ng-zorro-antd/table';
@NgModule({
  declarations:[]
  ,
  imports: [
RouterModule,NzDatePickerModule,
    CommonModule,
    FormsModule,
    NzTableModule,

    ReactiveFormsModule,
    NzSpinModule, // Add this to imports array
    NzFormModule, // Ensure form module is imported if using nz-form-item
    // other modules
  ]
})
export class CustomerModule { }  // or AdminModule or AppModule depending on your setup
