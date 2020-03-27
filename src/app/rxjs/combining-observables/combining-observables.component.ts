import { Component, OnInit } from '@angular/core';
import { from, of, concat, merge, zip, Observable } from 'rxjs';
import { delay, toArray, concatMap } from 'rxjs/operators';

@Component({
  selector: 'app-combining-observables',
  templateUrl: './combining-observables.component.html',
  styleUrls: ['./combining-observables.component.scss']
})
/**
 * There are more methods of combination than displayed here. These are just some of the more used methods.
 */
export class CombiningObservablesComponent implements OnInit {
  /**
   * You can create observables from an array, promise or iterable using the 'from' operator
   */
  observableOne = from([0, 1, 2, 3, 4, 5]);
  observableTwo = from(['dog', 'cat', 'hamster']);
  /**
   * You can create observables from a sequence of values using the 'of' operator.
   * In this example we create an observable that emits true then false.
   */
  observableThree = of(true, false);

  concatResults = [];
  mergeResults = [];
  zipResults = [];
  constructor() {}

  ngOnInit(): void {}

  /**
   * This method changes the output of observable one to output all values as a single
   * array instead of a stream of values. It does this by applying the pipe function and
   * the toArray operator
   */
  /* istanbul ignore next */
  get observableOneAsArray(): Observable<number[]> {
    return this.observableOne.pipe(toArray());
  }

  /**
   * This method changes the output of observable two to output all values as a single
   * array instead of a stream of values. It does this by applying the pipe function and
   * the toArray operator
   */
  /* istanbul ignore next */
  get observableTwoAsArray(): Observable<string[]> {
    return this.observableTwo.pipe(toArray());
  }

  /**
   * This method changes the output of observable three to output all values as a single
   * array instead of a stream of values. It does this by applying the pipe function and
   * the toArray operator
   */
  /* istanbul ignore next */
  get observableThreeAsArray(): Observable<boolean[]> {
    return this.observableThree.pipe(toArray());
  }

  /**
   * Runs the concat demo, and sets a delay on the observables so it is easier for a human
   * to see what is happening.
   */
  /* istanbul ignore next */
  runConcat() {
    // refreshes the concat results
    this.concatResults = [];
    // Order is preserved
    concat(
      this.delayObservable(this.observableOne),
      this.delayObservable(this.observableTwo, 600),
      this.delayObservable(this.observableThree, 1000)
    ).subscribe(data => this.concatResults.push(data));
  }

  /**
   * Runs the merge demo, and sets a delay on the observables so it is easier for a human
   * to see what is happening.
   */
  /* istanbul ignore next */
  runMerge() {
    // refreshes the merge results
    this.mergeResults = [];
    // Order is not preserved
    merge(
      this.delayObservable(this.observableOne),
      this.delayObservable(this.observableTwo, 600),
      this.delayObservable(this.observableThree, 1000)
    ).subscribe(data => this.mergeResults.push(data));
  }

  /**
   * Runs the zip demo, and sets a delay on the observables so it is easier for a human
   * to see what is happening.
   */
  /* istanbul ignore next */
  runZip() {
    // refreshes the zip results
    this.zipResults = [];
    // Waits for all observables to emit before emitting a value. Completes when one of the observables finish.
    zip(
      this.delayObservable(this.observableOne),
      this.delayObservable(this.observableTwo, 600),
      this.delayObservable(this.observableThree, 1000)
    ).subscribe(data => this.zipResults.push(data));
  }

  /**
   * This delays each output of the observable.
   *  Did this in hope that it would show the differences between the displayed methods of combination
   * @param observable The observable to add a delay to emission
   * @param d the delay in milliseconds set to 500 by default
   */
  /* istanbul ignore next */
  private delayObservable(observable: Observable<unknown>, d: number = 500): Observable<unknown> {
    return observable.pipe(concatMap(item => of(item).pipe(delay(d))));
  }
}
