import { TestBed, inject } from '@angular/core/testing';

import { DisplayValidatorExampleService } from './display-validator-example.service';

describe('DisplayValidatorExampleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DisplayValidatorExampleService]
    });
  });

  it('should be created', inject([DisplayValidatorExampleService], (service: DisplayValidatorExampleService) => {
    expect(service).toBeTruthy();
  }));
});
