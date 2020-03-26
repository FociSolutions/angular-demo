import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Team } from '../../models/team.model';
import { PlayerType } from '../../models/player-type.enum';

/**
 * Dialog component to display team model
 */
@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  // MAT_DIALOG_DATA used to retrieve data provided by the component that invoked this dialog
  constructor(@Inject(MAT_DIALOG_DATA) public data: Team) {}

  ngOnInit(): void {}

  /**
   * Convert the numeric representation of player type enum to the corresponding enum name
   * @param type Numeric enum value
   */
  /*istanbul ignore next*/
  PlayerTypeString(type: number) {
    return PlayerType[type];
  }
}
