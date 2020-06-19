import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
import {merge, Observable, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';
import {StockService} from '../../services/stock.service';
import {FormBuilder, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {Investment} from '../../model/investment.model';
import {initStockNames} from '../../init-data/stock-data';
import {GraphItem} from '../../model/graph-item.model';
import {InvestService} from '../../services/invest.service';
import {TokenStorageService} from '../../services/token-storage.service';
import {User} from '../../model/user.model';

@Component({
  selector: 'app-buy-stock',
  templateUrl: './buy-stock.component.html',
  styleUrls: ['./buy-stock.component.css']
})
export class BuyStockComponent implements OnInit {

  constructor(private stockService: StockService, private investService: InvestService,
              private storageService: TokenStorageService, private formBuilder: FormBuilder,
              private toastr: ToastrService) {}
  @Output()
  newInvestment = new EventEmitter<Investment>();

  isFormCollapsed = true;
  allGraphData = new Array<GraphItem>();
  sharePrice = 0;
  form = this.formBuilder.group({
    stock: ['', Validators.required],
    amount: ['', Validators.required]
  });

  model = new Investment(null, null, 0, 0, null);

  stockFullNames = initStockNames;

  @ViewChild('instance', {static: true}) instance: NgbTypeahead;
  focusSubject = new Subject<string>();
  clickSubject = new Subject<string>();

  ngOnInit(): void {
    this.stockService.areStocksUpdated().subscribe(
      res => {
        if (res) {
          const itemsSubject = this.stockService.loadStocksFromDB(initStockNames);
          itemsSubject.subscribe({
            next: items => {
              this.allGraphData = items;
              this.stockFullNames = items.map(item => item.name);
             }
          });
        } else {
          const itemsSubject = this.stockService.loadStocksFromExtAndUpdate(initStockNames);
          itemsSubject.subscribe({
            next: items => {
              this.allGraphData = items;
              this.stockFullNames = items.map(item => item.name);
            }
          });
        }
      }
    );
  }

  search = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clickedOnClosedPopup$ = this.clickSubject.pipe(filter(() => !this.instance.isPopupOpen()));
    const inputFocus$ = this.focusSubject;

    return merge(debouncedText$, inputFocus$, clickedOnClosedPopup$).pipe(
      map(term => (term === '' ? this.stockFullNames
        : this.stockFullNames.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
  }

  openForm() {
    this.isFormCollapsed = false;
  }

  onSubmit(form: any) {
    const stockSymbol = form.value.stockSymbol;
    if (!initStockNames.includes(stockSymbol)) {
      this.toastr.error('Wrong stock name, please choose from the options in dropdown', 'Error');
      return;
    }
    const name = form.value.name;
    if (!this.stockFullNames.includes(name)) {
      this.toastr.error('Wrong stock name, please choose from the options in dropdown', 'Error');
      return;
    }
    const moneyNum = form.value.moneyNum;
    if (moneyNum <= 0) {
      this.toastr.error('Investment must be a positive number', 'Error');
      return;
    }

    const {username, email} = this.storageService.getUser();
    const investment =  new Investment(name, stockSymbol, form.value.sharesNum, moneyNum, new User(username, email));
    this.investService.makeInvestment(investment).subscribe(
      res => {
        this.newInvestment.emit(res);
        this.toastr.success('Invested ' + moneyNum + ' $ to ' + name, 'Well done');
      }, err => {
        console.log(err);
        this.toastr.error(err.message, 'Error');
      }, () => {
        this.cancel(form);
      }
    );
  }

  cancel(form: any) {
    this.isFormCollapsed = true;
    this.resetModel(this.model);
    form.reset();
  }

  private resetModel(model: Investment) {
    model = new Investment(null, null, 0, 0, null);
  }

  stockModelChanged(stockName: string) {
    const chosenStock = this.allGraphData.find(data => data.name.startsWith(stockName));
    if (chosenStock && stockName !== '') {
      this.model.stockSymbol = this.getStockSymbol(stockName);
      this.sharePrice = chosenStock.series[chosenStock.series.length - 1].value;
      this.calculateSharesNum();
    } else {
      this.sharePrice = 0;
    }
  }

  invModelChanged(investment: number) {
    this.calculateSharesNum();
  }

  private calculateSharesNum() {
    if (this.sharePrice === 0) {
      this.model.sharesNum = 0;
    } else {
      this.model.sharesNum = this.model.moneyNum / this.sharePrice;
    }
  }

  private getStockSymbol(stockFullName: string): string {
    const indexStart = stockFullName.indexOf('(');
    const indexEnd = stockFullName.indexOf(')');
    if (indexStart > 0 && indexEnd > indexStart) {
      return stockFullName.substring(indexStart + 1, indexEnd);
    }  else {
      return null;
    }
  }
}
