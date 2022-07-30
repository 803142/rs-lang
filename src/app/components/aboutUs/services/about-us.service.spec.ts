import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Word } from 'src/app/common/models/word.model';

import { AboutUsService } from './about-us.service';

const gameListMock: Word[] = [
  {
    _id: 'string',
    page: 2,
    group: 2,
    word: 'string',
    image: 'string',
    audio: 'string',
    audioMeaning: 'string',
    audioExample: 'string',
    textMeaning: 'string',
    textExample: 'string',
    transcription: 'string',
    wordTranslate: 'string',
    textMeaningTranslate: 'string',
    textExampleTranslate: 'string',
    userWord: {
      difficulty: 'hard',
      optional: {
        repeat: 5,
        failCount: 2,
      },
    },
  },
];

describe('AboutUsService', () => {
  let service: AboutUsService;
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore({ initialState: { gameList: { gameListMock } } })],
    });
    service = TestBed.inject(AboutUsService);
    store = TestBed.inject(MockStore);
    store.setState({});
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
