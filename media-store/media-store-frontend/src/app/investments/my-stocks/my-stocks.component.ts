import {Component, OnInit} from '@angular/core';
import {InvestService} from '../../services/invest.service';
import {TokenStorageService} from '../../services/token-storage.service';
import {Investment} from '../../model/investment.model';
import {StockService} from '../../services/stock.service';
import {ToastrService} from 'ngx-toastr';
import {UserService} from '../../services/user.service';
import {User} from '../../model/user.model';

@Component({
  selector: 'app-my-stocks',
  templateUrl: './my-stocks.component.html',
  styleUrls: ['./my-stocks.component.css']
})
export class MyStocksComponent implements OnInit {
  investments = new Array<Investment>();
  balance: number;

  constructor(private investService: InvestService, private storageService: TokenStorageService,
              private stockService: StockService, private userService: UserService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    const {username} = this.storageService.getUser();
    this.updateBalance();
    this.investService.getAllInvestmentsByUser(username).subscribe(
      investments => {
        if (investments?.length === 0) {
          return;
        }
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
        const { username, email } = this.storageService.getUser();
        const user = new User(username, email);
        user.balance = this.balance + investment.sharesNum * investment.stockPrice;
        this.userService.updateBalanceForUser(user).subscribe(
          res2 => this.balance = res2.balance
        );
        this.investments = this.investments.filter(item => item.id !== investment.id);
        this.toastr.success('Sold ' + investment.sharesNum.toFixed(2) + ' shares of ' +
          investment.name + ' stock for ' + investment.actualInvestValue.toFixed(2) + ' $', 'Sold!');
      }, err => {
        this.toastr.error(err.message, 'Error');
      }
    );
  }

  onNewInvestment(investment: Investment) {
    this.updateBalance();
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

  private updateBalance() {
    const {username} = this.storageService.getUser();
    this.userService.getUser(username).subscribe(
      res => {
        this.balance = res.balance;
      }
    );
  }
}
