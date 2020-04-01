import { Component, OnInit, Input } from '@angular/core';

/**
 * This component shows an example of intercepting an Input property. It takes
 * the string value passed to the input property, checks to see if its null or undefined, and
 * then sets the uppercaseText property to the uppercase version of the string if it passes the null check.
 */
@Component({
  selector: 'app-uppercase-text',
  templateUrl: './uppercase-text.component.html',
  styleUrls: ['./uppercase-text.component.scss']
})
export class UppercaseTextComponent implements OnInit {
  // The text that will be displayed by the template.
  uppercaseText = '';
  /**
   * A setter function that should do nothing if the string is null or undefined.
   * If the string is not null or undefined then it will uppercase the string and set the
   * uppercaseText property to the modified string.
   */
  @Input()
  set text(text: string) {
    // Setters are also good for performing null checks on inputs and other validation
    if (!!text) {
      this.uppercaseText = text.toUpperCase();
    }
  }
  constructor() {}

  ngOnInit(): void {}
}
