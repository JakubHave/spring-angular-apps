import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

const PUBLIC_API_URL = '/api/public/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  getPublicContent(): Observable<any> {
    return this.http.get(PUBLIC_API_URL + 'all', { responseType: 'text' });
  }

  getUserSite(): Observable<any> {
    return this.http.get(PUBLIC_API_URL + 'user', { responseType: 'text' });
  }

  getAdminSite(): Observable<any> {
    return this.http.get( PUBLIC_API_URL + 'admin', { responseType: 'text' });
  }
}
