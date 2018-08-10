import { TestBed, inject } from '@angular/core/testing';

import { AuthchatService } from './authchat.service';

describe('AuthchatService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthchatService]
    });
  });

  it('should be created', inject([AuthchatService], (service: AuthchatService) => {
    expect(service).toBeTruthy();
  }));
});
