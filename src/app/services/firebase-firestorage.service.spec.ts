import { TestBed } from '@angular/core/testing';

import { FirebaseFirestorageService } from './firebase-firestorage.service';

describe('FirebaseFirestorageService', () => {
  let service: FirebaseFirestorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseFirestorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
