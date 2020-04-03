# Angular Demo

This project contains a collection of demo modules that showcase different techniques and features of Angular development and how to implement them.

**Details for each demo modules can be found _[here](./additional-documentation/samples.html)_.**

## Recommended VSCode Plugins

Since we prefer to use VSCode to implement our Angular application, the following are some VScode plugin recommendations to make the development process a little bit easier:

- Angular Essentials: `johnpapa.angular-essentials`
- Prettier - Code formatter: `esbenp.prettier-vscode`
- npm: `eg2.vscode-npm-script`
- npm Intellisense: `christian-kohler.npm-intellisense`
- Node.js Modules Intellisense: `leizongmin.node-module-intellisense`
- Code Spell Checker: `streetsidesoftware.code-spell-checker`
- GitLens — Git supercharged: `eamodio.gitlens`

The list can also be found in `.vscode/extensions.json` of this solution, please copy `extensions.json` file to other Angular application's `.vscode` folder.

## Angular Log Format

When logging messages, we want to keep a standard format to make it easier for our future selves to debug/troubleshoot. Therefore, we need to make sure the log message follow the format below:

```
<Timestamp> <LogLevel> <ClassName>.<MethodName>: <Message>
```

- `Timestamp` is the ISO string representation of when the message is logged
- `LogLevel` is the uppercase string representation of the message's log level
- `ClassName` is the name of the class that logged the message
- `MethodName` is the name of the method that logged the message, can be omitted if and only if the method is constructor
- `Message` is the actual log message; If necessary, log message should contain data to aid the debugging process

The following are some example log message:

```bash
# Not using ngx-logger:
2020-04-01T14:48:36.580Z DEBUG FooClass.Bar: This is an example

# Using ngx-logger:
2020-04-01T14:48:36.580Z DEBUG [vendor.js:282391] FooClass.Bar: This is an example
```

_Note: `Timestamp` and `LogLevel` will be automatically added to your log message when using [ngx-logger](https://github.com/dbfannin/ngx-logger)_

Do keep in mind that, most likely than not, the Angular application will be deployed remotely. Thus, log messages might be our only way to figure out what went wrong. So try to keep the log messages as informative as possible while not drowning the reader.

## Code Documentation

_Basic understanding of how to create comment and different comment type is required for this section. If you need a refresher, please check out [JSDoc Style Guide](https://github.com/shri/JSDoc-Style-Guide)._

When documenting code, it is crucial to meet the following expectations so that people can understand what the code suppose to do without polluting it.

### Class Comment

Class comment should only be created for class that is a service, pipe, guard, or interceptor to help others understand purpose of the class. Following is an example class comment:

```ts
/**
 * This service offers basic mathematical operations
 */
export class MathService{...}
```

#### Comment for inputs and outputs

Comment should be created for properties of a component with `@Input()` or `@Output()` attribute to help others understand the purpose of those properties. Below is an example comment:

```ts
/**
 * User ID required to retrieve user information
 */
@Input() id: string;
```

### Method Comment

Every method should have a method comment, which should include:

- An description of what the method does
  - If the method is complex, consider also explain why method works this way
  - If the method is a simple wrapper, the description should be simple
- If applicable, `@param`, `@returns`, and `@throws` should also be present
  - Do NOT leave empty comment tag around! (Except the cases were the comment tag meant to be empty)

The following is an example method comment:

```ts
/**
 * Subtract b from a
 *
 * @param {number} a The first number
 * @param {number} b The second number
 *
 * @returns {number} Difference between a and b
 *
 * @throws {RangeError} If a or b is less than zero
 */
subtract(a: number, b: number): number { ... }
```

### General Expectations

This sections contains some general code documentation expectations that should be followed, and some additional examples.

#### Descriptive names

In addition to following [Angular naming conventions](https://angular.io/guide/styleguide#naming), we should also make sure the names accurately reflect the purpose and functionality of the class, method, variable, etc in a short and concise manner. The following is an example of bad names and potential fixes:

```ts
// Bad Example:
// Function name and parameter names not reflecting purpose and functionality of each
a(u: number[], q: number): bool {
  return u.indexOf(q) > -1;
 }

// Potential Fixes:
// Rename method name and parameter names to be more descriptive
isTargetInArray(array: number[], target: number): bool {
  return array.indexOf(target) > -1;
 }
```

#### Create document for complex logic

If code cannot be explained properly within the comments and cannot be simplified, by refactoring or otherwise, then a document should be created and linked in the comment of the code. An example can be find in [`AsyncMessageProcessor` of old OrbitalBus](https://gitlab.com/foci-open-source/Foci.OrbitalBus/-/blob/master/OrbitalBus/Foci.Orbital.Agent/Pipelines/AsyncMessageProcessor/AsyncMessageProcessor.cs).

#### Avoid inline comments

If the code is complex enough to warrant an inline comment, consider refactor that pieces of code into its own method. Below is an example of how to avoid inline comment:

```ts
// Bad Example:
// Inline comment for code that is too complex
blur(origin: number, x: number): number {
  ...
  // calculates Gaussian probability of x
  const prob = Math.exp(- ((origin - x) ** 2) / (sigma ** 2) / 2.0) / Math.sqrt(2.0 * Math.PI * (sigma ** 2));
  ...
}

// Potential Fix:
// Move complex logic to another method and add comment to that method
blur(origin: number, x: number): number {
  ...
  const prob = gaussian(x, origin, sigma);
  ...
}

/**
 * Calculate Gaussian probability of x
 *
 * @param {number} x Target
 * @param {number} mu Mean of the distribution
 * @param {number} sigma Variance of the distribution
 *
 * @returns {number} Gaussian probability
 */
gaussian(x:number, mu: number, sigma: number) {
  return Math.exp(- ((origin - x) ** 2) / (sigma ** 2) / 2.0) / Math.sqrt(2.0 * Math.PI * (sigma ** 2));
}
```

If refactoring cannot be done or the code is already as simple as it can be, consider following advise of [create document for complex logic](#Create-document-for-complex-logic) section.

#### Bad comment examples

People are able to extract the information provided by the following comment from the class name alone, thus the comment is useless:

```ts
/**
 * Service that do math
 */
export class MathService{...}
```

Below is an ABSOLUTELY TERRIBLE comment! DON'T ever do this!

```ts
/**
 * Join the provided two whole numbers, can be positive, negative, or zero,
 * to compute the total sum
 *
 *  Algorithm: Works by utilizing the cascade of adders (an arithmetic logic units)
 *     within the processor to perform addition on the 32 bits two's complement binary
 *     number together then translate the binary number back to a base 10 number
 *
 *  Modification History: last edited by Bob on April 1st to increase performance by
 *     removing extra space
 *
 * @param {number} a The first whole number that can be positive, negative, or zero
 * @param {number} b The second whole number that can be positive, negative, or zero
 *
 * @returns {number} The total amount of the two natural numbers combined
 */
add(a: number, b: number): number {
  return a + b;
 }
```

Too much unnecessary information! The code already tell us how it works, we don't need paragraphs to explain what `a + b` does and we don't need to know Bob remove a space (we have git).
