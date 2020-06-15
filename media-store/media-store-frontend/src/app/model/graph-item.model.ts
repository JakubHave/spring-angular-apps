import {NamedObject} from './named-object.model';
import {NameValueItem} from './name-value-item.model';

export class GraphItem extends NamedObject {

  series: Array<NameValueItem>;

  constructor(name: string, series: Array<NameValueItem>) {
    super(name);
    this.series = series;
  }

}
