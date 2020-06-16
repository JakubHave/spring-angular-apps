import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Stock} from '../model/stock.model';
import {HistoricPrice} from '../model/hystoric-price.model';
import {map} from 'rxjs/operators';

const CORS_PROXY_URL = 'https://cors-middleman-jakub.herokuapp.com/';
const STOCK_API_URL = CORS_PROXY_URL + 'https://api.tiingo.com/tiingo/daily/';
const API_KEY = '7257a4f589d13286aed035ef9d42ff373f2bb280';
const START_DATE = '2020-1-1';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private http: HttpClient) {}

  getStock(stockSymbolName): Observable<Stock> {
    return this.http.get(STOCK_API_URL + stockSymbolName + '/prices',
      { params: {startDate: START_DATE, token: API_KEY}}).pipe( map(
        response => {
          const prices = new Array<HistoricPrice>();
          const histPrices = response as [];
          histPrices.forEach(histPrice => {
            const dateStr = histPrice[`date`] as string;
            prices.push(new HistoricPrice(new Date(dateStr.substring(0, dateStr.indexOf('T'))) , parseFloat(histPrice[`close`])));
          });
          return new Stock(stockSymbolName, prices);
        }
      )
    );
  }

  getStockInfo(stockSymbolName: string): Observable<string> {
    return this.http.get(STOCK_API_URL + stockSymbolName,
      { params: {token: API_KEY} }).pipe( map(
      response => {
          return response[`name`];
        }
      )
    );
  }

}
