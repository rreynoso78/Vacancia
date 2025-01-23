import { TestBed } from '@angular/core/testing';

import { VacanciaService } from './vacancia.service';

describe('VacanciaServiceService', () => {
  let service: VacanciaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VacanciaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
