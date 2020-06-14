import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

const STOCK_API_URL = 'https://www.alphavantage.co/query';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private http: HttpClient) {}

  getStock(): Observable<any> {
    return this.http.get(STOCK_API_URL + 'all',
      { params: {function: 'TIME_SERIES_DAILY', symbol: 'BA', apikey: 'XHAXAVU5SZDIWCH6'} })  ;
  }

}
