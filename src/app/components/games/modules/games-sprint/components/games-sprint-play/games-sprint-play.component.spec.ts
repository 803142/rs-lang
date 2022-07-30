import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AggregatedWordsRedux } from 'src/app/common/models/aggregatedWords.model';
import { AppState } from 'src/app/redux/app.state';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { GamesSprintPlayComponent } from './games-sprint-play.component';

const wordsMock: AggregatedWordsRedux[] = [
  {
    paginatedResults: [
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
    ],
    totalCount: [{ 0: 5, 1: 6, 2: 4, 3: 4, 4: 8, 5: 1 }],
  },
];

const initialState: AppState = {
  words: wordsMock,
  expectation: true,
  login: {
    isAuthenticated: true,
    user: {
      message: 'string',
      token: 'string',
      refreshToken: 'string',
      userId: 'string',
      name: 'string',
      photo: 'string',
    },
    errorMessage: 'string',
  },
  dictionary: {
    paginatedResults: [
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
    ],
    totalCount: 10,
    errorMessage: 'string',
  },
  settings: {
    wordsPerDay: 10,
    optional: {
      displayTranslation: true,
      displayHandlingButtons: true,
      setGame: {
        groupAmount: 5,
        groupLevel: 4,
        hideRequired: true,
      },
    },
    id: 8,
  },
  stats: {
    shortTerm: {
      date: 20210415,
      savanna: {
        learned: 52,
        tries: 52,
        right: 20,
        series: 8,
      },
      sprint: {
        learned: 60,
        tries: 68,
        right: 40,
        series: 10,
      },
      audio: {
        learned: 30,
        tries: 35,
        right: 30,
        series: 25,
      },
      myGame: {
        learned: 25,
        tries: 25,
        right: 20,
        series: 5,
      },
    },
    longTerm: [
      {
        date: 20210415,
        learned: 250,
      },
      {
        date: 20210414,
        learned: 50,
      },
    ],
  },
  gameList: [
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
    {
      _id: 'string2',
      page: 5,
      group: 4,
      word: 'string2',
      image: 'string2',
      audio: 'string2',
      audioMeaning: 'string2',
      audioExample: 'string2',
      textMeaning: 'string2',
      textExample: 'string2',
      transcription: 'string2',
      wordTranslate: 'string2',
      textMeaningTranslate: 'string2',
      textExampleTranslate: 'string2',
      userWord: {
        difficulty: 'hard',
        optional: {
          repeat: 3,
          failCount: 2,
        },
      },
    },
  ],
};

describe('GamesSprintPlayComponent', () => {
  let component: GamesSprintPlayComponent;
  let fixture: ComponentFixture<GamesSprintPlayComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GamesSprintPlayComponent],
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        StoreModule.forRoot({}),
      ],
      providers: [provideMockStore({ initialState })],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
    store = TestBed.inject(MockStore);
    // store.setState({ gameList: {}});
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GamesSprintPlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
