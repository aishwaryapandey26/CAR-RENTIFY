import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from '../../../auth/components/services/storage/storage.service';
const BASIC_URL = ['http://localhost:8080']; 
@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  [x: string]: any;

  constructor(private http:HttpClient) { }

  getAllCars(): Observable<any>{
    return this.http.get(this.BASIC_URL+"/api/customer/cars/",{
      headers: this.createAuthorizationHeader()
    })
  }

  getCarById(carId:number): Observable<any>{
    return this.http.get(this.BASIC_URL+"/api/customer/car/"+carId,{
      headers: this.createAuthorizationHeader()
    })
  }

  getBookingsByUserId(): Observable<any>{
    return this.http.get(this.BASIC_URL+"/api/customer/car/bookings/"+ StorageService.getUser,{
      headers: this.createAuthorizationHeader()
    })
  }


  bookACar(bookCarDto:any): Observable<any>{
    return this.http.get(this.BASIC_URL+"/api/customer/car/book/"+bookCarDto,{
      headers: this.createAuthorizationHeader()
    })
  }
  createAuthorizationHeader(): HttpHeaders {
    let authHeader: HttpHeaders = new HttpHeaders();
    return authHeader.set(
      'Authorization',
      'Bearer ' + this.storageService.getToken()  // Now you can get the token from the service
    );
  }}
