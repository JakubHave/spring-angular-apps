import {Inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {WINDOW} from '../window-provider';

const PUBLIC_API_URL = '/api/public/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  hostName: string;

  constructor(private http: HttpClient, @Inject(WINDOW) private window: Window) {
    this.hostName = this.window.location.hostname;
  }

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
