import { TestBed } from '@angular/core/testing';

import { SchedulingLocalStorageService } from './scheduling-local-storage.service';

describe('FaceToFaceSchedulingLocalStorageService', () => {
  let service: SchedulingLocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SchedulingLocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
