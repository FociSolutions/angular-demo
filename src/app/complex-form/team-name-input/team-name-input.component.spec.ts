import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamNameInputComponent } from './team-name-input.component';

describe('TeamNameInputComponent', () => {
  let component: TeamNameInputComponent;
  let fixture: ComponentFixture<TeamNameInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TeamNameInputComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamNameInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
