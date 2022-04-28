import { TestBed } from '@angular/core/testing';

import { ScheduledDetailStorageService } from './scheduled-detail-storage.service';

describe('ScheduledDetailStorageService', () => {
  let service: ScheduledDetailStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScheduledDetailStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
