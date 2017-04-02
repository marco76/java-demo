import { TestBed, inject } from '@angular/core/testing';

import { BvService } from './bv.service';

describe('BvService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BvService]
    });
  });

  it('should ...', inject([BvService], (service: BvService) => {
    expect(service).toBeTruthy();
  }));
});
