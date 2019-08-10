import { TestBed } from '@angular/core/testing';

import { IndexesService } from './indexes.service';

describe('IndexesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IndexesService = TestBed.get(IndexesService);
    expect(service).toBeTruthy();
  });
});
