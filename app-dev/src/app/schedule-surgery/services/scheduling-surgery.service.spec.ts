import { TestBed } from '@angular/core/testing';

import { SchedulingSurgeryService } from './scheduling-surgery.service';

describe('ScheduleSurgeryService', () => {
  let service: SchedulingSurgeryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SchedulingSurgeryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
