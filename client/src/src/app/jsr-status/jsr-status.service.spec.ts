import { TestBed, inject } from '@angular/core/testing';
import { JsrStatusService } from './jsr-status.service';

describe('JsrStatusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JsrStatusService]
    });
  });

  it('should ...', inject([JsrStatusService], (service: JsrStatusService) => {
    expect(service).toBeTruthy();
  }));
});
