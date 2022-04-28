import { TestBed } from '@angular/core/testing';

import { ScheduledPerformedLocalStorageService } from './scheduled-performed-local-storage.service';

describe('ScheduledPerformedLocalStorageService', () => {
  let service: ScheduledPerformedLocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScheduledPerformedLocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
