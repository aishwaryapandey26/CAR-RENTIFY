import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSpinModule } from 'ng-zorro-antd/spin'; // Import NzSpinModule
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  standalone: true, // Marking the component as standalone
  imports: [RouterModule, ReactiveFormsModule, CommonModule, NzSpinModule] // Importing necessary modules
})
export class SignupComponent implements OnInit {
  isSpinning = false;
  signupForm!: FormGroup;
  submitted = false; // Track form submission state

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private message: NzMessageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required]], // Initialize with an empty string
      email: ['', [Validators.required, Validators.email]], // Initialize with an empty string
      password: ['', [Validators.required, Validators.minLength(8)]], // Initialize with an empty string
      confirmPassword: ['', [Validators.required, this.confirmationValidate.bind(this)]],
      username: ['', [Validators.required]] // Initialize with an empty string
    });

    console.log(this.signupForm.controls); // Verify that the controls are initialized correctly
  }

  confirmationValidate(control: FormControl): { [s: string]: boolean } | null {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.signupForm.get('password')?.value) {
      return { confirm: true, error: true };
    }
    return null;
  }

  register() {
    console.log(this.signupForm.value);
    this.submitted = true; // Mark form as submitted
    if (this.signupForm.valid) {
      this.isSpinning = true; // Show spinner while making API call
      console.log('Form Data:', this.signupForm.value); // Log the data
      this.authService.register(this.signupForm.value).subscribe({
        next: (res) => {
          console.log('Registration successful', res);
          this.isSpinning = false; // Hide spinner once request is done
          if (res.id != null) {
            this.message.success("Signup successful", { nzDuration: 5000 });
            this.router.navigateByUrl("/login");
          } else {
            this.message.error("Unexpected response from server", { nzDuration: 5000 });
          }
        },
        error: (err) => {
          console.error('Registration failed', err);
          this.isSpinning = false; // Hide spinner even if request fails
          const errorMsg = err.error?.message || "Something went wrong"; // Show specific error if available
          this.message.error(errorMsg, { nzDuration: 5000 });
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }

  onSubmit() {
    this.register(); // Call the register method on form submit
  }
}
