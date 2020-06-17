import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../model/user.model';
import {BaseService} from './base.service';
import {map} from 'rxjs/operators';

const PUBLIC_API_URL = '/api/public/';
const USERS_API_URL = '/api/users/';

@Injectable({
  providedIn: 'root'
})
export class UserService extends  BaseService {

  constructor(private http: HttpClient) {
    super();
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

  getAllUsers(): Observable<User[]> {
    return this.http.get( USERS_API_URL + 'all').pipe( map(
      response => this.convertResponseToArray(response, User.prototype)
    ));
  }

  removeUser(user: User): Observable<User> {
    return this.http.delete(USERS_API_URL + '/' + user.name ).pipe( map(
  response => this.convertResponseToObject(response, User.prototype)
  ));
  }
}
