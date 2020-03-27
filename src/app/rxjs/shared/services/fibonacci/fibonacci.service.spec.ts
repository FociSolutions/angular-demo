import { TestBed } from '@angular/core/testing';

import { FibonacciService } from './fibonacci.service';
import { skip } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { LoggerTestingModule } from 'ngx-logger/testing';

describe('FibonacciService', () => {
  let service: FibonacciService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LoggerTestingModule]
    });
    service = TestBed.inject(FibonacciService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('sequenceSize', () => {
    it('should return a number representing the sequence size', () => {
      expect(service.sequenceSize).toBe(1);
      service.next();
      expect(service.sequenceSize).toBe(2);
    });
  });

  describe('next', () => {
    it('should emit the next number in the fibonacci sequence onto the subject', done => {
      service.next();
      service.sequence.pipe(skip(service.sequenceSize - 1)).subscribe(num => {
        expect(num).toBe(1);
        done();
      });
    });
  });

  describe('getNth', () => {
    it('should return EMPTY if n is less than 0', () => {
      expect(service.getNth(-1)).toEqual(EMPTY);
    });

    it('should  return an observable that results in the nth if n is larger than the current sequence size', done => {
      service.getNth(67).subscribe(num => {
        expect(num).toBe(44945570212853);
        done();
      });
    });

    it('should return an observable that results in the nth fibonacci number', done => {
      service.nextX(3);
      service.getNth(1).subscribe(num => {
        expect(num).toBe(1);
        done();
      });
    });
  });

  describe('odd', () => {
    it('should return an observable that results in an array of generated fibonacci numbers that are odd', done => {
      service.nextX(5);
      service.odd.subscribe(nums => {
        for (const num of nums) {
          expect(num % 2).toBe(1);
        }
        done();
      });
    });
  });

  describe('even', () => {
    it('should return an observable that results in an array of generated fibonacci numbers that are even', done => {
      service.nextX(5);
      service.even.subscribe(nums => {
        for (const num of nums) {
          expect(num % 2).toBe(0);
        }
        done();
      });
    });
  });
});
