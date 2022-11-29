import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getUserOrders() {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Token ${localStorage.getItem('token') || ''}`
    );
    return this.http.get(`${this.baseUrl}orders/historial/`, { headers });
  }

  createOrder(direction: string) {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Token ${localStorage.getItem('token') || ''}`
    );
    return this.http.post(
      `${this.baseUrl}orders/createOrder/`,
      { direction },
      { headers }
    );
  }
  cancelOrder(id: number) {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Token ${localStorage.getItem('token') || ''}`
    );
    return this.http.delete(`${this.baseUrl}orders/delete/${id}`, { headers });
  }
}
