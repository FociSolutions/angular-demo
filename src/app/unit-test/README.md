## Unit Test Module

Demonstrate what we are expecting when creating unit tests for different class types, please give them a read for more in depth understanding:

- https://angular.io/guide/testing
- https://jasmine.github.io/2.3/introduction
- https://github.com/ngneat/spectator

_Folder structure of this module loosely follows [the Angular style guide](https://angular.io/guide/styleguide)._

### Models

This module contains serval models:

- `EchoData` used to represent echo data
- `injection-tokens.store.ts` for storing the injection tokens used in this module
  - `ECHO_URL` is the injection token for echo endpoint URL

### Components

`UnitTestComponent` takes in user input and echo the input back in uppercase. The main purpose of this component is to show how to test a component with dependencies. For more detail please check `unit-test.component.spec.ts`

### Services

This module contains 2 services:

- `EchoService` send input to an echo endpoint and return result as `EchoData`. This service is created to show how to test a service utilizing a HTTP client. For more detail please check `echo.service.spec.ts`
- `EchoTooService` depends on `EchoService` to receive result from the echo endpoint. This service unwraps `EchoData` and return the echo string. The main purpose of this service is to show how to test a service that depends on other service. For more detail please check `echo-too.service.spec.ts`

### Pipes

`UppercasePipe` takes in a string input and transform that input to uppercase. This pipe is create to show how to test a pipe. For more detail please check `uppercase.pipe.spec.ts`
