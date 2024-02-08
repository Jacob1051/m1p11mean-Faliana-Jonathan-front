import { TestBed } from '@angular/core/testing';

import { LocalTimezoneService } from './local-timezone.service';

describe('LocalTimezoneService', () => {
  let service: LocalTimezoneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalTimezoneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
