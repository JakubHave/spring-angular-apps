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

  makeInvestment(investment: Investment): Observable<Investment> {
    return this.http.post(INVEST_API_URL, investment).pipe( map(
      response => this.convertResponseToObject(response, Investment.prototype)
    ));
  }
}
