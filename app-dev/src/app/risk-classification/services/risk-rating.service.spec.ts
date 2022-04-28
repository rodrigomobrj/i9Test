import { TestBed } from '@angular/core/testing';

import { RiskRatingsService } from './risk-rating.service';

describe('RiskRatingsService', () => {
  let service: RiskRatingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RiskRatingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
