import { Component, OnInit } from '@angular/core';

/**
 * Acts as the parent component for the rest of the components in the module.
 * Listens to events and sends data to other children components.
 */
@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent implements OnInit {
  // The string data to send to the UppercaseTextComponent
  text: string;
  // The number data to send to the MultiInputExampleComponent
  num1 = 0;
  num2 = 0;

  constructor() {}

  ngOnInit(): void {}

  /**
   * Sets the text property equal to the provided string value.
   * @param text The string input to set the text property to
   */
  /* istanbul ignore next */
  onChange(text: string) {
    // Sets the text property which update the child components input
    this.text = text;
  }

  /**
   * Increments the num1 property by 1. This will trigger an update on the displayed sum
   */
  /* istanbul ignore next */
  incrementNum1() {
    this.num1++;
  }

  /**
   * Increments both the num1 and num2 property. This will trigger an update on the displayed
   * sum and product.
   */
  /* istanbul ignore next */
  incrementNum1AndNum2() {
    this.num1++;
    this.num2++;
  }
}
