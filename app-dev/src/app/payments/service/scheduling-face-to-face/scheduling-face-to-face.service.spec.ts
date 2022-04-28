import { TestBed } from '@angular/core/testing';

import { SchedulingFaceToFaceService } from './scheduling-face-to-face.service';

describe('SchedulingFaceToFaceService', () => {
  let service: SchedulingFaceToFaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SchedulingFaceToFaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
