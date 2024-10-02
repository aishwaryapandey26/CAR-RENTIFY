import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from '../../../auth/components/services/storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {
  private BASIC_URL = 'http://localhost:8080'; // Define your base URL here

  constructor(private http: HttpClient) { }

  postCar(carDto: any): Observable<any> {
    return this.http.post(`${this.BASIC_URL}/api/admin/car`, carDto, {
      headers: this.createAuthorizationHeader()
    });
  }

  getAllCars(): Observable<any> {
    return this.http.get(`${this.BASIC_URL}/api/admin/cars`, {
      headers: this.createAuthorizationHeader()
    });
  }

  getCarBookings(): Observable<any> {
    return this.http.get(`${this.BASIC_URL}/api/admin/car/bookings`, {
      headers: this.createAuthorizationHeader()
    });
  }

  changeBookingStatus(bookingId: number, status: string): Observable<any> {
    return this.http.put(`${this.BASIC_URL}/api/admin/car/booking/${bookingId}/${status}`, {}, {
      headers: this.createAuthorizationHeader()
    });
  }

  deleteCar(id: number): Observable<any> {
    return this.http.delete(`${this.BASIC_URL}/api/admin/car/${id}`, {
      headers: this.createAuthorizationHeader()
    });
  }

  getCarById(id: number): Observable<any> {
    return this.http.get(`${this.BASIC_URL}/api/admin/car/${id}`, {
      headers: this.createAuthorizationHeader()
    });
  }

  updateCar(carId: number, carDto: any): Observable<any> {
    return this.http.put(`${this.BASIC_URL}/api/admin/car/${carId}`, carDto, {
      headers: this.createAuthorizationHeader()
    });
  }

  createAuthorizationHeader(): HttpHeaders {
    let authHeader: HttpHeaders = new HttpHeaders();
    const token = StorageService.getToken(); // Accessing the static method correctly
    return authHeader.set('Authorization', 'Bearer ' + token);
  }
}
