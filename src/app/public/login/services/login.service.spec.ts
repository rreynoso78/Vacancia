import { TestBed } from '@angular/core/testing';

import { loginService } from './login.service';

describe('InicioService', () => {
  let service: loginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(loginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
