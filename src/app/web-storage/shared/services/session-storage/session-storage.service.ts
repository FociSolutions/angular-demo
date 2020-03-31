import { Injectable } from '@angular/core';
import { Observable, range, of } from 'rxjs';
import KeyValuePair from '../../models/key-value-pair.model';
import { map, toArray } from 'rxjs/operators';

/**
 * This service is responsible for performing get,update, and delete
 * actions on the session storage. It contains methods for getting all entries in
 * the session storage, getting a single entry, adding/updating an entry, deleting an entry
 * and clearing the session storage.
 */
@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {
  constructor() {}

  /**
   * @returns an Observable that results in a list of all the items in session storage as KeyValuePair models.
   */
  getAll(): Observable<KeyValuePair[]> {
    return range(sessionStorage.length).pipe(
      map(i => {
        const key = sessionStorage.key(i);
        return {
          key,
          value: sessionStorage.getItem(key)
        };
      }),
      toArray()
    );
  }

  /**
   * Stores an item within the session storage using the provided key and value strings.
   * If the storage is full then it will throw an exception.
   * @param key The key to store the item under
   * @param value The string representation of the item being stored
   * @throws An exception if the storage is full
   */
  /* istanbul ignore next */
  updateItem(key: string, value: string): void {
    // setItem will throw an exception if the storage is full.
    sessionStorage.setItem(key, value);
  }

  /**
   * If the provided key exists within sessionStorage this method will delete the item.
   * Otherwise it does nothing.
   * @param key The key of the item to delete from sessionStorage
   */
  /* istanbul ignore next */
  deleteItem(key: string): void {
    // removeItem does nothing if the key doesn't exist in session storage
    sessionStorage.removeItem(key);
  }

  /**
   * Clears the session storage
   */
  /* istanbul ignore next */
  clear(): void {
    sessionStorage.clear();
  }
}
