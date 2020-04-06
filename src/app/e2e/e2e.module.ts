import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { E2eComponent } from './e2e/e2e.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MessageInputComponent } from './message-input/message-input.component';
import { MatIconModule } from '@angular/material/icon';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MessageListComponent } from './message-list/message-list.component';


const routes: Routes = [
  { path: '', component: E2eComponent}
];

@NgModule({
  declarations: [E2eComponent, MessageInputComponent, DeleteDialogComponent, MessageListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    ReactiveFormsModule
  ]
})
export class E2eModule { }
