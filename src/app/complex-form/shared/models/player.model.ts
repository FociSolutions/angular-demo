import { InputBase } from './input-base.model';
import { PlayerType, PlayerTypeArray } from './player-type.enum';
import { Validators } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';

/**
 * Model class representing the form inputs used to retrieve player information
 */
/*istanbul ignore file*/
export class Player {
  name: InputBase<string>;
  type: InputBase<number>;

  constructor(name?: string, type?: PlayerType) {
    // Define default value of the player name input
    this.name = new InputBase<string>({
      value: name,
      key: 'playerName',
      label: 'Player Name',
      maxLen: 60,
      validators: [Validators.required, RxwebValidators.unique()]
    });

    // Define default value of the player type input
    this.type = new InputBase<number>({
      value: type,
      key: 'playerType',
      label: 'Player Type',
      options: PlayerTypeArray,
      validators: Validators.required
    });
  }
}
