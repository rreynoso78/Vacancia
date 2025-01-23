import { TestBed } from '@angular/core/testing';

import { DatosCtService } from './datos-ct.service';

describe('DatosCtService', () => {
  let service: DatosCtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatosCtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
