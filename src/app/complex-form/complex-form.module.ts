import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComplexFormComponent } from './complex-form/complex-form.component';
import { TeamNameInputComponent } from './team-name-input/team-name-input.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { TeamControlService } from './shared/services/team-control/team-control.service';
import { PlayerListItemComponent } from './player-list-item/player-list-item.component';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { ResultComponent } from './shared/dialogs/result/result.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { PlayerListComponent } from './player-list/player-list.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: ComplexFormComponent }];

@NgModule({
  declarations: [ComplexFormComponent, TeamNameInputComponent, PlayerListItemComponent, ResultComponent, PlayerListComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatCardModule,
    RxReactiveFormsModule
  ],
  providers: [TeamControlService]
})
export class ComplexFormModule {}
