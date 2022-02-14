import { throwError } from "./throwError";

type Observer = (data: any) => void;

export class Observable {
  observes: Observer[] = [];

  addObserver(observer: Observer) {
    if (Object.prototype.toString.call(observer) !== "[object Function]") {
      throwError("observer is not a function");
    }

    this.removeObserver(observer);
    this.observes.push(observer);
  }

  removeObserver(observer: Observer) {
    this.observes = this.observes.filter((item) => item !== observer);
  }

  notifyObservers(thisArg: any, data: any) {
    const observes = [...this.observes];

    observes.forEach((observer) => observer.call(thisArg, data));
  }
}
