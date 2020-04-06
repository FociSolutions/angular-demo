import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * A dialog that will be shown to confirm that a user wants to delete a message. The
 * only data it takes in is the message string the user is deleting. If the user
 * hits confirm then it will emit a boolean value of true, otherwise it emits false. This logic
 * is shown in the html template file.
 */
@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss'],
})
export class DeleteDialogComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: string) {}

  ngOnInit(): void {}
}
