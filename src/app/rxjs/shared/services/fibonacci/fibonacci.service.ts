import { Injectable } from '@angular/core';
import { ReplaySubject, Observable, EMPTY, of } from 'rxjs';
import { skip, take, filter, toArray, catchError } from 'rxjs/operators';
import { NGXLogger } from 'ngx-logger';

/**
 * This service is responsible for generating the fibonacci sequence. Contains the Replay Subject that stores the entire sequence,
 * and functions that generate new numbers, pushes them onto the sequence and retrieves old numbers that were previously generated.
 * A replay subject was chosen so we could reference numbers previously generated when attempting to fetch the nth fibonacci number by using
 * the order in which they were emitted from the replay subject.
 */
@Injectable({
  providedIn: 'root'
})
export class FibonacciService {
  /**
   * Will act as a record of all the fibonacci numbers generated. The subject is private and readonly to avoid
   * giving unwanted components access to the ability to modify or push new values to the subject. If a component
   * needs to listen to a subject it is best to convert it to an observable first. See the getter function sequence() for reference
   */
  private readonly _sequence: ReplaySubject<number> = new ReplaySubject();
  // Will keep track of the size of our generated sequence. This will tell us if we've generated the nth number yet
  private size = 1;

  // The latest value stored in the sequence replay subject
  private currentValue = 0;
  // The next value to push onto the sequence replay subject
  private nextValue = 1;

  constructor(private logger: NGXLogger) {
    this._sequence.next(0);
  }

  /**
   * Returns an observable that outputs the next number generated in the sequence.
   */
  /* istanbul ignore next */
  get sequence(): Observable<number> {
    // Use a subjects asObservable() method when you want to expose its output to other components
    return this._sequence.asObservable();
  }

  /**
   * Returns the number of fibonacci numbers of the sequence generated
   */
  get sequenceSize(): number {
    return this.size;
  }

  /**
   * Sends the next fibonacci number into the sequence
   */
  next(): void {
    this.size++;
    const temp = this.nextValue;
    this.nextValue += this.currentValue;
    this.currentValue = temp;
    this._sequence.next(this.currentValue);
  }

  /**
   * Calculates the next X number of fibonacci numbers
   * @param x The number of times to call next
   */
  /* istanbul ignore next */
  nextX(x: number): void {
    for (let i = 0; i < x; i++) {
      this.next();
    }
  }

  /**
   * If n is greater than -1 it returns an observable that results in that value
   * Otherwise it returns the EMPTY observable
   * @param n The nth number to retrieve
   */
  getNth(n: number): Observable<number> {
    if (n < 0) {
      return EMPTY;
    }

    // If it isn't in the sequence yet we generate the next sequence
    if (n >= this.sequenceSize) {
      this.nextX(n - this.sequenceSize + 1);
    }

    // Skips the first n numbers in the replay and takes only the nth number
    return this.sequence.pipe(skip(n), take(1));
  }

  /**
   * Returns an observable that results in a list of all the even fibonacci numbers that have been generated.
   */
  get even(): Observable<number[]> {
    return this.sequence.pipe(
      // We have to take the size of the replay pipe because the observable doesn't complete until the subject closes.
      // The take operator ensures that the observable will complete itself after the number of items have been taken.
      take(this.sequenceSize),
      filter(n => n % 2 === 0),
      toArray(),
      // Catching any errors here ensure that we are able to handle errors gracefully. Normally you could do this on the
      // subscribe, however we intend to pass this to angular's Async Pipe and don't want the template to fail rendering
      // because of an error.
      catchError(err => {
        this.logger.warn('Unexpected error ocurred attempting to get even fibonacci numbers: ', err);
        return of([]);
      })
    );
  }

  /**
   * Returns an observable that results in a list of all the odd fibonacci numbers that have been generated.
   */
  get odd(): Observable<number[]> {
    return this.sequence.pipe(
      // We have to take the size of the replay pipe because the observable doesn't complete until the subject closes.
      // The take operator ensures that the observable will complete itself after the number of items have been taken.
      take(this.sequenceSize),
      filter(n => n % 2 > 0),
      toArray(),
      // Catching any errors here ensure that we are able to handle errors gracefully. Normally you could do this on the
      // subscribe, however we intend to pass this to angular's Async Pipe and don't want the template to fail rendering
      // because of an error.
      catchError(err => {
        this.logger.warn('Unexpected error ocurred attempting to get odd fibonacci numbers: ', err);
        return of([]);
      })
    );
  }
}
