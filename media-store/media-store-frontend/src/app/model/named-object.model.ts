
export abstract class NamedObject {

  name: string;

  protected constructor(name?: string) {
    this.name = name;
  }
}
