import { TestBed, inject } from '@angular/core/testing';

import { ChangePasswordService } from './change-password.service';

describe('ChangePasswordService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChangePasswordService]
    });
  });

  it('should ...', inject([ChangePasswordService], (service: ChangePasswordService) => {
    expect(service).toBeTruthy();
  }));
});
