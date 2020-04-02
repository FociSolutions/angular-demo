import { createHttpFactory, SpectatorHttp, HttpMethod } from '@ngneat/spectator';
import { EchoService } from './echo.service';
import * as faker from 'faker';
import { ECHO_URL } from '../../models/injection-tokens.store';

// Main purpose of this test file is to show how to test a service with HTTP request
// For more information on testing service with HTTP request: https://github.com/ngneat/spectator#testing-with-http
describe('EchoService', () => {
  // Mocked url endpoint
  const url = faker.internet.url();
  // For accessing the service
  let service: EchoService;
  // For accessing the target service and its dependencies
  let spectator: SpectatorHttp<EchoService>;
  // Function call that extends the basic Angular Testing Module options
  const createHttp = createHttpFactory({
    service: EchoService,
    providers: [{ provide: ECHO_URL, useValue: url }]
  });

  beforeEach(() => {
    // Create a new instance of the service and all its dependencies before each test is run
    spectator = createHttp();
    service = spectator.service;
  });

  // All unit tests for the same method should be group under one describe
  // and description of the describe should be the method name
  describe('echo', () => {
    // The test description should accurately reflect what this test is testing
    // If testing asynchronous method, test should utilize DoneFn to avoid timeout,
    // for more information on DoneFn: https://angular.io/guide/testing#jasmine-done
    it('should receive error when provide null input', (done: DoneFn) => {
      // Input for the target method should be stored in variable called input,
      // if more than one inputs are needed, the variable names should start with input
      const input = null;

      service.echo(input).subscribe(
        // Unexpected result,
        // call done.fail function to cause current test to fail and stop execution
        actual => done.fail(`Received ${actual}`),
        // Call done function at the end of expect to stop execution
        error => {
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
      const input = { data: faker.random.word() };

      service.echo(input).subscribe(
        // Call done function at the end of expect to stop execution
        actual => {
          expect(actual).toEqual(input);
          done();
        },
        // Unexpected result,
        // call done.fail function to cause current test to fail and stop execution
        error => done.fail(error)
      );

      // Expect that a single request was made and the request body equals to input
      const req = spectator.expectOne(url, HttpMethod.POST);
      expect(req.request.body).toEqual(input);
      // Resolve the request
      // Note: if expecting multiple request, use flushAll method to resolve all of them at once
      req.flush({ json: input });
    });
  });
});
