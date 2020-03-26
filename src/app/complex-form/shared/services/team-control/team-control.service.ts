import { Injectable } from '@angular/core';
import { Team } from '../../models/team.model';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Player } from '../../models/player.model';

/**
 * Service used for translating team model to and from form group,
 * and it is also responsible for translation player model to and from form group
 */
@Injectable()
export class TeamControlService {
  constructor(private builder: FormBuilder) {}

  /**
   * Convert the provided team model to form group
   * @param team Team model
   */
  toTeamForm(team: Team) {
    // Convert the list of player models to list of form groups
    const players = [];
    team.players.forEach(p => {
      players.push(this.toPlayerForm(p));
    });

    // Convert team model to form group with validations
    return this.builder.group({
      [team.name.key]: [team.name.value || '', team.name.validators],
      [team.playersKey]: this.builder.array(players, team.playersValidators)
    });
  }

  /**
   * Convert the given form group to team model
   * @param form Form group
   */
  toTeam(form: FormGroup) {
    const team = new Team();
    // Only attempt to convert if form is provided
    if (!!form) {
      team.name.value = form.get(team.name.key).value || '';
      // Convert each player form group inside the from array to player model
      const playerArray = form.get(team.playersKey) as FormArray;
      if (!!playerArray) {
        team.players = playerArray.controls.map(p => this.toPlayer(p as FormGroup));
      }
    }
    return team;
  }

  /**
   * Convert the provided player model to form group
   * @param player Player model
   */
  toPlayerForm(player: Player = new Player()) {
    return this.builder.group({
      [player.name.key]: [player.name.value || '', player.name.validators],
      [player.type.key]: [player.type.value, player.type.validators]
    });
  }

  /**
   * Convert the provided form group to player model
   * @param form Form group
   */
  toPlayer(form: FormGroup) {
    const player = new Player();
    // Only attempt to convert if form is provided
    if (!!form) {
      player.name.value = form.get(player.name.key).value || '';
      player.type.value = form.get(player.type.key).value;
    }
    return player;
  }
}
