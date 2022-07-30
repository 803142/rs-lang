import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { GamesSprintService } from './games-sprint.service';

describe('GamesSprintService', () => {
  let service: GamesSprintService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(GamesSprintService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
