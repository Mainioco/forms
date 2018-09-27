import { TestBed, inject } from '@angular/core/testing';

import { QuestionDisplayValidatorService } from './question-display-validator.service';

describe('QuestionDisplayValidatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuestionDisplayValidatorService]
    });
  });

  it('should be created', inject([QuestionDisplayValidatorService], (service: QuestionDisplayValidatorService) => {
    expect(service).toBeTruthy();
  }));
});
