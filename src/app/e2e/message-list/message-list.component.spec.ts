import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageListComponent } from './message-list.component';
import { MatIconModule } from '@angular/material/icon';
import Substitute, { SubstituteOf, Arg } from '@fluffy-spoon/substitute';
import { MessageService } from '../shared/services/message/message.service';
import { MatDialog } from '@angular/material/dialog';
import { Subject, of } from 'rxjs';
import * as faker from 'faker';

describe('MessageListComponent', () => {
  let component: MessageListComponent;
  let fixture: ComponentFixture<MessageListComponent>;
  let messageService: SubstituteOf<MessageService>;
  let dialog: SubstituteOf<MatDialog>;
  const messageSubject = new Subject<string>();

  beforeEach(async(() => {
    messageService = Substitute.for<MessageService>();
    dialog = Substitute.for<MatDialog>();
    TestBed.configureTestingModule({
      imports: [MatIconModule],
      declarations: [MessageListComponent],
      providers: [
        { provide: MessageService, useFactory: () => ({ ...messageService, messageStream: messageSubject.asObservable() }) },
        { provide: MatDialog, useFactory: () => dialog },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('openDeleteMessagePopup', () => {
    it('should open the dialog and remove the message on confirm', () => {
      dialog.open(Arg.all()).returns({
        afterClosed: () => {
          return of(true);
        },
      } as any);
      component.messages = [faker.random.word()];
      component.openDeleteMessagePopup(0);
      expect(component.messages.length).toBe(0);
    });

    it('should open the dialog and not remove the message on cancel', () => {
      dialog.open(Arg.all()).returns({
        afterClosed: () => {
          return of(false);
        },
      } as any);
      component.messages = [faker.random.word()];
      component.openDeleteMessagePopup(0);
      expect(component.messages.length).toBe(1);
    });
  });
});
