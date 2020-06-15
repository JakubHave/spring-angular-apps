import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Stock} from '../model/stock.model';
import {HistoricPrice} from '../model/hystoric-price.model';
import {map} from 'rxjs/operators';

const STOCK_API_URL = 'https://www.alphavantage.co/query';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private http: HttpClient) {}

  getStock(): Observable<Stock> {
    return this.http.get(STOCK_API_URL + 'all',
      { params: {function: 'TIME_SERIES_DAILY', symbol: 'MSFT', apikey: 'XHAXAVU5SZDIWCH6'} }).pipe( map(
        response => {
          const symbol = response['Meta Data']['2. Symbol'];
          const histPrices = response['Time Series (Daily)'];
          const prices = new Array<HistoricPrice>();
          for (const [date, price] of Object.entries(histPrices)) {
            prices.unshift(new HistoricPrice(date, parseFloat(price['4. close'])));
          }
          return new Stock(symbol, prices);
        }
      )
    );
  }
}
