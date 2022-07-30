import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { GamesService } from './games.service';

const testGames = [
  {
    id: 11,
    name: 'Name1',
    nameRU: 'Игра1',
    img: 'img1.png',
  },
  {
    id: 12,
    name: 'Name2',
    nameRU: 'Игра2',
    img: 'img2.png',
  },
];

describe('GamesService', () => {
  let service: GamesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GamesService],
    });
    service = TestBed.inject(GamesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return games', () => {
    service.getGames().subscribe((res) => {
      expect(res).toEqual(testGames);
    });

    const req = httpMock.expectOne('assets/data/games-data.json');
    expect(req.request.method).toEqual('GET');
    req.flush(testGames);

    httpMock.verify();
  });
});
