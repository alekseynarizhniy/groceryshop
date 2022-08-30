import { TestBed } from '@angular/core/testing';

import { RequestsLogInterceptor } from './requests-log.interceptor';

describe('RequestsLogInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      RequestsLogInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: RequestsLogInterceptor = TestBed.inject(RequestsLogInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
