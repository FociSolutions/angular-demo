import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, zip } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * This service keeps track of a current total cost of items. It provides functions for
 * adding to or subtracting from this cost. It also provides getter functions for retrieving
 * observables that perform calculations for tax and total cost after tax. It uses the Rxjs Behavior
 * Subject to keep track of current cost because the Behavior Subject is able to hold state and
 * any new component that subscribes to this subject will receive an emission of the current state
 * of the subject.
 */
@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private state = new BehaviorSubject<number>(0);
  readonly taxPercentage = 0.13;
  constructor() {}

  /**
   * Returns an observable that results in a number that represents the total before tax
   */
  /* istanbul ignore next */
  get total(): Observable<number> {
    return this.state.asObservable();
  }

  /**
   * Returns an observable that results in a number that represents the total after tax
   */
  get totalAfterTax(): Observable<number> {
    /**
     * Zip takes the observable that emits the current total, the observable that emits the tax on
     * the current total and creates a new Observable that emits an array containing both emission values.
     * For example if one observable emits 1 and the other emits 0.13 then the resulting observable from zip
     * emits an array [1, 0.13]. We then take this array and apply a pipe with a map operation that adds these
     * two values together to produce the total value after tax is applied.
     */
    return zip(this.total, this.tax).pipe(map(results => results[0] + results[1]));
  }

  /**
   * Returns an observable that results in a number that represents the tax on the total
   */
  get tax(): Observable<number> {
    return this.state.asObservable().pipe(map(n => n * this.taxPercentage));
  }

  /**
   * Adds the number x to the current value
   * @param x The number to add to the current value
   */
  add(x: number = 0) {
    this.state.next(this.state.value + x);
  }

  /**
   * Subtracts the number x to the current value
   * @param x The number to subtract to the current value
   */
  subtract(x: number = 0) {
    this.state.next(this.state.value - x);
  }
}
