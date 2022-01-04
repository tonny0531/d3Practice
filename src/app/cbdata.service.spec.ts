import { TestBed } from '@angular/core/testing';

import { CbdataService } from './cbdata.service';

describe('CbdataService', () => {
  let service: CbdataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CbdataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
