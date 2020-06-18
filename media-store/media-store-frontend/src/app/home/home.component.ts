import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {initStockNames} from '../init-data/stock-data';
import {StockService} from '../services/stock.service';

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
    this.initAllGraphData(this.initStockNames);
  }

  initAllGraphData(stockNames: string[]) {
    this.stockService.areStocksUpdated().subscribe(
      res => {
        if (res) {
          const itemsSubject = this.stockService.loadStocksFromDB(stockNames);
          itemsSubject.subscribe({
            next: items => {
              this.allGraphData = items;
              this.showStockGraph = true; }
          });
        } else {
          const itemsSubject = this.stockService.loadStocksFromExtAndUpdate(stockNames);
          itemsSubject.subscribe({
            next: items => {
              this.allGraphData = items;
              this.showStockGraph = true; }
          });
        }
      }
    );
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
