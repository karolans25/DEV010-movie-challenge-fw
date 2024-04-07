import { TestBed } from '@angular/core/testing';

import { ApiTmdbInterceptor } from './api-tmdb.interceptor';

describe('InterceptorApiTmdbInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ApiTmdbInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ApiTmdbInterceptor = TestBed.inject(ApiTmdbInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
