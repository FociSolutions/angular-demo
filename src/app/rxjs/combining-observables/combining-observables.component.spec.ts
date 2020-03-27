import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CombiningObservablesComponent } from './combining-observables.component';
import { MatIconModule } from '@angular/material/icon';

describe('CombiningObservablesComponent', () => {
  let component: CombiningObservablesComponent;
  let fixture: ComponentFixture<CombiningObservablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CombiningObservablesComponent],
      imports: [MatIconModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CombiningObservablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
