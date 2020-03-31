import { Component, OnInit } from '@angular/core';

/**
 * This component showcase scenario where a component only need read access to the translation service
 */
@Component({
  selector: 'app-content-card',
  templateUrl: './content-card.component.html',
  styleUrls: ['./content-card.component.scss']
})
export class ContentCardComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
