import { TestBed } from '@angular/core/testing';
import * as faker from 'faker';
import { MessageService } from './message.service';

describe('MessageService', () => {
  let service: MessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('sendMessage', () => {
    it('should push the string parameter onto the subject', (done) => {
      const input = faker.random.word();
      service.messageStream.subscribe(
        (message) => {
          expect(message).toEqual(input);
          done();
        },
        (err) => {
          done.fail(err);
        }
      );
      service.sendMessage(input);
    });
  });
});
