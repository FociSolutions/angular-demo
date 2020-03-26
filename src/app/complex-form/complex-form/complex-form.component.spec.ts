import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplexFormComponent } from './complex-form.component';
import { TeamControlService } from '../shared/services/team-control/team-control.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { TeamNameInputComponent } from '../team-name-input/team-name-input.component';
import { PlayerListComponent } from '../player-list/player-list.component';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';

describe('ComplexFormComponent', () => {
  let component: ComplexFormComponent;
  let fixture: ComponentFixture<ComplexFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ComplexFormComponent, TeamNameInputComponent, PlayerListComponent],
      imports: [ReactiveFormsModule, MatDialogModule, MatCardModule, MatInputModule, MatIconModule, BrowserAnimationsModule],
      providers: [TeamControlService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplexFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
