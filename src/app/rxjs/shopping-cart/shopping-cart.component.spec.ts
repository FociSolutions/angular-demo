import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingCartComponent } from './shopping-cart.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SubstituteOf, Substitute, Arg } from '@fluffy-spoon/substitute';
import { ShoppingCartService } from '../shared/services/shopping-cart/shopping-cart.service';
import * as faker from 'faker';

describe('ShoppingCartComponent', () => {
  let component: ShoppingCartComponent;
  let fixture: ComponentFixture<ShoppingCartComponent>;
  let shoppingCartService: SubstituteOf<ShoppingCartService>;

  beforeEach(async(() => {
    shoppingCartService = Substitute.for<ShoppingCartService>();
    TestBed.configureTestingModule({
      imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule, MatIconModule, BrowserAnimationsModule],
      declarations: [ShoppingCartComponent],
      providers: [{ provide: ShoppingCartService, useFactory: () => shoppingCartService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('addItem', () => {
    it('should attempt to add the item to the shopping cart if the form is value', () => {
      component.itemControl.setValue(faker.random.word());
      component.valueControl.setValue(faker.random.number(10));
      component.addItem();
      expect(shoppingCartService.received().add(component.valueControl.value)).toBeTruthy();
      expect(component.items.findIndex(item => item.item === component.itemControl.value)).toBeGreaterThan(-1);
    });

    it('should not attempt to add an item if the form controls are invalid', () => {
      const spy = spyOn(shoppingCartService, 'add');
      component.addItem();
      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('removeItem', () => {
    it('should attempt to remove the item from the shopping cart', () => {
      const fakedValue = faker.random.number(10);
      component.items = [{ item: faker.random.word(), value: fakedValue }];
      component.removeItem(0);
      expect(component.items.length).toBe(0);
      expect(shoppingCartService.received().subtract(fakedValue)).toBeTruthy();
    });
  });
});
