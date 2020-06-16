import {NamedObject} from './named-object.model';
import {DateValueItem} from './date-value-item.model';

export class GraphItem extends NamedObject {

  series: Array<DateValueItem>;

  constructor(name: string, series: Array<DateValueItem>) {
    super(name);
    this.series = series;
  }

}
