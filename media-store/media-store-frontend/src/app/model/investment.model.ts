import {NamedObject} from './named-object.model';
import {User} from './user.model';

export class Investment extends NamedObject {

  id: number;
  stockSymbol: string;
  sharesNum: number;
  moneyNum: number;
  user: User;
  stockPrice: number;
  actualInvestValue: number

  constructor(name: string, stockSymbol: string, sharesNum: number, moneyNum: number, user: User) {
    super(name);
    this.stockSymbol = stockSymbol;
    this.sharesNum = sharesNum;
    this.moneyNum = moneyNum;
    this.user = user;
  }
}
