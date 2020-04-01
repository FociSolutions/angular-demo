import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as faker from 'faker';
import { UppercaseTextComponent } from './uppercase-text.component';

describe('UppercaseTextComponent', () => {
  let component: UppercaseTextComponent;
  let fixture: ComponentFixture<UppercaseTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UppercaseTextComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UppercaseTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('text', () => {
    it('should set the uppercaseText property to the uppercase version of the passed in text', () => {
      const word = faker.random.word();
      component.text = word;
      expect(component.uppercaseText).toEqual(word.toUpperCase());
    });

    it('should do nothing if given an invalid string', () => {
      component.text = null;
      expect(component.uppercaseText).not.toEqual(null);
    });
  });
});
