import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentComponent } from './parent.component';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TextInputComponent } from '../text-input/text-input.component';
import { UppercaseTextComponent } from '../uppercase-text/uppercase-text.component';
import { MultiInputExampleComponent } from '../multi-input-example/multi-input-example.component';

describe('ParentComponent', () => {
  let component: ParentComponent;
  let fixture: ComponentFixture<ParentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule, BrowserAnimationsModule],
      declarations: [ParentComponent, TextInputComponent, UppercaseTextComponent, MultiInputExampleComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
