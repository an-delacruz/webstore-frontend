import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { environment } from 'src/enviroments/enviroment';
import { ISignUp } from '../interfaces/ISignUp';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _user: any;
  baseUrl = environment.baseUrl;

  get user() {
    return { ...this._user };
  }

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http
      .post(`${this.baseUrl}usuarios/login/`, {
        username,
        password,
      })
      .pipe(
        tap((resp: any) => {
          console.log(resp);
          if (resp.user) {
            this._user = resp.user;
            localStorage.setItem('token', resp.token);
          }
        }),
        catchError((err) => of(err))
      );
  }
  logout() {
    this._user = null;
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
    return this.http.get(`${this.baseUrl}usuarios/me/`, { headers }).pipe(
      tap((resp: any) => {
        if (resp.user) {
          this._user = resp.user;
        }
      })
    );
  }
}
