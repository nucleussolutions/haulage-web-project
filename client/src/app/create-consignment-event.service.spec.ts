import { TestBed, inject } from '@angular/core/testing';

import { CreateConsignmentEventService } from './create-consignment-event.service';

describe('CreateConsignmentEventService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreateConsignmentEventService]
    });
  });

  it('should be created', inject([CreateConsignmentEventService], (service: CreateConsignmentEventService) => {
    expect(service).toBeTruthy();
  }));
});
