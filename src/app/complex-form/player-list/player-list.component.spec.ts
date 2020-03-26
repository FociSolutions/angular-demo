import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerListComponent } from './player-list.component';
import { TeamControlService } from '../shared/services/team-control/team-control.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Team } from '../shared/models/team.model';
import { Player } from '../shared/models/player.model';
import * as faker from 'faker';
import { PlayerType } from '../shared/models/player-type.enum';
import { MatIconModule } from '@angular/material/icon';

describe('PlayerListComponent', () => {
  let component: PlayerListComponent;
  let service: TeamControlService;
  let fixture: ComponentFixture<PlayerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PlayerListComponent],
      imports: [ReactiveFormsModule, MatIconModule],
      providers: [TeamControlService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.inject(TeamControlService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('addPlayer', () => {
    it('should not add player if newPlayerForm is null', () => {
      const inputTeam = new Team();
      component.form = service.toTeamForm(inputTeam);
      component.playersKey = inputTeam.playersKey;

      component.addPlayer();
      expect(component.players.controls.length).toEqual(0);
    });

    it('should not add player if newPlayerForm is invalid', () => {
      const inputTeam = new Team();
      component.form = service.toTeamForm(inputTeam);
      component.playersKey = inputTeam.playersKey;
      component.newPlayerForm = service.toPlayerForm();

      component.addPlayer();
      expect(component.players.controls.length).toEqual(0);
    });

    it('should add player if newPlayerForm is valid', () => {
      const inputTeam = new Team();
      component.form = service.toTeamForm(inputTeam);
      component.playersKey = inputTeam.playersKey;
      component.newPlayerForm = service.toPlayerForm(new Player(faker.random.word(), PlayerType.Villager));

      component.addPlayer();
      expect(component.players.controls.length).toEqual(1);
    });
  });

  describe('removePlayer', () => {
    it('should not remove player if index is out of bound', () => {
      const inputTeam = new Team();
      component.form = service.toTeamForm(inputTeam);
      component.playersKey = inputTeam.playersKey;

      component.removePlayer(faker.random.number({ min: 2, max: 10 }));
      expect(component.players.controls.length).toEqual(0);
    });

    it('should remove player if index is valid', () => {
      const inputTeam = new Team(faker.random.word(), [new Player(faker.random.word(), PlayerType.Pen)]);
      component.form = service.toTeamForm(inputTeam);
      component.playersKey = inputTeam.playersKey;

      component.removePlayer(0);
      expect(component.players.controls.length).toEqual(0);
    });
  });
});
