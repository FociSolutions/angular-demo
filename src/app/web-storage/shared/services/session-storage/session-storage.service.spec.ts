import { TestBed } from '@angular/core/testing';
import * as faker from 'faker';
import { SessionStorageService } from './session-storage.service';

describe('SessionStorageService', () => {
  let service: SessionStorageService;

  beforeEach(() => {
    sessionStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAll', () => {
    it('should return an observable that results in an empty list if nothing is stored in local storage', done => {
      service.getAll().subscribe(data => {
        expect(data.length).toBe(0);
        done();
      });
    });

    it('should return an observable that results in a list of KeyValuePairs if storage is not empty', done => {
      const key1 = faker.random.word();
      const key2 = faker.random.word();
      const value1 = faker.random.word();
      const value2 = faker.random.word();
      sessionStorage.setItem(key1, value1);
      sessionStorage.setItem(key2, value2);

      service.getAll().subscribe(data => {
        for (const kvp of data) {
          if (kvp.key === key1) {
            expect(kvp.value).toEqual(value1);
          } else {
            expect(kvp.value).toEqual(value2);
          }
        }
        done();
      });
    });
  });
});
