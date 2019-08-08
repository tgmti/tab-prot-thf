import { TestBed } from '@angular/core/testing';

import { LiteralService } from './literal.service';

describe('LiteralService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LiteralService = TestBed.get(LiteralService);
    expect(service).toBeTruthy();
  });
});
