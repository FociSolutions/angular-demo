import { Injectable } from '@angular/core';
import { EchoService } from '../echo/echo.service';
import EchoData from '../../models/echo-data.model';
import { throwError, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Main purpose of this service is to showcase how to test a service that depends on others
 */
@Injectable()
export class EchoTooService {
  /**
   * Take in needed dependencies via the constructor to allow unit tests to inject mocks
   *
   * For more information: https://angular.io/guide/dependency-injection
   * @param echoService HTTP echo service
   */
  constructor(private echoService: EchoService) {}

  /**
   * Send input to HTTP echo service
   * @param input Input to echo
   * @returns echo string received from HTTP echo service
   */
  echo(input: string): Observable<string> {
    if (!input || input.length < 1) {
      return throwError('Input cannot be null or empty');
    }
    return this.echoService.echo({ data: input } as EchoData).pipe(map(d => d.data));
  }
}
