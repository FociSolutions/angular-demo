import { browser, $, ElementFinder } from 'protractor';

/**
 * A class representation of the e2e page displayed after navigating to the /e2e route.
 * This class is responsible for defining functions to interact with our application.
 * All of our test suites will use this class to interact with the e2e page. If you need access
 * to an element on the page, this class should declare that element to be used by your spec files.
 * Spec files should never attempt to query for an element on the page because this couples the
 * test logic with implementation details.
 * example:
 *
 *  bad test:
 *    describe('Question page', () => {
 *      it('should answer any question', () => {
 *        var question = element(by.model('question.text'));
 *        var answer = element(by.binding('answer'));
 *        var button = element(by.css('.question-button'));
 *        question.sendKeys('What is the purpose of life?');
 *        button.click();
 *        expect(answer.getText()).toEqual("Chocolate!");
 *      });
 *    });
 *
 *  good test:
 *    var QuestionPage = require('./question-page');
 *    describe('Question page', () => {
 *      var question = new QuestionPage();
 *      it('should ask any question', () => {
 *        question.ask('What is the purpose of meaning?');
 *        expect(question.answer.getText()).toEqual('Chocolate');
 *      });
 *    });
 *
 */
export class E2ePage {
  /**
   * The following variables are being assigned to ElementFinder objects. These object will know how
   * to find elements in our DOM using the provided css selectors. We use theses ElementFinder objects to perform
   * actions on our html elements (like click events). The $ operator will fetch a singular element and is
   * a synchronous operation. The $$ operator fetches multiple elements matching the css selector and is an
   * asynchronous operation.
   */
  // Using css selectors to get our text input element from the MessageInputComponent on this page
  textInput = $('#message-input-component .message-input');
  // Using css selectors to get our button element from the MessageInputComponent on this page
  sendButton = $('#message-input-component .send-button');
  // Using css selectors to get the MessageListComponents html element
  messageList = $('#message-list');

  /**
   * This function will navigate to the /e2e route for testing. It will be used at the start of all e2e tests
   * @returns Promise<unknown> that can be listened to determine when the action is done.
   */
  navigateTo(): Promise<unknown> {
    return browser.get(`${browser.baseUrl}/e2e`) as Promise<unknown>;
  }

  /**
   * This function clears the text input
   */
  clearText() {
    return this.textInput.clear();
  }

  /**
   * Sends a message by typing the provided string into the text input and then clicks the send button to submit
   * the message.
   * @param message The message to type into the input and send
   * @returns Promise<void> that can be listened to determine when the action is done.
   */
  async sendMessage(message: string) {
    await this.textInput.sendKeys(message);
    await this.sendButton.click();
  }

  /**
   * Using the provided string, this function finds the delete icon associated with that message and performs
   * a click action on it.
   * @param message The message that the delete icon is associated with
   * @returns Promise<void> that can be listened to determine when the action is done.
   */
  async clickDeleteIcon(message: string) {
    // Fetching multiple items from the dom is an asynchronous operation so it is easier to use async/await to resolve the promise
    const items: ElementFinder[] = await this.messageList.$$('.message-item');
    for (const deleteRow of items) {
      /**
       * Fetching a single item from the dom is synchronous, however performing an action on an element is asynchronous.
       * So we need to await the getText() function. This applies to all actions such as click(), sendKeys(), ...
       */
      const text = await deleteRow.$('.message').getText();
      // If the text on this delete row is the same as the message we are looking for then we click the delete icon.
      if (text === `"${message}"`) {
        // Returns the click promise so test suites can wait on the click event to finish
        await deleteRow.$('.delete-icon').click();
      }
    }
  }

  /**
   * A function used to find all the messages that are currently displayed on the screen. This function returns a
   * promise that resolves to a list of string values
   * @returns A promise that resolves to a list of string values representing the displayed messages
   */
  async getDisplayedMessages(): Promise<string[]> {
    const items: ElementFinder[] = await this.messageList.$$('.message-item .message');
    const messages = items.map((p) => p.getText());
    /**
     * Because getText() returns a promise we are using Promise.all() to create a promise that resolves once all promises
     * in our array have completed and returns a list of strings. We await on this promise so we can get access to this
     * array of strings and then transform every entry in the array by removing the double quotes that surround each string.
     * We are removing the double quotes because they were inserted as part of the implementation of the MessageListComponent
     * and we want to abstract this implementation away from any test suite that is using this class. If the implementation changes
     * to not add double quotes to the message list view then we will have to update this function but we don't have to change our
     * test suites.
     */
    return (await Promise.all(messages)).map((message) => message.slice(1, -1));
  }

  /**
   * A getter function that returns an ElementFinder object that allows for operations on the delete dialog
   * @returns An ElementFinder object that allows for operations on the delete dialog
   */
  get deleteDialog() {
    return $('#delete-dialog');
  }

  /**
   * A function that performs a click action on the delete dialog's confirm button
   * @returns Promise<void> that can be listened to determine when the action is done.
   */
  confirmDelete() {
    return this.deleteDialog.$('.confirm-button').click();
  }

  /**
   * A function that performs a click action on the delete dialog's cancel button
   * @returns Promise<void> that can be listened to determine when the action is done.
   */
  cancelDelete() {
    return this.deleteDialog.$('.cancel-button').click();
  }
}
