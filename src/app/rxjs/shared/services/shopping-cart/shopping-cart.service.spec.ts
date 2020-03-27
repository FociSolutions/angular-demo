import { TestBed } from '@angular/core/testing';

import { ShoppingCartService } from './shopping-cart.service';

describe('CalculatorService', () => {
  let service: ShoppingCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShoppingCartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('tax', () => {
    it('should return an observable the returns the current total multiplied by the tax percentage', done => {
      service.add(1);
      service.tax.subscribe(num => {
        expect(num).toBe(1 * service.taxPercentage);
        done();
      });
    });
  });

  describe('totalAfterTax', () => {
    it('should return an observable that returns the current total plus tax', done => {
      service.add(1);
      service.totalAfterTax.subscribe(num => {
        expect(num).toBe(1 * (1 + service.taxPercentage));
        done();
      });
    });
  });

  describe('add', () => {
    it('should add to the current total', done => {
      service.add(1);
      service.total.subscribe(num => {
        expect(num).toBe(1);
        done();
      });
    });

    it('should add 0 to the current total if no number is given', done => {
      service.add();
      service.total.subscribe(num => {
        expect(num).toBe(0);
        done();
      });
    });
  });

  describe('subtract', () => {
    it('should subtract from the current total', done => {
      service.add(5);
      service.subtract(2);
      service.total.subscribe(num => {
        expect(num).toBe(3);
        done();
      });
    });

    it('should subtract 0 to the current total if no number is given', done => {
      service.subtract();
      service.total.subscribe(num => {
        expect(num).toBe(0);
        done();
      });
    });
  });
});
