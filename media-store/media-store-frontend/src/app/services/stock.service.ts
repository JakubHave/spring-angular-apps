import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Stock} from '../model/stock.model';
import {HistoricPrice} from '../model/hystoric-price.model';
import {map} from 'rxjs/operators';
import {BaseService} from './base.service';
import {GraphItem} from '../model/graph-item.model';
import {DateValueItem} from '../model/date-value-item.model';

const CORS_PROXY_URL = 'https://cors-middleman-jakub.herokuapp.com/';
const EXTERNAL_STOCK_API_URL = CORS_PROXY_URL + 'https://api.tiingo.com/tiingo/daily/';
const STOCK_API_URL = '/api/stock';
const API_KEY = '7257a4f589d13286aed035ef9d42ff373f2bb280';
const START_DATE = '2020-1-1';

@Injectable({
  providedIn: 'root'
})
export class StockService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  loadStocksFromDB(stockNames: string[]): Subject<GraphItem[]> {
    const itemsSubject = new Subject<GraphItem[]>();
    this.getStocksByNameFromDB(stockNames).subscribe(
      res => {
        const tempGraphItems = new Array<GraphItem>();
        res.forEach((stock, index) => {
          const series = new Array<DateValueItem>();
          stock.prices.forEach(price => series.push(new DateValueItem(price.date, price.price)));
          const graphItem = new GraphItem(stock.name, series);
          tempGraphItems.push(graphItem);
          if (index === res.length - 1 ) {
            itemsSubject.next(tempGraphItems);
          }
        });
      }
    );
    return itemsSubject;
  }

  loadStocksFromExtAndUpdate(stockNames: string[]): Subject<GraphItem[]> {
    const itemsSubject = new Subject<GraphItem[]>();
    const tempGraphItems = new Array<GraphItem>();
    stockNames.forEach( (stockSymbolName, index) => {
      this.getStock(stockSymbolName).subscribe( res2 => {
          const stock = res2 as Stock;
          const series = new Array<DateValueItem>();
          stock.prices.forEach(price => series.push(new DateValueItem(price.date, price.price)));
          this.getStockInfo(stock.symbol).subscribe( res3 => {
              const stockFullName = res3 + ' (' + stock.symbol + ')';

              // NOTE: update stock in DB
              stock.name = stockFullName;
              this.updateStock(stock).subscribe(res => console.log(res));

              const graphItem = new GraphItem(stockFullName, series);
              tempGraphItems.push(graphItem);
              if (index === stockNames.length - 1 ) {
                itemsSubject.next(tempGraphItems);
              }
            }
          );
        }
      );
    });
    return itemsSubject;
  }


  areStocksUpdated(): Observable<boolean> {
    return this.http.get(STOCK_API_URL + '/updated').pipe( map(
      response => !!response
    ));
  }

  getStocksByNameFromDB(stockSymbolNames: string[]): Observable<Stock[]> {
    return this.http.get(STOCK_API_URL + '/by-name', { params: {stockSymbolNames} } ).pipe( map(
      response => this.convertResponseToArray(response, Stock.prototype)
    ));
  }


  getStock(stockSymbolName): Observable<Stock> {
    return this.http.get(EXTERNAL_STOCK_API_URL + stockSymbolName + '/prices',
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
    return this.http.get(EXTERNAL_STOCK_API_URL + stockSymbolName,
      { params: {token: API_KEY} }).pipe( map(
      response => {
          return response[`name`];
        }
      )
    );
  }

  updateStock(stock: Stock): Observable<Stock> {
    return this.http.put(STOCK_API_URL, stock).pipe( map(
      response => this.convertResponseToObject(response, Stock.prototype)
    ));
  }

}
