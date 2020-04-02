import { Pipe, PipeTransform } from '@angular/core';

/**
 * Main purpose of this class is to showcase how to test pipes
 */
@Pipe({
  name: 'uppercase'
})
export class UppercasePipe implements PipeTransform {
  /**
   * Transform the input string to uppercase
   * @param value Input string
   */
  transform(value: string): string {
    if (!value) {
      return '';
    }
    return value.toUpperCase();
  }
}
