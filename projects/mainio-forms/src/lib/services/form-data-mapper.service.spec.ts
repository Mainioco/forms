import { TestBed, inject } from '@angular/core/testing';

import { FormDataMapperService } from './form-data-mapper.service';

describe('FormDataMapperService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormDataMapperService]
    });
  });

  it('should be created', inject([FormDataMapperService], (service: FormDataMapperService) => {
    expect(service).toBeTruthy();
  }));
});
