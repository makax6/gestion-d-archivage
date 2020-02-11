import { TestBed } from '@angular/core/testing';

import { AuthOrdreService } from './auth-ordre.service';

describe('AuthOrdreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthOrdreService = TestBed.get(AuthOrdreService);
    expect(service).toBeTruthy();
  });
});
