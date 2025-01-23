import { TestBed } from '@angular/core/testing';

import { NecesidadesCtService } from './necesidades-ct.service';

describe('NecesidadesCtServiceTsService', () => {
  let service: NecesidadesCtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NecesidadesCtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
