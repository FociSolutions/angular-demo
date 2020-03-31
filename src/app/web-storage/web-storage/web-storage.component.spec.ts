import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as faker from 'faker';
import { WebStorageComponent } from './web-storage.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoggerTestingModule } from 'ngx-logger/testing';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { Substitute, SubstituteOf, Arg } from '@fluffy-spoon/substitute';
import { LocalStorageService } from '../shared/services/local-storage/local-storage.service';
import { SessionStorageService } from '../shared/services/session-storage/session-storage.service';
import { of, throwError } from 'rxjs';

describe('StorageComponent', () => {
  let component: WebStorageComponent;
  let fixture: ComponentFixture<WebStorageComponent>;
  let localStorageService: SubstituteOf<LocalStorageService>;
  let sessionStorageService: SubstituteOf<SessionStorageService>;

  beforeEach(async(() => {
    localStorageService = Substitute.for<LocalStorageService>();
    sessionStorageService = Substitute.for<SessionStorageService>();
    TestBed.configureTestingModule({
      imports: [
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        BrowserAnimationsModule,
        LoggerTestingModule,
        MatIconModule,
        ReactiveFormsModule
      ],
      declarations: [WebStorageComponent],
      providers: [
        {
          provide: LocalStorageService,
          useFactory: () => localStorageService
        },
        {
          provide: SessionStorageService,
          useFactory: () => sessionStorageService
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebStorageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('updateLocalStorage', () => {
    it('should attempt to update the local storage if inputs are valid', () => {
      component.addInputKeyField.setValue(faker.random.word());
      component.updateLocalStorage();
      expect(localStorageService.received().updateItem(component.addInputKeyField.value, component.addInputValueField.value)).toBeTruthy();
    });

    it('should not attempt to update the local storage if inputs are invalid', () => {
      const spy = spyOn(localStorageService, 'updateItem');
      component.addInputKeyField.setValue('');
      component.updateLocalStorage();
      expect(spy).not.toHaveBeenCalled();
    });

    it('should catch errors thrown by the localStorageService and trigger an alert', () => {
      const spy = spyOn(window, 'alert');
      component.addInputKeyField.setValue(faker.random.word());
      localStorageService.updateItem(Arg.any(), Arg.any()).throws(new Error());
      component.updateLocalStorage();
      fixture.detectChanges();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('updateSessionStorage', () => {
    it('should attempt to update the session storage if inputs are valid', () => {
      component.addInputKeyField.setValue(faker.random.word());
      component.updateSessionStorage();
      expect(
        sessionStorageService.received().updateItem(component.addInputKeyField.value, component.addInputValueField.value)
      ).toBeTruthy();
    });

    it('should not attempt to update the session storage if inputs are invalid', () => {
      const spy = spyOn(sessionStorageService, 'updateItem');
      component.addInputKeyField.setValue('');
      component.updateSessionStorage();
      expect(spy).not.toHaveBeenCalled();
    });

    it('should catch errors thrown by the sessionStorageService and trigger an alert', () => {
      const spy = spyOn(window, 'alert');
      component.addInputKeyField.setValue(faker.random.word());
      sessionStorageService.updateItem(Arg.any(), Arg.any()).throws(new Error());
      component.updateSessionStorage();
      fixture.detectChanges();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('localStorageState', () => {
    // tslint:disable-next-line: max-line-length
    it('should return an observable that results in an object whose keys are the keys of items stored in local storage and values are their respective values', done => {
      const key = faker.random.word();
      const value = faker.random.word();
      localStorageService.getAll().returns(of([{ key, value }]));
      component.localStorageState.subscribe(obj => {
        expect(obj[key]).toEqual(value);
        done();
      });
    });

    it('should return an observable that results in an empty object on error', done => {
      localStorageService.getAll().returns(throwError(new Error()));
      component.localStorageState.subscribe(obj => {
        expect(obj).toEqual({});
        done();
      });
    });
  });

  describe('sessionStorageState', () => {
    // tslint:disable-next-line: max-line-length
    it('should return an observable that results in an object whose keys are the keys of items stored in session storage and values are their respective values', done => {
      const key = faker.random.word();
      const value = faker.random.word();
      sessionStorageService.getAll().returns(of([{ key, value }]));
      component.sessionStorageState.subscribe(obj => {
        expect(obj[key]).toEqual(value);
        done();
      });
    });

    it('should return an observable that results in an empty object on error', done => {
      sessionStorageService.getAll().returns(throwError(new Error()));
      component.sessionStorageState.subscribe(obj => {
        expect(obj).toEqual({});
        done();
      });
    });
  });
});
