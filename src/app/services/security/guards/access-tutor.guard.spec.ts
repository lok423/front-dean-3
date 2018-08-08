import { TestBed, async, inject } from '@angular/core/testing';

import { AccessTutorGuard } from './access-tutor.guard';

describe('AccessGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AccessGuard]
    });
  });

  it('should ...', inject([AccessGuard], (guard: AccessGuard) => {
    expect(guard).toBeTruthy();
  }));
});
