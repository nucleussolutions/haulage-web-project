import { TestBed, inject } from '@angular/core/testing';

import { ForgetPasswordService } from './forget-password.service';

describe('ForgetPasswordService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ForgetPasswordService]
    });
  });

  it('should ...', inject([ForgetPasswordService], (service: ForgetPasswordService) => {
    expect(service).toBeTruthy();
  }));
});
