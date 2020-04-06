## E2E Module

This lazy loaded feature module is created to demonstrate how to perform end-to-end testing on angular applications using [Protractor](https://www.protractortest.org/)

_Folder structure of this module loosely follows [the Angular style guide](https://angular.io/guide/styleguide). and [the Protractor style guide](https://www.protractortest.org/#/style-guide)_

## Instructions To Run The E2E Tests

Normally when angular creates the project for you it generates the following command in your package.json to run your end-to-end tests, `ng e2e`. However when this command is run you will have to wait for the for your application to build and serve before the end-to-end tests can run. This build step really slows down end-to-end testing. That is why, in this module we have modified the command to be `ng e2e --dev-server-target`. This will cause the end-to-end test runner to use an already built and served instance of the application to run the tests against. However this also means you must have an instance of the application running to execute this command. So the steps to run the tests in the module are:

1. Run the command `npm start` to start an instance of the application
2. Run the command `npm run e2e` in another terminal to start your end-to-end tests.

This changes allows us to run multiple end-to-end test quicker.

## Protractor

Protractor is an end-to-end framework for Angular and AngularJS applications. Protractor runs tests against your application running in a real browser mimicking a real user. Protractor is automatically installed when creating angular applications with the `ng create` command. If for some reason Protractor is not installed please see [the Protractor website](https://www.protractortest.org/#/) for more information.

Here are some things to keep in mind when writing end-to-end tests with Protractor:

- Use Page Objects to interact with a page under test.
  - Page Objects are models of your application UI that your tests interact with. They provide functions that your test suites can use to perform actions or observe changes in your UI. It can also expose properties that reference elements of this UI.
    - For example: We may have a view with a button that when clicked it opens a popup containing a certain message. In order to perform an end-to-end test of this we could create a Page Object for this view and create two functions. One would be responsible for clicking the button and the other one would be responsible for returning the message displayed in the popup. Our Page Object could also expose the popup element as a property so our test suite can check to see if the popup has been displayed after clicking the button.
    - This module contains a similar example as the one described above
  - We do this because Page Objects are reusable, and help decouple the test logic from implementation details. This way if the implementation changes we should only have to update our Page Objects and not our test files that use them.
- Do not using expect() in Page Objects
  - It's not the responsibility of our Page Objects to make assertions. That logic should only be done within our test suites.
- Due to Angular we don't have access to the following locator strategies:
  - `by.model()`
  - `by.binding()`
  - `by.repeater()`
- Prefer using `$` and `$$` locators.
  - `$` is used to select a single elements using css and is a synchronous operation
  - `$$` is used to select multiple elements using css and is a asynchronous operation
- Don't use the `xpath` locator strategy
  - This is a very strong rule created by the Protractor team and should be followed at all times.
- Remember to always navigate to the page under test before testing

  - Example:

    ```typescript
    describe('...', () => {
      beforeAll(() => {
        page = new Page();
        page.navigateTo(); // a navigation function implemented in the Page Object
      });

      //Test Suite Code....
    });
    ```

- Use the Jasmine setup and tear down callbacks (example: `beforeEach()`) to setup test scenarios and perform any cleanup to prevent your end-to-end tests from polluting each other.
  - example: If you have an input you should probably make sure that it is cleared before using it again to ensure you don't just concatenate onto the previous input value. Unless this is the behavior you are trying to achieve.
- All actions performed on an element are asynchronous. Actions are things such as clicking a button or checking to see if a certain element has been displayed.

  - For more information on actions take a look at [the functions listed under the protractor documentation on WebElement](http://www.protractortest.org/#/api?view=webdriver.WebElement) or this [protractor api cheat sheet](https://gist.github.com/javierarques/0c4c817d6c77b0877fda)
  - example:

    ```typescript
    const el = $('.myClass');
    // A click action that returns a Promise<void>
    el.click().then(() => console.log('click action complete'));

    el.sendKeys('some text');

    // Returns a Promise<boolean>
    el.isDisplayed().then((result) => console.log('el is displayed: ', result));
    ```

### Components

This module contains 4 components:

- `E2eComponent` is the parent component for the MessageInputComponent and the MessageListComponent. Its only purpose is to render these two components in a 2 column layout
- `DeleteDialogComponent` is the component that renders when the delete dialog is opened. It acts as a confirmation dialog for deleting a message from the list
- `MessageInputComponent` is the component that contains the input elements for submitting a new message. It is dependent on the `MessageService`, using it to send to messages to any components listening to the services observable
- `MessageListComponent` is the component responsible for displaying the messages emitted by the `MessageService`. It listens to the services observable and stores the incoming messages into an array which are then rendered by its template. Its also responsible for opening the delete dialog when a user clicks on the delete dialog and removing the message from the message list when the user clicks confirm on the delete dialog.

### Services

There is one service contained in this module:

- `MessageService` is the service responsible emitting message strings to any component listening to its observable. It contains a function that can be used to send a new message string through its observable.
