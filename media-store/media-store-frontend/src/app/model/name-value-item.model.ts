import {NamedObject} from './named-object.model';

export class NameValueItem extends NamedObject {

  constructor(public name: string, public value: any) {
    super(name);
  }
}
