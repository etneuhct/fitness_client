import { TestBed } from '@angular/core/testing';

import { BodyShapeService } from './body-shape.service';

describe('BodyShapeService', () => {
  let service: BodyShapeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BodyShapeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
