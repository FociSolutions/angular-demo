import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { TeamControlService } from '../shared/services/team-control/team-control.service';

/**
 * The component that is responsible for adding/removing player from the form array
 */
@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss']
})
export class PlayerListComponent implements OnInit {
  @Input()
  playersKey: string;
  @Input()
  form: FormGroup;
  @Input()
  newPlayerForm: FormGroup;

  constructor(private teamControlService: TeamControlService, private ref: ChangeDetectorRef) {}

  ngOnInit(): void {}

  /**
   * Form arry for the player list
   */
  /*istanbul ignore next*/
  get players() {
    if (!!this.form && !!this.playersKey) {
      return this.form.get(this.playersKey) as FormArray;
    }
  }

  /**
   * Add a new player to the player form array
   */
  addPlayer() {
    // Only add if new player form exist and its content is valid
    if (!!this.newPlayerForm && this.newPlayerForm.valid) {
      this.players.push(this.newPlayerForm);
      // Reset new player form group
      this.newPlayerForm = this.teamControlService.toPlayerForm();
      // Prevent ExpressionChangedAfterItHasBeenCheckedError cause by update to multiple form groups
      this.ref.detectChanges();
    }
  }

  /**
   * Remove player at the given index from the player form array
   * @param index Index of the player
   */
  removePlayer(index: number) {
    // Only remove if index is valid
    if (!!this.players && this.players.length > index) {
      this.players.removeAt(index);
    }
  }
}
