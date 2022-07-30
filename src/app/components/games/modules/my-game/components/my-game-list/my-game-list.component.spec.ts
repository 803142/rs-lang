import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AggregatedWordsRedux } from 'src/app/common/models/aggregatedWords.model';

import { Word } from 'src/app/common/models/word.model';
import { AppState } from 'src/app/redux/app.state';
import { MyGameListComponent } from './my-game-list.component';

const wordsMock: Word[] = [
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

const wordsReduxMock: AggregatedWordsRedux[] = [
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
  words: wordsReduxMock,
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

describe('MyGameListComponent', () => {
  let component: MyGameListComponent;
  let fixture: ComponentFixture<MyGameListComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyGameListComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MatDialogModule,
        StoreModule.forRoot({}),
      ],
      providers: [
        provideMockStore({ initialState }),
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyGameListComponent);
    component = fixture.componentInstance;
    component.words = wordsMock;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
