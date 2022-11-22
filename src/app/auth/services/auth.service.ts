import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroments/enviroment';
import { ISignUp } from '../interfaces/ISignUp';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}usuarios/login/`, {
      username,
      password,
    });
  }
  logout() {
    localStorage.clear();
  }
  signup(data: ISignUp): Observable<any> {
    return this.http.post(`${this.baseUrl}usuarios/nuevo/`, data);
  }
  getInfoUsuario(): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Token ${localStorage.getItem('token') || ''}`
    );
    return this.http.get(`${this.baseUrl}usuarios/me/`, { headers });
  }
}
