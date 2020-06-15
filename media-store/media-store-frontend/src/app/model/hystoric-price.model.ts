
export class HistoricPrice {

  stockSymbol?: string;
  date: string;
  // tslint:disable-next-line:variable-name
  private _price: number;

  constructor(date: string, price: number) {
    this.date = date;
    if (price < 0) {
      throw new Error('Price can not be negative number: ' + price);
    }
    this._price = price;
  }

  get price(): number {
    return  this._price;
  }

  set price(newPrice: number) {
    if (newPrice < 0) {
      throw new Error('Price can not be negative number: ' + newPrice);
    }
    this._price = newPrice;
  }
}
