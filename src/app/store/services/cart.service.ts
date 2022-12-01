import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { environment } from 'src/enviroments/enviroment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  baseUrl = environment.baseUrl;

  @Output() cartUpdated: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(private http: HttpClient) {}

  getCart(): any {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Token ${localStorage.getItem('token') || ''}`
    );
    //Append cors headers
    headers.append('Access-Control-Allow-Origin', '*');
    return this.http.get(`${this.baseUrl}carts/get-cart/`, { headers });
  }

  postCart(data: { id_product: number; quantity: number }): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Token ${localStorage.getItem('token') || ''}`
    );
    return this.http.post(`${this.baseUrl}carts/nuevo/`, data, { headers });
  }
  increaseQuantity(id: number): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Token ${localStorage.getItem('token') || ''}`
    );
    return this.http.put(`${this.baseUrl}carts/incrementItem/${id}/`, {
      headers,
    });
  }
  decreaseQuantity(id: number): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Token ${localStorage.getItem('token') || ''}`
    );
    return this.http.put(`${this.baseUrl}carts/decrementItem/${id}/`, {
      headers,
    });
  }
  deleteItem(id: number): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Token ${localStorage.getItem('token') || ''}`
    );
    return this.http.delete(`${this.baseUrl}carts/deleteItem/${id}/`, {
      headers,
    });
  }
  clearCart(): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Token ${localStorage.getItem('token') || ''}`
    );
    return this.http.delete(`${this.baseUrl}carts/clearCart/`, { headers });
  }
}
