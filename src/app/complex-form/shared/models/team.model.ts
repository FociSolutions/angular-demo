import { InputBase } from './input-base.model';
import { Player } from './player.model';
import { Validators, ValidatorFn } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';

/**
 * Model class representing the form inputs used to retrieve team information
 */
/*istanbul ignore file*/
export class Team {
  name: InputBase<string>;
  readonly playersKey: string = 'players';
  readonly playersValidators: ValidatorFn = Validators.required;
  players: Player[];

  constructor(name?: string, player?: Player[]) {
    // Define default value of team name input
    this.name = new InputBase<string>({
      value: name,
      key: 'teamName',
      label: 'Team Name',
      maxLen: 60,
      validators: [Validators.required, RxwebValidators.alphaNumeric()]
    });

    this.players = player || [];
  }
}
