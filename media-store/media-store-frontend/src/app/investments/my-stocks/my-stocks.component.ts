import {Component, OnInit} from '@angular/core';
import {InvestService} from '../../services/invest.service';
import {TokenStorageService} from '../../services/token-storage.service';
import {Investment} from '../../model/investment.model';
import {StockService} from '../../services/stock.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-my-stocks',
  templateUrl: './my-stocks.component.html',
  styleUrls: ['./my-stocks.component.css']
})
export class MyStocksComponent implements OnInit {
  investments: Investment[];

  constructor(private investService: InvestService, private storageService: TokenStorageService,
              private stockService: StockService, private toastr: ToastrService) { }

  ngOnInit(): void {
    const {username} = this.storageService.getUser();
    this.investService.getAllInvestmentsByUser(username).subscribe(
      investments => {
        this.stockService.getStocksByNameFromDB(investments.map(invest => invest.stockSymbol)).subscribe(
          stocks => {
            investments.forEach(invest => {
              const stockPrices = stocks.find(stock => stock.symbol === invest.stockSymbol)
                .prices.map(histPrice => histPrice.price);
              invest.stockPrice = stockPrices[stockPrices.length - 1];
            });
            this.investments = investments;
          }
        );
      }
    );
  }

  sell(investment: Investment) {
    this.investService.removeInvestment(investment).subscribe(
      res => {
        this.investments = this.investments.filter(item => item.id !== investment.id);
        this.toastr.success('Sold ' + investment.sharesNum.toFixed(2) + ' shares of ' +
          investment.name + ' stock for ' + investment.actualInvestValue.toFixed(2) + ' $', 'Sold!');
      }, err => {
        this.toastr.error(err.message, 'Error');
      }
    );
  }

  onNewInvestment(investment: Investment) {
    this.stockService.getStocksByNameFromDB([investment.stockSymbol]).subscribe(
      stocks => {
        const stockPrices = stocks[0].prices.map(histPrice => histPrice.price);
        investment.stockPrice = stockPrices[stockPrices.length - 1];
        this.investments.push(investment);
      }
    );
  }

  calculateActualInvestment(investment: Investment) {
    investment.actualInvestValue = investment.sharesNum * investment.stockPrice;
    return (investment.actualInvestValue).toFixed(2);
  }

  calculatePercentProfit(investment: Investment) {
    if (!investment.actualInvestValue) { return; }
    return (investment.actualInvestValue / investment.moneyNum - 1) * 100;
  }

  getPercentProfitString(investment: Investment) {
    const percent = this.calculatePercentProfit(investment);
    let prefix = '';
    if (percent >= 0) { prefix = '+'; }
    return prefix + percent.toFixed(3) + '%';
  }
}
