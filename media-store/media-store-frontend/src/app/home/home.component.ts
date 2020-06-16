import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {initStockNames} from '../init-data/stock-data';
import {StockService} from '../services/stock.service';
import {GraphItem} from '../model/graph-item.model';
import {Stock} from '../model/stock.model';
import {DateValueItem} from '../model/date-value-item.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private userService: UserService, private stockService: StockService) {
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
    this.userService.getPublicContent().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );

    // this.initAllGraphData(this.initStockNames);
  }

  initAllGraphData(stockNames: string[]) {
    const tempGraphItems = new Array<GraphItem>();
    stockNames.forEach( (stockSymbolName, index) => {
      this.stockService.getStock(stockSymbolName).subscribe( res => {
          const stock = res as Stock;
          const series = new Array<DateValueItem>();
          stock.prices.forEach(price => series.push(new DateValueItem(price.date, price.price)));
          this.stockService.getStockInfo(stock.symbol).subscribe( resp => {
              const stockFullName = resp + ' (' + stock.symbol + ') ';
              const graphItem = new GraphItem(stockFullName, series);
              tempGraphItems.push(graphItem);
              if (index === stockNames.length - 1 ) {
                this.allGraphData = tempGraphItems;
                this.showStockGraph = true;
              }
            }
          );
        }, error => {
          this.graphMessage = 'Sorry, too many requests on Stock Prices Server';
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
