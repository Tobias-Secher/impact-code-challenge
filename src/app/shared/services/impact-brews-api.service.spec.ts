import { TestBed } from '@angular/core/testing';

import { ImpactBrewsApiService } from './impact-brews-api.service';

describe('ImpactBrewsApiService', () => {
  let service: ImpactBrewsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImpactBrewsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
