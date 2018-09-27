import { TestBed, inject } from '@angular/core/testing';

import { QuestionComponentFactoryService } from './question-component-factory.service';

describe('QuestionComponentFactoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuestionComponentFactoryService]
    });
  });

  it('should be created', inject([QuestionComponentFactoryService], (service: QuestionComponentFactoryService) => {
    expect(service).toBeTruthy();
  }));
});
