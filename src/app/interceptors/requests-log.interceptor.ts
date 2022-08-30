import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { RESOLVE_STATUS } from '../constants/http-status';

@Injectable()
export class RequestsLogInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    console.log('<----- Type of request is ' + request.method + '.');

    return next.handle(request).pipe(
      map((event) => {
        if (event instanceof HttpResponse) {
          console.log('<----- Result of request is ' + event.status + ". It's mean " + RESOLVE_STATUS[event.status] + '.');
        }

        return event;
      })
    );
  }
}
