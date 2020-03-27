import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ShoppingCartService } from '../shared/services/shopping-cart/shopping-cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  itemControl = new FormControl('', Validators.required);
  valueControl = new FormControl(0, Validators.required);
  items = [];

  constructor(private shoppingCart: ShoppingCartService) {}

  ngOnInit(): void {}

  /**
   * Returns an observable that results in the total cost before tax
   */
  /* istanbul ignore next */
  get beforeTax(): Observable<number> {
    return this.shoppingCart.total;
  }

  /**
   * Returns an observable that results in the tax
   */
  /* istanbul ignore next */
  get tax(): Observable<number> {
    return this.shoppingCart.tax;
  }

  /**
   * returns an observable that results in the total cost after tax
   */
  /* istanbul ignore next */
  get afterTax(): Observable<number> {
    return this.shoppingCart.totalAfterTax;
  }

  /**
   * Adds an item to the list of items and updates the shopping carts value
   */
  addItem() {
    if (this.itemControl.valid && this.valueControl.valid) {
      this.items = [...this.items, { item: this.itemControl.value, value: this.valueControl.value }];
      this.shoppingCart.add(this.valueControl.value);
    }
  }

  /**
   * Removes an item by index from the shopping cart
   * @param index The index of the item to remove from or shopping cart
   */
  removeItem(index: number) {
    this.shoppingCart.subtract(this.items[index].value);
    this.items.splice(index, 1);
  }
}
