import { TestBed, inject } from '@angular/core/testing';

import { ChatbotService } from './chatbot.service';

describe('ChatbotService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChatbotService]
    });
  });

  it('should ...', inject([ChatbotService], (service: ChatbotService) => {
    expect(service).toBeTruthy();
  }));
});
