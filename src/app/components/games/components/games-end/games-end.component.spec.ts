import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableModule } from '@angular/material/table';

import { Word } from 'src/app/common/models/word.model';
import { GamesEndComponent } from './games-end.component';

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

describe('GameEndComponent', () => {
  let component: GamesEndComponent;
  let fixture: ComponentFixture<GamesEndComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GamesEndComponent],
      imports: [MatTableModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GamesEndComponent);
    component = fixture.componentInstance;
    component.words = wordsMock;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
