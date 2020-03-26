import { Component, OnInit } from '@angular/core';
import { Team } from '../shared/models/team.model';
import { FormGroup } from '@angular/forms';
import { TeamControlService } from '../shared/services/team-control/team-control.service';
import { MatDialog } from '@angular/material/dialog';
import { ResultComponent } from '../shared/dialogs/result/result.component';

/**
 * The main form component that stitches everything together
 */
@Component({
  selector: 'app-complex-form',
  templateUrl: './complex-form.component.html',
  styleUrls: ['./complex-form.component.scss']
})
export class ComplexFormComponent implements OnInit {
  emptyTeam: Team;
  teamForm: FormGroup;
  newPlayerForm: FormGroup;

  constructor(private teamControlService: TeamControlService, private dialog: MatDialog) {
    // Create an empty team
    this.emptyTeam = new Team();
    // Create an empty new player form
    this.newPlayerForm = this.teamControlService.toPlayerForm();
    // Create an empty team form group
    this.teamForm = this.teamControlService.toTeamForm(this.emptyTeam);
  }

  ngOnInit(): void {}

  /**
   * Event handler for form submit event
   */
  /*istanbul ignore next*/
  onSubmit() {
    if (!!this.teamForm && this.teamForm.valid) {
      // Open Result dialog to show what user have entered
      const dialogRef = this.dialog.open(ResultComponent, {
        // Provide team model to dialog
        data: this.teamControlService.toTeam(this.teamForm)
      });
      // Reset team form group and new player form group after dialog is closed
      dialogRef.afterClosed().subscribe(_ => {
        this.teamForm = this.teamControlService.toTeamForm(this.emptyTeam);
        this.newPlayerForm = this.teamControlService.toPlayerForm();
      });
    }
  }
}
