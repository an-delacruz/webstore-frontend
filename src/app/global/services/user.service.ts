import { Injectable } from '@angular/core';
import { environment } from 'src/enviroments/enviroment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  updateUser(data: any): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Token ${localStorage.getItem('token') || ''}`
    );
    return this.http.put(`${this.baseUrl}usuarios/actualizar/`, data, {
      headers,
    });
  }
}
