import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerListItemComponent } from './player-list-item.component';
import { TeamControlService } from '../shared/services/team-control/team-control.service';
import { ReactiveFormsModule } from '@angular/forms';

describe('PlayerListItemComponent', () => {
  let component: PlayerListItemComponent;
  let fixture: ComponentFixture<PlayerListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PlayerListItemComponent],
      imports: [ReactiveFormsModule],
      providers: [TeamControlService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
