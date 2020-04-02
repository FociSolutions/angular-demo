import { UnitTestComponent } from './unit-test.component';
import { Spectator, createComponentFactory, SpyObject } from '@ngneat/spectator';
import { EchoTooService } from '../shared/services/echo-too/echo-too.service';
import { LoggerTestingModule } from 'ngx-logger/testing';
import { UppercasePipe } from '../shared/pipes/uppercase/uppercase.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { of, throwError } from 'rxjs';
import * as faker from 'faker';

// Main purpose of this test file is to show how to test a component that depends on others
// For more information on testing service: https://github.com/ngneat/spectator#testing-components
describe('UnitTestComponent', () => {
  // For accessing the target component
  let component: UnitTestComponent;
  // For accessing the target component and its dependencies
  let spectator: Spectator<UnitTestComponent>;
  // Function call that extends the basic Angular Testing Module options
  const createComponent = createComponentFactory({
    component: UnitTestComponent,
    imports: [LoggerTestingModule, ReactiveFormsModule, MatInputModule, MatButtonModule],
    declarations: [UppercasePipe],
    mocks: [EchoTooService] // Providers that will automatically be mocked
  });

  beforeEach(() => {
    // Create a new instance of the component and all its dependencies before each test is run
    spectator = createComponent();
    spectator.detectChanges();
    component = spectator.component;
  });

  // All unit tests for the same method should be group under one describe
  // and description of the describe should be the method name
  describe('startEcho', () => {
    // Declare variables needed for testing target method within describe for the method
    let mockEcho: SpyObject<EchoTooService>;

    beforeEach(() => {
      // Setup injection needed before each test run
      mockEcho = spectator.inject(EchoTooService);
    });

    // The test description should accurately reflect what this test is testing
    it('should not update echo result if input is invalid', () => {
      // Input for the target method should be stored in variable called input,
      // if more than one inputs are needed, the variable names should start with input
      const input = null;
      // Expected result
      const expected = '';

      // Substitute return value of the dependency of target method
      mockEcho.echo.and.returnValue(of(faker.random.word()));

      component.echoInput.setValue(input);
      component.startEcho();

      const actual = component.echoResult;

      expect(actual).toEqual(expected);
    });

    // The test description should accurately reflect what this test is testing
    it('should not update echo result if echo service failed', () => {
      // Input for the target method should be stored in variable called input,
      // if more than one inputs are needed, the variable names should start with input
      const input = faker.random.word();
      // Expected result
      const expected = '';

      // Substitute return value of the dependency of target method
      mockEcho.echo.and.returnValue(throwError('Echo service down'));

      component.echoInput.setValue(input);
      component.startEcho();

      const actual = component.echoResult;

      expect(actual).toEqual(expected);
    });

    // The test description should accurately reflect what this test is testing
    it('should update echo result if input is valid string', () => {
      // Input for the target method should be stored in variable called input,
      // if more than one inputs are needed, the variable names should start with input
      const input = faker.random.word();

      // Substitute return value of the dependency of target method
      mockEcho.echo.and.returnValue(of(input));

      component.echoInput.setValue(input);
      component.startEcho();

      const actual = component.echoResult;

      expect(actual).toEqual(input);
    });
  });
});
