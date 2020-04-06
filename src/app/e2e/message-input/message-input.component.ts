import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MessageService } from '../shared/services/message/message.service';

/**
 * This component contains is responsible for sending messages to the MessageService.
 * It takes a string from the input element and sends when the send button is clicked using
 * the sendMessage function.
 */
@Component({
  selector: 'app-message-input',
  templateUrl: './message-input.component.html',
  styleUrls: ['./message-input.component.scss'],
})
export class MessageInputComponent implements OnInit {
  messageControl = new FormControl('');
  constructor(private messageService: MessageService) {}

  ngOnInit(): void {}

  /**
   * This function calls the sendMessage function in the MessageService and passes the messageControl's value as a parameter.
   */
  /* istanbul ignore next */
  sendMessage() {
    this.messageService.sendMessage(this.messageControl.value);
  }
}
