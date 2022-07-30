import { TestBed } from '@angular/core/testing';

import { GameSavannahService } from './game-savannah.service';

describe('GameSavannahService', () => {
  let service: GameSavannahService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameSavannahService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
