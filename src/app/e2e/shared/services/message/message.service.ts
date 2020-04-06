import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

/**
 * This service provides an observable that will emit string values pushed to the messageSubject
 * and a sendMessage function that takes a string as a parameter and pushes it onto the subject using
 * its next() function.
 */
@Injectable({
  providedIn: 'root',
})
export class MessageService {
  /**
   * The string subject that will emit new messages as they are pushed onto it.
   */
  readonly messageSubject = new Subject<string>();
  constructor() {}

  /**
   * Returns an observable that emits string values from the messageSubject
   * @returns An observable that emits string values from the messageSubject
   */
  get messageStream(): Observable<string> {
    return this.messageSubject.asObservable();
  }

  /**
   * Takes a string value as a parameter and pushes it onto the messageSubject using its next() function
   * @param message The message string to push onto the subject
   */
  sendMessage(message: string) {
    this.messageSubject.next(message);
  }
}
