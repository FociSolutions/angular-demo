import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InputBase } from '../shared/models/input-base.model';

/**
 * Component for taking in team name
 */
@Component({
  selector: 'app-team-name-input',
  templateUrl: './team-name-input.component.html',
  styleUrls: ['./team-name-input.component.scss']
})
export class TeamNameInputComponent implements OnInit {
  @Input()
  name: InputBase<string>;
  @Input()
  form: FormGroup;

  constructor() {}

  ngOnInit(): void {}

  /**
   * Team name form control
   */
  /*istanbul ignore next*/
  get teamNameControl() {
    return this.form.get(this.name.key);
  }
}
