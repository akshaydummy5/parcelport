import { TestBed, inject } from '@angular/core/testing';

import { ShipmentsService } from './shipments.service';

describe('ShipmentsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShipmentsService]
    });
  });

  it('should be created', inject([ShipmentsService], (service: ShipmentsService) => {
    expect(service).toBeTruthy();
  }));
});
