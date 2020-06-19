import {Component, Input, OnInit} from '@angular/core';
import {StockService} from '../../services/stock.service';

@Component({
  selector: 'app-stock-graph',
  templateUrl: './stock-graph.component.html',
  styleUrls: ['./stock-graph.component.css']
})
export class StockGraphComponent implements OnInit {

  @Input()
  stockSymbol: string;

  // options
  autoScale = true;
  view: [250, 200];
  legend = false;
  showLabels = true;
  animations = true;
  xAxis = false;
  yAxis = true;
  showYAxisLabel = true;
  showXAxisLabel = true;
  xAxisLabel = 'Date';
  yAxisLabel = 'U.S. Dollars';
  timeline = false;
  colorScheme = {
    domain: ['#424874']
  };
  graphData = [];


  constructor(private stockService: StockService) { }

  ngOnInit(): void {
    this.initGraphData([this.stockSymbol]);
  }

  initGraphData(stockNames: string[]) {
    const itemsSubject = this.stockService.loadStocksFromDB(stockNames);
    itemsSubject.subscribe({
      next: items => this.graphData = items
    });
  }

}
