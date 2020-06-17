import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {initStockNames} from '../init-data/stock-data';
import {StockService} from '../services/stock.service';
import {GraphItem} from '../model/graph-item.model';
import {Stock} from '../model/stock.model';
import {DateValueItem} from '../model/date-value-item.model';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private userService: UserService, private stockService: StockService,
              private toastr: ToastrService) {
    this.initStockNames = initStockNames;
  }
  content: string;

  initStockNames: string[];
  actualGraphData = [];
  allGraphData = [];

  // options
  legend = true;
  showLabels = true;
  animations = true;
  xAxis = false;
  yAxis = true;
  showYAxisLabel = true;
  showXAxisLabel = true;
  xAxisLabel = 'Date';
  yAxisLabel = 'Price $';
  timeline = false;

  colorScheme = {
    domain: ['#424874', '#1b6ca8', '#6a197d']
  };
  showStockGraph = false;
  graphMessage = 'Loading';

  ngOnInit() {
    this.initAllGraphData(this.initStockNames);
  }

  initAllGraphData(stockNames: string[]) {


    this.stockService.areStocksUpdated().subscribe(
      res => {
        if (res) {
          this.loadStocksFromDB(stockNames);
        } else {
          this.loadStocksFromExtAndUpdate(stockNames);
        }
      }
    );
  }

  private loadStocksFromDB(stockNames: string[]) {
    this.stockService.getStocksByNameFromDB(stockNames).subscribe(
      res => {
        const tempGraphItems = new Array<GraphItem>();
        res.forEach((stock, index) => {
          const series = new Array<DateValueItem>();
          stock.prices.forEach(price => series.push(new DateValueItem(price.date, price.price)));
          const graphItem = new GraphItem(stock.name, series);
          tempGraphItems.push(graphItem);
          if (index === res.length - 1 ) {
            this.allGraphData = tempGraphItems;
            this.showStockGraph = true;
          }
        });
      }
    );
  }

  private loadStocksFromExtAndUpdate(stockNames: string[]) {
    const tempGraphItems = new Array<GraphItem>();
    stockNames.forEach( (stockSymbolName, index) => {
      this.stockService.getStock(stockSymbolName).subscribe( res2 => {
          const stock = res2 as Stock;
          const series = new Array<DateValueItem>();
          stock.prices.forEach(price => series.push(new DateValueItem(price.date, price.price)));
          this.stockService.getStockInfo(stock.symbol).subscribe( res3 => {
              const stockFullName = res3 + ' (' + stock.symbol + ') ';

              // NOTE: update stock in DB
              stock.name = stockFullName;
              this.stockService.updateStock(stock).subscribe(res => console.log(res));

              const graphItem = new GraphItem(stockFullName, series);
              tempGraphItems.push(graphItem);
              if (index === stockNames.length - 1 ) {
                this.allGraphData = tempGraphItems;
                this.showStockGraph = true;
              }
            }
          );
        }, error => {
          this.toastr.error('Sorry, too many requests on Stock Prices Server', 'Error');
          this.graphMessage = 'No data available';
        }
      );
    });
  }

  slideChanged(event: number) {
    let lastStockIndex = 0;
    if (event === 0) {
      lastStockIndex = 3;
    } else if (event === 1) {
      lastStockIndex = 6;
    } else {
      lastStockIndex = 9;
    }

    if (this.allGraphData.length > 0) {
      this.actualGraphData = this.allGraphData.slice(lastStockIndex - 3, lastStockIndex);
    }
  }
}
