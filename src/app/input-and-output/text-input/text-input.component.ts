import { Component, OnInit, Output, EventEmitter } from '@angular/core';

/**
 * This component takes user input through a text input and emits the string value of that
 * input every time it is changed.
 */
@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss']
})
export class TextInputComponent implements OnInit {
  @Output() textChange: EventEmitter<string> = new EventEmitter<string>();
  constructor() {}

  ngOnInit(): void {}

  /**
   * Takes a text input event and emits the string value using the textChange event emitter.
   * @param event The event received from the text input
   */
  emitChange(event) {
    // Emits the text string from the input event.
    this.textChange.emit(event.target.value);
  }
}
