import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/enviroments/enviroment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getCart(): any {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Token ${localStorage.getItem('token') || ''}`
    );
    //Append cors headers
    headers.append('Access-Control-Allow-Origin', '*');
    return this.http.get(`${this.baseUrl}carts/`, { headers });
  }

  postCart(data: { id_product: number; quantity: number }): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Token ${localStorage.getItem('token') || ''}`
    );
    return this.http.post(`${this.baseUrl}carts/nuevo/`, data, { headers });
  }
}
