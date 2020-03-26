import { Component, OnInit, Input } from '@angular/core';
import { Player } from '../shared/models/player.model';
import { FormGroup } from '@angular/forms';
import { TeamControlService } from '../shared/services/team-control/team-control.service';

/**
 * The component for taking in player name and player type
 */
@Component({
  selector: 'app-player-list-item',
  templateUrl: './player-list-item.component.html',
  styleUrls: ['./player-list-item.component.scss']
})
export class PlayerListItemComponent implements OnInit {
  form: FormGroup;
  player: Player;

  constructor(private teamControlService: TeamControlService) {}

  ngOnInit(): void {}

  /**
   * Form group for the current player
   */
  /*istanbul ignore next*/
  @Input()
  set formGroup(form: FormGroup) {
    this.form = form;
    // Create player model base on the provided form group
    this.player = this.teamControlService.toPlayer(form);
  }

  /**
   * Player name model
   */
  /*istanbul ignore next*/
  get name() {
    return this.player.name;
  }

  /**
   * Player name form control
   */
  /*istanbul ignore next*/
  get nameControl() {
    return this.form.get(this.name.key);
  }

  /**
   * Player type model
   */
  /*istanbul ignore next*/
  get type() {
    return this.player.type;
  }

  /**
   * Player type form control
   */
  /*istanbul ignore next*/
  get typeControl() {
    return this.form.get(this.type.key);
  }
}
