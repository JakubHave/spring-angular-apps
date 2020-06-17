import {HistoricPrice} from './hystoric-price.model';
import {NamedObject} from './named-object.model';

export class Stock extends NamedObject {
  constructor(symbol: string, prices: Array<HistoricPrice>) {
    super();
    this.symbol = symbol;
    this.prices = prices;
  }

  symbol: string;
  name: string;
  prices: Array<HistoricPrice>;
}
