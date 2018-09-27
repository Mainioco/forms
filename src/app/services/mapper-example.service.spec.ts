import { TestBed, inject } from '@angular/core/testing';

import { MapperExampleService } from './mapper-example.service';

describe('MapperExampleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MapperExampleService]
    });
  });

  it('should be created', inject([MapperExampleService], (service: MapperExampleService) => {
    expect(service).toBeTruthy();
  }));
});
