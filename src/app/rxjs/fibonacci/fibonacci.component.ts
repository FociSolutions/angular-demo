import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable, EMPTY } from 'rxjs';
import { FibonacciService } from '../shared/services/fibonacci/fibonacci.service';
import { NGXLogger } from 'ngx-logger';

/**
 * The FibonacciComponent holds information on the current number the user is currently viewing. It takes
 * input from the user and makes function calls to the fibonacci service that will change this number, thus modifying
 * the view.
 */
@Component({
  selector: 'app-fibonacci',
  templateUrl: './fibonacci.component.html',
  styleUrls: ['./fibonacci.component.scss']
})
export class FibonacciComponent implements OnInit {
  // The fibonacci number the user is currently viewing
  nFib: number;
  // The index of the fibonacci number the user is currently viewing
  n = 0;

  constructor(private fibonacci: FibonacciService, private logger: NGXLogger) {}

  ngOnInit(): void {
    this.getNth();
  }

  /**
   * Adds x to the n variable and attempts to retrieve that fibonacci number
   */
  nextX(x: number): void {
    this.n += x;
    this.getNth();
  }

  /**
   * Goes back a number of steps from the current number. If we attempt to go past the zero indexed number we stop there.
   * @param x The number of steps to go back from the current number
   */
  previousX(x: number): void {
    this.n = Math.max(this.n - x, 0);
    this.getNth();
  }

  /**
   * Returns an observable that results in a list of all the even fibonacci numbers that have been generated.
   */
  /* istanbul ignore next */
  get even(): Observable<number[] | unknown> {
    return this.fibonacci.even;
  }

  /**
   * Returns an observable that results in a list of all the odd fibonacci numbers that have been generated.
   */
  /* istanbul ignore next */
  get odd(): Observable<number[] | unknown> {
    return this.fibonacci.odd;
  }

  /**
   * Gets the Nth fibonacci number from our sequence. If the nth number has not been generated it does nothing.
   * Function was made to avoid duplicating code in previous and next
   */
  private getNth() {
    this.fibonacci.getNth(this.n).subscribe(
      num => {
        this.nFib = num;
      },
      err => {
        this.logger.warn('RxjsModule.FibonacciComponent.previous: Error has occured: ', err);
      }
    );
  }
}
