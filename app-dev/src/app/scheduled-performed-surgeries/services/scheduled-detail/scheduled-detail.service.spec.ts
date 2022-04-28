import { TestBed } from '@angular/core/testing';

import { ScheduledDetailService } from './scheduled-detail.service';

describe('ScheduledDetailService', () => {
  let service: ScheduledDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScheduledDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
