import { TestBed } from '@angular/core/testing';

import { SchedulingFacetofaceService } from './scheduling-facetoface.service';

describe('SchedulingFacetofaceService', () => {
  let service: SchedulingFacetofaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SchedulingFacetofaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
