import { TestBed, inject } from '@angular/core/testing';

import { FormLayoutService } from './form-layout.service';

describe('FormLayoutService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormLayoutService]
    });
  });

  it('should be created', inject([FormLayoutService], (service: FormLayoutService) => {
    expect(service).toBeTruthy();
  }));
});
