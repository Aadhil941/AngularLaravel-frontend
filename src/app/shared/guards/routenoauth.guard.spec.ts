import { TestBed } from '@angular/core/testing';

import { RouteNoAuthGuard } from './routenoauth.guard';

describe('RouteguardGuard', () => {
  let guard: RouteNoAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RouteNoAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
