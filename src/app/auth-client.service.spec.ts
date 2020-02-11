import { TestBed } from '@angular/core/testing';

import { AuthClientService } from './auth-client.service';

describe('AuthClientService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthClientService = TestBed.get(AuthClientService);
    expect(service).toBeTruthy();
  });
});
