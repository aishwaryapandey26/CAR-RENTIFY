import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthService } from '../services/auth/auth.service';
import { StorageService } from '../services/storage/storage.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
 
  standalone: true ,
  imports: [RouterModule,FormsModule,CommonModule] ,// Importing RouterModule here
  // Marking the component as standalone
})
export class LoginComponent implements OnInit {
  isSpinning: boolean = false;
  loginForm!: FormGroup;

  email: string = ''; // Add this line
  password: string = '';
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private message: NzMessageService
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  login() {
    this.isSpinning = true;
    console.log(this.loginForm.value); // Consider removing in production
    console.log('Logging in with', this.email, this.password);

    this.authService.login(this.loginForm.value).subscribe(
      (res) => {
        console.log(res); // Keep or remove based on needs
        if (res.userId != null) {
          const user = {
            id: res.userId,
            role: res.userRole
          };

          StorageService.saveUser(user);
          StorageService.saveToken(res.jwt);

          if (StorageService.isAdminLoggedIn()) {
            this.router.navigateByUrl("/admin/dashboard");
          } else if (StorageService.isCustomerLoggedIn()) {
            this.router.navigateByUrl("/customer/dashboard");
          } else {
            this.message.error("Bad credentials", { nzDuration: 5000 });
          }
        }

        this.isSpinning = false;
      },
      (err) => {
        console.error('Login error', err);
        this.message.error("Login failed. Please try again.", { nzDuration: 5000 });
        this.isSpinning = false;
      }
    );
  }
}
