
export class BaseService {

  public static createObjectFromJSON(json: any, objectPrototype): any{
    const object = Object.create(objectPrototype);
    Object.assign(object, json);
    return object;
  }

  public convertResponseToArray(response: any, objectPrototype): any[] {
    if (response) {
      const newObjects: any[] = [];
      response.forEach(obj => {
        newObjects.push(BaseService.createObjectFromJSON(obj, objectPrototype));
      });
      return newObjects;
    } else {
      return null;
    }
  }

  public convertResponseToObject(response: any, objectPrototype): any {
    if (response) {
      return BaseService.createObjectFromJSON(response, objectPrototype);
    } else {
      return null;
    }
  }
}
