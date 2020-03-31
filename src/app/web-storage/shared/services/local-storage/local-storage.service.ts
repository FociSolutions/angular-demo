import { Injectable } from '@angular/core';
import KeyValuePair from '../../models/key-value-pair.model';
import { Observable, range, of } from 'rxjs';
import { map, toArray } from 'rxjs/operators';

/**
 * This service is responsible for performing get,update, and delete
 * actions on the local storage. It contains methods for getting all entries in
 * the local storage, getting a single entry, adding/updating an entry, deleting an entry
 * and clearing the local storage.
 */
@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor() {}

  /**
   * @returns an Observable that results in a list of all the items in local storage as KeyValuePair models.
   */
  getAll(): Observable<KeyValuePair[]> {
    return range(localStorage.length).pipe(
      map(i => {
        const key = localStorage.key(i);
        return {
          key,
          value: localStorage.getItem(key)
        };
      }),
      toArray()
    );
  }

  /**
   * Stores an item within the local storage using the provided key and value strings.
   * If the storage is full then it will throw an exception.
   * @param key The key to store the item under
   * @param value The string representation of the item being stored
   * @throws An exception if the storage is full
   */
  /* istanbul ignore next */
  updateItem(key: string, value: string): void {
    // setItem will throw an exception if the storage is full.
    localStorage.setItem(key, value);
  }

  /**
   * If the provided key exists within localStorage this method will delete the item.
   * Otherwise it does nothing.
   * @param key The key of the item to delete from localStorage
   */
  /* istanbul ignore next */
  deleteItem(key: string): void {
    // removeItem does nothing if the key doesn't exist in local storage
    localStorage.removeItem(key);
  }

  /**
   * Clears the local storage
   */
  /* istanbul ignore next */
  clear(): void {
    localStorage.clear();
  }
}
