import { Injectable, Inject } from '@angular/core';
import { ECHO_URL } from '../../models/injection-tokens.store';
import { HttpClient } from '@angular/common/http';
import EchoData from '../../models/echo-data.model';
import { map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

/**
 * Main purpose of this service is to showcase how to test a service with http request
 */
@Injectable()
export class EchoService {
  /**
   * Take in needed dependencies via the constructor to allow unit tests to inject mocks
   *
   * For more information: https://angular.io/guide/dependency-injection
   * @param url URL of the echo endpoint
   * @param httpClient Http client
   */
  constructor(@Inject(ECHO_URL) private readonly url: string, private httpClient: HttpClient) {}

  /**
   * Send input data to echo url
   * @param data Input data
   * @returns echo data received from echo url
   */
  echo(data: EchoData): Observable<EchoData> {
    if (!data) {
      return throwError('Echo data cannot be empty');
    }
    return this.httpClient.post<any>(this.url, data).pipe(map(r => r.json as EchoData));
  }
}
