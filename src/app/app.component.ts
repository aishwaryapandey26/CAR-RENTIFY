import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { StorageService } from './auth/components/services/storage/storage.service';
@Component({
  selector: 'app-root',
  standalone:true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports:[RouterModule,CommonModule]
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'car_rental_angular';

  isCustomerLoggedIn: boolean =StorageService.isCustomerLoggedIn();
  isAdminLoggedIn: boolean=StorageService.isAdminLoggedIn();
  private routerSubscription!: Subscription;
  private subscription: Subscription = new Subscription();

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(event=>{
      if(event.constructor.name==="NavigationEnd"){
        this.isAdminLoggedIn=StorageService.isAdminLoggedIn();
        this.isCustomerLoggedIn=StorageService.isCustomerLoggedIn();
      }
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe(); // Safely unsubscribe
  }

  private updateLoginStatus() {
    this.isAdminLoggedIn = StorageService.isAdminLoggedIn();
    this.isCustomerLoggedIn = StorageService.isCustomerLoggedIn();
  }

  logout() {
    StorageService.logout();  // Calling the static logout method
    this.router.navigateByUrl('/login');
  }
}
