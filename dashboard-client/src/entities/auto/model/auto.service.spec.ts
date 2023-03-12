import { TestBed } from '@angular/core/testing';

import { AutoService } from './auto.service';

describe('AutoService', () => {
  let service: AutoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
