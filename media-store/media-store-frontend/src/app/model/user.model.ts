import {NamedObject} from './named-object.model';

export class User extends NamedObject {

  email: string;
  balance: number;

  constructor(name: string, email: string) {
    super(name);
    this.email = email;
  }
}
