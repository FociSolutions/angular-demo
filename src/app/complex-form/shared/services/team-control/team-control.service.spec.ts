import { TestBed } from '@angular/core/testing';

import { TeamControlService } from './team-control.service';
import { ReactiveFormsModule, FormArray, FormBuilder } from '@angular/forms';
import { Team } from '../../models/team.model';
import { Player } from '../../models/player.model';
import * as faker from 'faker';

describe('TeamControlService', () => {
  let service: TeamControlService;
  let builder: FormBuilder;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [ReactiveFormsModule], providers: [TeamControlService] });
    service = TestBed.inject(TeamControlService);
    builder = TestBed.inject(FormBuilder);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('toTeamForm', () => {
    it('should create default form group if team model is empty', () => {
      const input = new Team();

      const actual = service.toTeamForm(input);
      expect(actual).toBeTruthy();

      const actualName = actual.get(input.name.key);
      expect(actualName).toBeTruthy();
      expect(actualName.value).toEqual('');

      const actualPlayers = actual.get(input.playersKey) as FormArray;
      expect(actualPlayers).toBeTruthy();
      expect(actualPlayers.controls.length).toEqual(0);
    });

    it('should create form group contain info in the team model', () => {
      const inputTeamName = faker.random.word();
      const inputPlayer = new Player(faker.random.word());
      const input = new Team(inputTeamName, [inputPlayer]);

      const actual = service.toTeamForm(input);
      expect(actual).toBeTruthy();

      const actualName = actual.get(input.name.key);
      expect(actualName).toBeTruthy();
      expect(actualName.value).toEqual(inputTeamName);

      const actualPlayers = actual.get(input.playersKey) as FormArray;
      expect(actualPlayers).toBeTruthy();
      expect(actualPlayers.controls.length).toEqual(1);
    });
  });

  describe('toTeam', () => {
    it('should create default team if form is empty', () => {
      const actual = service.toTeam(null);
      expect(actual).toBeTruthy();
    });

    it('should create team base on form', () => {
      const inputPlayer = new Player(faker.random.word());
      const inputTeam = new Team(faker.random.word(), [inputPlayer]);

      const players = [
        builder.group({
          [inputPlayer.name.key]: [inputPlayer.name.value || '', inputPlayer.name.validators],
          [inputPlayer.type.key]: [inputPlayer.type.value, inputPlayer.type.validators]
        })
      ];
      const input = builder.group({
        [inputTeam.name.key]: [inputTeam.name.value || '', inputTeam.name.validators],
        [inputTeam.playersKey]: builder.array(players, inputTeam.playersValidators)
      });

      const actual = service.toTeam(input);
      expect(actual.name.value).toEqual(inputTeam.name.value);
      expect(actual.players.length).toEqual(inputTeam.players.length);
    });
  });

  describe('toPlayerForm', () => {
    it('should create default form group if player model is empty', () => {
      const input = new Player();

      const actual = service.toPlayerForm(input);
      expect(actual).toBeTruthy();

      const actualName = actual.get(input.name.key);
      expect(actualName).toBeTruthy();
      expect(actualName.value).toEqual('');
    });

    it('should create form group contain info in the team model', () => {
      const inputName = faker.random.word();
      const input = new Player(inputName);

      const actual = service.toPlayerForm(input);
      expect(actual).toBeTruthy();

      const actualName = actual.get(input.name.key);
      expect(actualName).toBeTruthy();
      expect(actualName.value).toEqual(inputName);
    });
  });

  describe('toPlayer', () => {
    it('should create default player if form is empty', () => {
      const actual = service.toPlayer(null);
      expect(actual).toBeTruthy();
    });

    it('should create player base on form', () => {
      const inputPlayer = new Player(faker.random.word());
      const input = builder.group({
        [inputPlayer.name.key]: [inputPlayer.name.value || '', inputPlayer.name.validators],
        [inputPlayer.type.key]: [inputPlayer.type.value, inputPlayer.type.validators]
      });

      const actual = service.toPlayer(input);
      expect(actual.name.value).toEqual(inputPlayer.name.value);
    });
  });
});
