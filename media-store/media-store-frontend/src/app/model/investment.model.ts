import {NamedObject} from './named-object.model';

export class Investment extends NamedObject {

  stockSymbol: string;
  sharesNum: number;
  moneyNum: number;

  constructor(name: string, stockSymbol: string, sharesNum: number, moneyNum: number) {
    super(name);
    this.stockSymbol = stockSymbol;
    this.sharesNum = sharesNum;
    this.moneyNum = moneyNum;
  }
}
