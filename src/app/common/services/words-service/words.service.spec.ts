import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { URL_BACK_SERVER } from 'src/app/shared/constants/url-constants';

import { Word } from '../../models/word.model';
import { WordsService } from './words.service';

const testWords: Word[] = [
  {
    _id: 'id1',
    page: 1,
    group: 1,
    word: 'word1',
    image: 'img1',
    audio: 'audio1',
    audioMeaning: 'audioMeaning1',
    audioExample: 'audioExaple1',
    textMeaning: 'textMeaning1',
    textExample: 'textExample1',
    transcription: 'transcription1',
    wordTranslate: 'wordTranslate1',
    textMeaningTranslate: 'textMeaningTranslate1',
    textExampleTranslate: 'textExampleTranslate1',
    userWord: {
      difficulty: 'easy',
      optional: {
        repeat: 1,
        failCount: 0,
      },
    },
  },
  {
    _id: 'id2',
    page: 2,
    group: 2,
    word: 'word2',
    image: 'img2',
    audio: 'audio2',
    audioMeaning: 'audioMeaning2',
    audioExample: 'audioExaple2',
    textMeaning: 'textMeaning2',
    textExample: 'textExample2',
    transcription: 'transcription2',
    wordTranslate: 'wordTranslate2',
    textMeaningTranslate: 'textMeaningTranslate2',
    textExampleTranslate: 'textExampleTranslate2',
    userWord: {
      difficulty: 'hard',
      optional: {
        repeat: 2,
        failCount: 1,
      },
    },
  },
];

// const testEmptyWords: Word[] = [];

describe('WordsService', () => {
  let service: WordsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule, StoreModule.forRoot({})],
      providers: [WordsService],
    });
    service = TestBed.inject(WordsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return words', () => {
    service.getWords().subscribe((res) => {
      expect(res).toEqual(testWords);
    });

    const req = httpMock.expectOne(`${URL_BACK_SERVER.URL_BACK}words?group=5&page=10`);
    expect(req.request.method).toEqual('GET');
    req.flush(testWords);

    //  httpMock.verify();
  });

  it('should return empty array', () => {
    service.getWords().subscribe((res) => {
      expect(res).toEqual([]);
    });

    const req = httpMock.expectOne(`${URL_BACK_SERVER.URL_BACK}words?group=5&page=10`);
    expect(req.request.method).toEqual('GET');
    req.flush([]);

    //   httpMock.verify();
  });
});
