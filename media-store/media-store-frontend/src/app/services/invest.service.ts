import {Injectable} from '@angular/core';
import {Investment} from '../model/investment.model';
import {Observable} from 'rxjs';
import {BaseService} from './base.service';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

const INVEST_API_URL = '/api/invest';

@Injectable({
  providedIn: 'root'
})
export class InvestService extends BaseService  {

  constructor(private http: HttpClient) {
    super();
  }

  getAllInvestmentsByUser(username: string): Observable<Investment[]> {
    return this.http.get(INVEST_API_URL + '/' + username ).pipe( map(
      response => this.convertResponseToArray(response, Investment.prototype)
    ));
  }

  makeInvestment(investment: Investment): Observable<Investment> {
    return this.http.post(INVEST_API_URL, investment).pipe( map(
      response => this.convertResponseToObject(response, Investment.prototype)
    ));
  }

  removeInvestment(investment: Investment): Observable<Investment> {
    return this.http.delete(INVEST_API_URL + '/' + investment.id).pipe( map(
      response => this.convertResponseToObject(response, Investment.prototype)
    ));
  }
}
