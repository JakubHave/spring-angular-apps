import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

const AUTH_API = '/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  login(formGroup): Observable<any> {
    return this.http.post(AUTH_API + 'login', {
      username: formGroup.value.username,
      password: formGroup.value.password
    }, httpOptions);
  }

  register(formGroup): Observable<any> {
    return this.http.post(AUTH_API + 'register', {
      username: formGroup.value.username,
      email: formGroup.value.email,
      password: formGroup.value.password,
      role: ['user']
    }, httpOptions);
  }
}
