import { TestBed, inject } from '@angular/core/testing';

import { LibraryLoggerService } from './library-logger.service';

describe('LibraryLoggerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LibraryLoggerService]
    });
  });

  it('should be created', inject([LibraryLoggerService], (service: LibraryLoggerService) => {
    expect(service).toBeTruthy();
  }));
});
