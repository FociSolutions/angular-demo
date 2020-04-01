import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as faker from 'faker';
import { TextInputComponent } from './text-input.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('TextInputComponent', () => {
  let component: TextInputComponent;
  let fixture: ComponentFixture<TextInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule, BrowserAnimationsModule],
      declarations: [TextInputComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('emitChange', () => {
    it('should emit the text value of the change event', done => {
      const input = {
        target: {
          value: faker.random.word()
        }
      };
      // Angular EventEmitters extend the RxJS Subject class and can be subscribed to for testing purposes.
      // Do not do this in the component.
      component.textChange.subscribe(data => {
        expect(data).toEqual(input.target.value);
        done();
      });

      component.emitChange(input);
    });
  });
});
