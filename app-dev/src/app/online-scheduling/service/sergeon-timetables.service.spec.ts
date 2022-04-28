import { TestBed } from '@angular/core/testing';

import { SurgeonTimetablesService } from './surgeon-timetables.service';

describe('SergeonTimetablesService', () => {
  let service: SurgeonTimetablesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SurgeonTimetablesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
