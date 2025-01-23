import { TestBed } from '@angular/core/testing';

import { LugaresDispService } from './lugares-disp.service';

describe('LugaresDispService', () => {
  let service: LugaresDispService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LugaresDispService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
