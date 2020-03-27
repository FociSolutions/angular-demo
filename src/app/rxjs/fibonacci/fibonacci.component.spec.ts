import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoggerTestingModule } from 'ngx-logger/testing';
import { FibonacciComponent } from './fibonacci.component';
import { SequenceListComponent } from '../sequence-list/sequence-list.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Substitute, SubstituteOf, Arg } from '@fluffy-spoon/substitute';
import { FibonacciService } from '../shared/services/fibonacci/fibonacci.service';
import * as faker from 'faker';
import { of } from 'rxjs';

describe('FibonacciComponent', () => {
  let component: FibonacciComponent;
  let fixture: ComponentFixture<FibonacciComponent>;
  let fibonacciService: SubstituteOf<FibonacciService>;

  beforeEach(async(() => {
    fibonacciService = Substitute.for<FibonacciService>();
    TestBed.configureTestingModule({
      declarations: [FibonacciComponent, SequenceListComponent],
      imports: [MatButtonModule, MatIconModule, LoggerTestingModule],
      providers: [{ provide: FibonacciService, useFactory: () => fibonacciService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FibonacciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('nextX', () => {
    it('should attempt to get the next fibonacci number', () => {
      fibonacciService.getNth(Arg.any()).returns(of(0));
      component.nextX(1);
      expect(fibonacciService.received().getNth(1)).toBeTruthy();
    });
  });

  describe('previousX', () => {
    it('should attempt to get the Nth fibonacci number through the service', () => {
      fibonacciService.getNth(Arg.any()).returns(of(0));
      component.previousX(1);
      expect(fibonacciService.received().getNth(0)).toBeTruthy();
    });
  });
});
