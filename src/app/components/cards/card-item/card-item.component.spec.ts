import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { ISettings } from 'src/app/common/models/settings.model';

import { Word } from 'src/app/common/models/word.model';
import { CardItemComponent } from './card-item.component';

const wordMock: Word = {
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
};

const colorMock = [5, 2];

const setMock: ISettings = {
  wordsPerDay: 20,
  optional: {
    displayTranslation: true,
    displayHandlingButtons: true,
    setGame: {
      groupAmount: 2,
      groupLevel: 1,
      hideRequired: false,
    },
  },
  id: 555,
};

describe('CardItemComponent', () => {
  let component: CardItemComponent;
  let fixture: ComponentFixture<CardItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardItemComponent],
      imports: [StoreModule.forRoot({})],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardItemComponent);
    component = fixture.componentInstance;
    component.word = wordMock;
    component.color = colorMock;
    component.set = setMock;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
