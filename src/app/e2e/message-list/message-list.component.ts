import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessageService } from '../shared/services/message/message.service';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

/**
 * This component is responsible for displaying messages emitted from the MessageService.
 * It listens to new messages emitted from the message service and stores them in an array of strings
 * It also contains logic for opening the delete dialog when the delete icon is clicked and what
 * to do on confirm or cancel.
 */
@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss'],
})
export class MessageListComponent implements OnInit, OnDestroy {
  messages: string[] = [];
  subscription: Subscription;
  constructor(private messageService: MessageService, private dialog: MatDialog) {
    this.subscription = this.messageService.messageStream.subscribe((message) => {
      /**
       * When new messages are emitted from the message service it adds them to the start of the array so they will
       * be displayed in order of newest to oldest
       */
      this.messages = [message, ...this.messages];
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * Opens the delete message dialog and passes the message string at the provided index in the messages array.
   * On confirm the message is removed from the messages array.
   * On cancel no action is taken.
   * @param index The index of the message in the messages array
   */
  openDeleteMessagePopup(index: number) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: this.messages[index],
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!!result) {
        this.messages.splice(index, 1);
      }
    });
  }
}
