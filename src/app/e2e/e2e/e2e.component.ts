import { Component, OnInit } from '@angular/core';

/**
 * This component just acts as a parent component. It's template contains the other two child components for
 * message input and viewing the messages.
 */
@Component({
  selector: 'app-e2e',
  templateUrl: './e2e.component.html',
  styleUrls: ['./e2e.component.scss'],
})
export class E2eComponent implements OnInit {
  ngOnInit(): void {}
}
