import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EchoTooService } from '../shared/services/echo-too/echo-too.service';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { NGXLogger } from 'ngx-logger';

/**
 * Main purpose of the component is to show how to test a component with dependencies
 */
@Component({
  selector: 'app-unit-test',
  templateUrl: './unit-test.component.html',
  styleUrls: ['./unit-test.component.scss']
})
export class UnitTestComponent implements OnInit {
  // The form control that will be used as the value to echo back
  echoInput = new FormControl('', RxwebValidators.notEmpty());
  // Result from the echo service
  echoResult = '';

  /**
   * Take in needed dependencies via the constructor to allow unit tests to inject mocks
   *
   * For more information: https://angular.io/guide/dependency-injection
   */
  constructor(private echoService: EchoTooService, private logger: NGXLogger) {}

  ngOnInit(): void {}

  /**
   * Send user input to echo service and store the result in echoResult
   */
  startEcho(): void {
    // Echo only if the input is valid
    if (this.echoInput.valid) {
      // Send input and store result in echoResult
      this.echoService.echo(this.echoInput.value).subscribe(
        r => (this.echoResult = r),
        e => this.logger.warn('UnitTestComponent.startEcho: Unable to echo', e)
      );
    }
  }
}
