
export class HistoricPrice {

  stockSymbol?: string;
  date: Date;
  // tslint:disable-next-line:variable-name
  price: number;

  constructor(date: Date, price: number) {
    this.date = date;
    if (price < 0) {
      throw new Error('Price can not be negative number: ' + price);
    }
    this.price = price;
  }
}
