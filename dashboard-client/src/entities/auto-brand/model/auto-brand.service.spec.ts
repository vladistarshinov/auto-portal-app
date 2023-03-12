import { TestBed } from '@angular/core/testing';

import { AutoBrandService } from './auto-brand.service';

describe('AutoBrandService', () => {
  let service: AutoBrandService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutoBrandService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
