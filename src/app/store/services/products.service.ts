import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/enviroments/enviroment';
import { IProduct } from '../interfaces/IProduct';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Token ${localStorage.getItem('token') || ''}`
    );
    return this.http.get(`${this.baseUrl}productos/todos/`, {
      headers,
    });
  }
  postProduct(data: IProduct): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Token ${localStorage.getItem('token') || ''}`
    );
    return this.http.post(`${this.baseUrl}productos/nuevo`, data, { headers });
  }
  putProduct(data: IProduct): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Token ${localStorage.getItem('token') || ''}`
    );
    return this.http.put(`${this.baseUrl}productos/editar/${data.id}`, data, {
      headers,
    });
  }
  deleteProduct(id: number): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Token ${localStorage.getItem('token') || ''}`
    );
    return this.http.delete(`${this.baseUrl}productos/eliminar/${id}`, {
      headers,
    });
  }
}
