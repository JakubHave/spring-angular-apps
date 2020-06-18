import {Component, OnInit, ViewChild} from '@angular/core';
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

@Component({
  selector: 'app-buy-stock',
  templateUrl: './buy-stock.component.html',
  styleUrls: ['./buy-stock.component.css']
})
export class BuyStockComponent implements OnInit {

  constructor(private stockService: StockService, private investService: InvestService,
              private formBuilder: FormBuilder, private toastr: ToastrService) {}

  isFormCollapsed = true;
  allGraphData = new Array<GraphItem>();
  sharePrice = 0;
  form = this.formBuilder.group({
    stock: ['', Validators.required],
    amount: ['', Validators.required]
  });

  model = new Investment(null, null, 0, 0);

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
    if (!initStockNames.includes(form.value.stockSymbol)) {
      this.toastr.error('Wrong stock name, please choose from the options in dropdown', 'Error');
      return;
    }
    if (!this.stockFullNames.includes(form.value.name)) {
      this.toastr.error('Wrong stock name, please choose from the options in dropdown', 'Error');
      return;
    }
    if (form.value.moneyNum <= 0) {
      this.toastr.error('Investment must be a positive number', 'Error');
      return;
    }

    this.investService.makeInvestment(form.value).subscribe(
      res => {
        this.toastr.success('Invested ' + form.value.moneyNum + ' $ to ' + form.value.name +
          ' . Good choice', 'Success');
      }, err => {
        console.log(err);
        this.toastr.error(err.message, 'Error');
      }
    );
  }

  cancel(form: any) {
    this.isFormCollapsed = true;
    this.resetModel(this.model);
    form.reset();
  }

  private resetModel(model: Investment) {
    model = new Investment(null, null, 0, 0);
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
