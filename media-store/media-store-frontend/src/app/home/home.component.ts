import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {multi} from '../profile/data';
import {StockService} from '../services/stock.service';
import {GraphItem} from '../model/graph-item.model';
import {Stock} from '../model/stock.model';
import {NameValueItem} from '../model/name-value-item.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private userService: UserService, private stockService: StockService) {
    Object.assign(this, { multi });
  }
  content: string;

  multi: any[];
  //view: any[] = [undefined, 500];

  // options
  legend = true;
  showLabels = true;
  animations = true;
  xAxis = true;
  yAxis = true;
  showYAxisLabel = true;
  showXAxisLabel = true;
  xAxisLabel = 'Date';
  yAxisLabel = 'Price';
  timeline = true;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  ngOnInit() {
    this.userService.getPublicContent().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );

    this.stockService.getStock().subscribe( res => {
        const stock = res as Stock;
        const series = new Array<NameValueItem>();
        stock.prices.forEach(price => series.push(new NameValueItem(price.date, price.price)));
        const graphItem = new GraphItem(stock.symbol, series);
        console.log(graphItem);
        this.multi = [];
        this.multi.push(graphItem);
      }
    );

  }

  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
