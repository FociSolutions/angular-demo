import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../shared/services/local-storage/local-storage.service';
import { SessionStorageService } from '../shared/services/session-storage/session-storage.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { FormControl, Validators } from '@angular/forms';
import { NGXLogger } from 'ngx-logger';

/**
 * This component takes input from the UI to update/delete/add items to the LocalStorage and SessionStorage
 * using their respective services.
 */
@Component({
  selector: 'app-storage',
  templateUrl: './web-storage.component.html',
  styleUrls: ['./web-storage.component.scss']
})
export class WebStorageComponent implements OnInit {
  // The form control that will be used as the key when adding or editing an item entry in the storages
  addInputKeyField = new FormControl('', Validators.required);
  // The form control that will be used as the value when adding or editing an item entry in the storages
  addInputValueField = new FormControl('');
  // The form control that will be used as the key of the item to delete from the storages
  deleteInputKeyField = new FormControl('', Validators.required);

  constructor(private localStorage: LocalStorageService, private sessionStorage: SessionStorageService, private logger: NGXLogger) {}

  ngOnInit(): void {}

  /**
   *  Returns an observable that results in an object. We are doing this so it can be processed by the Angular JSON pipe
   * to be formatted for display
   * @returns An observable that results in a json object representing the current state of local storage
   */
  get localStorageState(): Observable<any> {
    return this.localStorage.getAll().pipe(
      map(pairs => {
        const obj = {};
        /**
         * For each key value pair I am assigning a property with the property name equal to the key string to
         * a value that is equal to the value string.
         * For example, a key value pair list of [{'x':'y'}] becomes {'x':'y'}
         */
        for (const pair of pairs) {
          obj[pair.key] = pair.value;
        }
        return obj;
      }),
      catchError(err => {
        this.logger.warn('WebStorageModule.WebStorageComponent.localStorageState: Unexpected error occurred ', err);
        // return an empty object on error
        return of({});
      })
    );
  }

  /**
   * Returns an observable that results in an object. We are doing this so it can be processed by the Angular JSON pipe
   * to be formatted for display
   * @returns An observable that results in an object representing the current state of session storage
   */
  get sessionStorageState(): Observable<any> {
    return this.sessionStorage.getAll().pipe(
      map(pairs => {
        const obj = {};
        /**
         * For each key value pair I am assigning a property with the property name equal to the key string to
         * a value that is equal to the value string.
         * For example, a key value pair list of [{'x':'y'}] becomes {'x':'y'}
         */
        for (const pair of pairs) {
          obj[pair.key] = pair.value;
        }
        return obj;
      }),
      catchError(err => {
        this.logger.warn('WebStorageModule.WebStorageComponent.sessionStorageState: Unexpected error occurred ', err);
        // return an empty object on error
        return of({});
      })
    );
  }

  /**
   * If the addInputKeyField and addInputValueField controls are valid this function attempts
   * to add/update the item in the local storage whose key matches the provided key. It does this
   * by calling updateItem function in LocalStorageService
   */
  updateLocalStorage() {
    try {
      if (this.addInputKeyField.valid && this.addInputValueField.valid) {
        this.localStorage.updateItem(this.addInputKeyField.value, this.addInputValueField.value);
      }
    } catch (error) {
      this.logger.warn('WebStorageModule.WebStorageComponent.updateLocalStorage: Error has occurred ', error);
      alert('Error occurred');
    }
  }

  /**
   * If the addInputKeyField and addInputValueField controls are valid this function attempts
   * to add/update the item in the session storage whose key matches the provided key. It does this
   * by calling updateItem function in SessionStorageService
   */
  updateSessionStorage() {
    try {
      if (this.addInputKeyField.valid && this.addInputValueField.valid) {
        this.sessionStorage.updateItem(this.addInputKeyField.value, this.addInputValueField.value);
      }
    } catch (error) {
      this.logger.warn('WebStorageModule.WebStorageComponent.updateSessionStorage: Error has occurred ', error);
      alert('Error occurred');
    }
  }

  /**
   * Clears the local storage using the clear function in LocalStorageService
   */
  /* istanbul ignore next */
  clearLocalStorage() {
    this.localStorage.clear();
  }

  /**
   * Clears the session storage using the clear function in SessionStorageService
   */
  /* istanbul ignore next */
  clearSessionStorage() {
    this.sessionStorage.clear();
  }

  /**
   * Deletes an item from the local storage whose key matches the value in the deleteInputKeyField
   * form control. If no such key exists in local storage this should do nothing. This function calls
   * the deleteItem function in LocalStorageService
   */
  /* istanbul ignore next */
  deleteItemFromLocalStorage() {
    this.localStorage.deleteItem(this.deleteInputKeyField.value);
  }

  /**
   * Deletes an item from the session storage whose key matches the value in the deleteInputKeyField
   * form control. If no such key exists in session storage this should do nothing. This function calls
   * the deleteItem function in SessionStorageService
   */
  /* istanbul ignore next */
  deleteItemFromSessionStorage() {
    this.sessionStorage.deleteItem(this.deleteInputKeyField.value);
  }
}
