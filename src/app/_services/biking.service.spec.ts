import { TestBed } from '@angular/core/testing';

import { BikingService } from './biking.service';

describe('BikingService', () => {
  let service: BikingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BikingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
