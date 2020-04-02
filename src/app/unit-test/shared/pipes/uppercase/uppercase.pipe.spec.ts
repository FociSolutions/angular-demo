import { UppercasePipe } from './uppercase.pipe';
import { createPipeFactory } from '@ngneat/spectator';
import { Component, Input } from '@angular/core';
import * as faker from 'faker';

// Main purpose of this test file is to show how to test a pipe using custom host component
// For more information on testing using custom host component: https://github.com/ngneat/spectator#using-custom-host-component
// To know more about testing without using a custom host component: https://github.com/ngneat/spectator#testing-pipes

/**
 * Host component created aid testing of target pipe
 *
 * This class must come before the test cases
 */
/*istanbul ignore file*/
@Component({
  template: `
    <div>{{ prop | uppercase }}</div>
  `
})
class TestHostComponent {
  @Input() public prop: string;
}

// Test cases for the target pipe must come after the test host component
describe('UppercasePipe', () => {
  // Function call that extends the basic Angular Testing Module options
  const createPipe = createPipeFactory({
    pipe: UppercasePipe,
    host: TestHostComponent
  });

  // The test description should accurately reflect what this test is testing
  it('should display empty string if input is null', () => {
    // Input for the target method should be stored in variable called input,
    // if more than one inputs are needed, the variable names should start with input
    const input = null;
    // Expected result
    const expected = '';

    // Create a new instance of the pipe with input
    const spectator = createPipe({
      hostProps: {
        prop: input
      }
    });

    // Actual result can be retrieved from the component element
    const actual = spectator.element;

    expect(actual).toHaveText(expected);
  });

  // The test description should accurately reflect what this test is testing
  it('should convert string to uppercase if input is valid string', () => {
    // Input for the target method should be stored in variable called input,
    // if more than one inputs are needed, the variable names should start with input
    const input = faker.random.word();
    // Expected result
    const expected = input.toUpperCase();

    // Create a new instance of the pipe with input
    const spectator = createPipe({
      hostProps: {
        prop: input
      }
    });

    // Actual result can be retrieved from the component element
    const actual = spectator.element;

    expect(actual).toHaveText(expected);
  });
});
