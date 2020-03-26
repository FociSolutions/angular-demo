import { ValidatorFn, AbstractControlOptions } from '@angular/forms';

/**
 * The base input model to represent html input/select
 */
/*istanbul ignore file*/
export class InputBase<T> {
  /**
   * Value of current input
   */
  value: T;

  /**
   * Key used to retrieve current input from its parent form
   */
  key: string;

  /**
   * Label used to display to user
   */
  label: string;

  /**
   * Max character length of current input
   */
  maxLen: number;

  /**
   * Dropdown selection options
   */
  options: { key: string; value: T }[];

  /**
   * Validators to apply to current input
   */
  validators?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null;

  constructor(
    options: {
      value?: T;
      key?: string;
      label?: string;
      maxLen?: number;
      options?: { key: string; value: T }[];
      validators?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null;
    } = {}
  ) {
    this.value = options.value;
    this.key = options.key || '';
    this.label = options.label || '';
    this.maxLen = options.maxLen || 256;
    this.options = options.options || [];
    this.validators = options.validators;
  }
}
