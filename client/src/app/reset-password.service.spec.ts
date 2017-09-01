import { TestBed, inject } from '@angular/core/testing';

import { ResetPasswordService } from './reset-password.service';

describe('ResetPasswordService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResetPasswordService]
    });
  });

  it('should ...', inject([ResetPasswordService], (service: ResetPasswordService) => {
    expect(service).toBeTruthy();
  }));
});
