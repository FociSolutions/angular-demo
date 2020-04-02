import { EchoTooService } from './echo-too.service';
import { SpectatorService, createServiceFactory, SpyObject } from '@ngneat/spectator';
import { EchoService } from '../echo/echo.service';
import * as faker from 'faker';
import { of, throwError } from 'rxjs';
import EchoData from '../../models/echo-data.model';

// Main purpose of this test file is to show how to test a service that depends on others
// For more information on testing service: https://github.com/ngneat/spectator#testing-services
// Note: to mock a provider follow https://github.com/ngneat/spectator#mocking-providers
describe('EchoTooService', () => {
  // For accessing the target service
  let service: EchoTooService;
  // For accessing the target service and its dependencies
  let spectator: SpectatorService<EchoTooService>;
  // Function call that extends the basic Angular Testing Module options
  const createService = createServiceFactory({
    service: EchoTooService,
    mocks: [EchoService]
  });

  beforeEach(() => {
    // Create a new instance of the service and all its dependencies before each test is run
    spectator = createService();
    service = spectator.service;
  });

  // All unit tests for the same method should be group under one describe
  // and description of the describe should be the method name
  describe('echo', () => {
    // Declare variables needed for testing target method within describe for the method
    let mockEcho: SpyObject<EchoService>;

    beforeEach(() => {
      // Setup injection needed before each test run
      mockEcho = spectator.inject(EchoService);
    });

    // The test description should accurately reflect what this test is testing
    // If testing asynchronous method, test should utilize DoneFn to avoid timeout,
    // for more information on DoneFn: https://angular.io/guide/testing#jasmine-done
    it('should receive error when provide null input', (done: DoneFn) => {
      // Input for the target method should be stored in variable called input,
      // if more than one inputs are needed, the variable names should start with input
      const input = null;

      // Substitute return value of the dependency of target method
      mockEcho.echo.and.returnValue(throwError('Should not reach here'));

      service.echo(input).subscribe(
        // Unexpected result,
        // call done.fail function to cause current test to fail and stop execution
        actual => done.fail(`Received ${actual}`),
        error => {
          // Call done function at the end of expect to stop execution
          expect(error).toBeTruthy();
          done();
        }
      );
    });

    // The test description should accurately reflect what this test is testing
    // If testing asynchronous method, test should utilize DoneFn to avoid timeout,
    // for more information on DoneFn: https://angular.io/guide/testing#jasmine-done
    it('should receive error when provide empty input', (done: DoneFn) => {
      // Input for the target method should be stored in variable called input,
      // if more than one inputs are needed, the variable names should start with input
      const input = '';

      // Substitute return value of the dependency of target method
      mockEcho.echo.and.returnValue(throwError('Should not reach here'));

      service.echo(input).subscribe(
        // Unexpected result,
        // call done.fail function to cause current test to fail and stop execution
        actual => done.fail(`Received ${actual}`),
        error => {
          // Call done function at the end of expect to stop execution
          expect(error).toBeTruthy();
          done();
        }
      );
    });

    // The test description should accurately reflect what this test is testing
    // If testing asynchronous method, test should utilize DoneFn to avoid timeout,
    // for more information on DoneFn: https://angular.io/guide/testing#jasmine-done
    it('should echo value provided', (done: DoneFn) => {
      // Input for the target method should be stored in variable called input,
      // if more than one inputs are needed, the variable names should start with input
      const input = faker.random.word();

      // Substitute return value of the dependency of target method
      mockEcho.echo.and.returnValue(of({ data: input } as EchoData));

      service.echo(input).subscribe(
        actual => {
          // Call done function at the end of expect to stop execution
          expect(actual).toEqual(input);
          done();
        },
        // Unexpected result,
        // call done.fail function to cause current test to fail and stop execution
        error => done.fail(error)
      );
    });
  });
});
