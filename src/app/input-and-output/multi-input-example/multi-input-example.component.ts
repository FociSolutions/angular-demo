import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

/**
 * This component takes implements the OnChanges interface. It has two properties that are rendered
 * by its template: the product property and the sum property. The sum property will update anytime one of
 * the two inputs updates. The product property will only update if both properties have updated.
 */
@Component({
  selector: 'app-multi-input-example',
  templateUrl: './multi-input-example.component.html',
  styleUrls: ['./multi-input-example.component.scss']
})
export class MultiInputExampleComponent implements OnInit, OnChanges {
  // default x to 0. We don't have to type it because we are setting it to a number value
  @Input() x = 0;
  // default y to 0. We don't have to type it because we are setting it to a number value
  @Input() y = 0;
  // this property will only update if both values have changed.
  product = 0;

  // this will change when any of the inputs change.
  get sum(): number {
    return this.x + this.y;
  }

  constructor() {}

  /**
   * Given an object containing all the changes detected, this function will update the product property
   * if and only if both the x and y input have been changed.
   * @param changes The changes that have occurred
   */
  /* istanbul ignore next */
  ngOnChanges(changes: SimpleChanges): void {
    // We only execute this code if both properties change simultaneously. This behavior cannot be achieved
    // easily using input setters because a setter will trigger regardless of the other setter.
    if (!!changes.x && !!changes.y) {
      // calculates the current product of x and y
      this.product = changes.x.currentValue * changes.y.currentValue;
      /**
       * changes.x will give use a SimpleChange object for the changes that occurred on the x input.
       * This object gives us access to the following properties and functions:
       * currentValue - the value that the property has been changed to
       * previousValue - the value that the property has been changed from
       * firstChange - a boolean that is set to true if the new value is the first value assigned
       * isFirstChanged() - returns a boolean that has the same purpose as the firstChange property
       */
    }
  }

  ngOnInit(): void {}
}
