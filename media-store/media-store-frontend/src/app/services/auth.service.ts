import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

const AUTH_API = '/api/auth/';
const ADMIN_NAME = 'aaa';
const ADMIN_EMAIL = 'a@a.a';
const ADMIN_PASSWORD = 'aaaaaa';

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
    let roleParam = ['user'];
    if (this.isAdmin(formGroup)) {
      roleParam = ['admin'];
    }
    return this.http.post(AUTH_API + 'register', {
      username: formGroup.value.username,
      email: formGroup.value.email,
      password: formGroup.value.password,
      role: roleParam
    }, httpOptions);
  }

  isAdmin(formGroup): boolean {
    const ret =  (formGroup.value.username === ADMIN_NAME &&
      formGroup.value.email === ADMIN_EMAIL &&
      formGroup.value.password === ADMIN_PASSWORD);
    return ret;
  }

}
