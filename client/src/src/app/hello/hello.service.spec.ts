import { TestBed, inject } from '@angular/core/testing';

import { HelloService } from './hello.service';

describe('HelloService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HelloService]
    });
  });

  it('should ...', inject([HelloService], (service: HelloService) => {
    expect(service).toBeTruthy();
  }));
});
