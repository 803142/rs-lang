import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { Word } from 'src/app/common/models/word.model';
import { GeneratorShuffleArrayService } from 'src/app/common/services/generator-shuffle-array.service';
import { selectGameList } from 'src/app/redux/selectors/listGame.selectors';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/redux/app.state';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { LoadStatWords } from 'src/app/redux/actions/words.actions';
import { first } from 'rxjs/operators';
import { StatsService } from 'src/app/common/services/stats.service';
import { IGame } from 'src/app/common/models/stats.model';
import { GameResult } from 'src/app/components/games/models/games.result.model';
import { Router } from '@angular/router';
import { CssConstants } from '../../../../../../shared/constants/css-constants';
import { DataConstants } from '../../../../../../shared/constants/data-constants';
import { GamesSprintService } from '../../services/games-sprint.service';

const wordsQuantityPerCard = 1;

@Component({
  selector: 'app-games-sprint-play',
  animations: [
    trigger('changeButton', [
      state(
        'hide',
        style({
          opacity: 0,
        }),
      ),
      state(
        'show',
        style({
          opacity: 1,
        }),
      ),
      transition('hide => show', [animate('1s')]),
      transition('show => hide', [animate('0.5s')]),
    ]),
  ],
  templateUrl: './games-sprint-play.component.html',
  styleUrls: ['./games-sprint-play.component.scss'],
  providers: [GamesSprintService],
})
export class GamesSprintPlayComponent implements OnInit, OnDestroy {
  cols = CssConstants.materialColumnsNumberMiddle;

  rowHeight = CssConstants.materialRowHeightSmall;

  words$: Observable<Word[]>;

  words: Word[] = [];

  wordsAll: Word[] = [];

  wordsCorrect: Word[] = [];

  wordsInCorrect: Word[] = [];

  wordsUniquePlayed = new Set();

  wordsInCard: Word[] = [];

  wordsNew: Word[] = [];

  translations: Word[] = [];

  word: Word;

  wordInCard: Word;

  translation: Word;

  mistake: boolean;

  score = 0;

  deltaInScore = DataConstants.deltaInScore;

  responseEndGame: IGame;

  countTries = 0;

  countTrue = 0;

  countTrueSeries: number[] = [];

  countDown;

  countHelp = 0;

  counter = 60;

  audio = new Audio('assets/sounds/tick.mp3');

  end = false;

  play = true;

  start = false;

  isHideFalse = false;

  isHideTrue = false;

  gameResult: GameResult[] = [];

  constructor(
    private gamesSprintService: GamesSprintService,
    public generatorShuffleArrayService: GeneratorShuffleArrayService,
    private location: Location,
    private store: Store<AppState>,
    private statsService: StatsService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.store
      .select(selectGameList())
      .pipe(first())
      .subscribe((words) => {
        this.wordsAll = words;
        this.words = this.wordsAll.slice();
        this.setDifferentWordAndTranslation();
      });
  }

  ngOnDestroy() {
    this.score = 0;
    this.deltaInScore = 10;
    this.play = false;
    this.end = false;
    this.start = false;
    if (this.countDown) {
      this.countDown.unsubscribe();
    }
  }

  onStart() {
    this.countDown = this.gamesSprintService.getCounter(DataConstants.tick).subscribe(() => {
      this.playAudio();
      if (this.counter > 0) {
        this.counter -= 1;
      } else {
        document.removeEventListener('keydown', this.keyPressAction);
        this.stopGame();
      }
    });
    this.start = true;
    document.addEventListener('keydown', this.keyPressAction.bind(this));
  }

  playAudio() {
    this.audio.load();
    this.audio.play();
  }

  pauseAudio() {
    this.audio.play().then(() => {
      this.audio.pause();
      this.audio.currentTime = 0;
    });
  }

  setWord() {
    if (this.words.length) {
      this.wordsInCard = this.setRandomWord(this.words.length, wordsQuantityPerCard).map(
        (number) => this.words[number],
      );
    } else {
      document.removeEventListener('keydown', this.keyPressAction);
      this.stopGame();
    }
    this.words = this.words.filter((word) => !this.wordsInCard.includes(word));
    if (this.wordsInCard.length === 1) {
      [this.wordInCard] = this.wordsInCard;
    }
  }

  setSameWordAndTranslation() {
    this.setWord();
    this.translations = this.wordsInCard;
    if (this.translations.length === 1) {
      [this.translation] = this.translations;
    }
  }

  setDifferentWordAndTranslation() {
    this.setWord();
    this.translations = this.setRandomWord(this.wordsAll.length, wordsQuantityPerCard).map(
      (number) => this.wordsAll[number],
    );
    if (this.translations.length === 1) {
      [this.translation] = this.translations;
    }
  }

  setRandomWord(length: number, number: number): number[] {
    return this.generatorShuffleArrayService.getRandomNumbers(length, number);
  }

  onAgree(ifAgree) {
    this.mistake = this.gamesSprintService.compareWordAndTranslation(
      this.wordInCard,
      this.translation,
    );
    if (ifAgree) {
      this.mistake = !this.mistake;
    }
    this.countTries += 1;
    this.wordsUniquePlayed.add(this.wordInCard);
    if (!this.mistake) {
      this.store.dispatch(LoadStatWords({ word: this.wordInCard, error: false }));
      this.wordsCorrect.push(this.wordInCard);

      this.countTrue += 1;
      this.countScore();
      (document.querySelector('div.score') as HTMLElement).style.color = CssConstants.colorGreen;
    } else {
      this.store.dispatch(LoadStatWords({ word: this.wordInCard, error: true }));
      this.wordsInCorrect.push(this.wordInCard);

      this.countTrueSeries.push(this.countTrue);
      this.countTrue = 0;
      (document.querySelector('div.score') as HTMLElement).style.color = CssConstants.colorRed;
      this.deltaInScore = DataConstants.deltaInScore;
    }
    this.addGameResult(this.wordInCard, !this.mistake);
    const randomNumbers = this.setRandomWord(
      DataConstants.wordsPerMinute,
      DataConstants.trueWordsPerMinute,
    );
    if (randomNumbers.includes(this.countTries)) {
      this.setSameWordAndTranslation();
    } else {
      this.setDifferentWordAndTranslation();
    }
    this.isHideFalse = false;
    this.isHideTrue = false;
  }

  addGameResult(data, result: boolean): void {
    this.gameResult.push({
      word: data.word,
      wordTranslate: data.wordTranslate,
      audio: data.audio,
      result,
    });
  }

  submitResult(event: boolean): void {
    this.end = false;
    if (event) {
      this.location.back();
      this.start = true;
    } else {
      this.router.navigate(['/games']);
    }
  }

  countScore() {
    if ((this.countTrue + 2) % 3 === 0 && this.countTrue !== 1) {
      this.deltaInScore *= 2;
    }
    this.score += this.deltaInScore;
  }

  onHelp() {
    this.mistake = this.gamesSprintService.compareWordAndTranslation(
      this.wordInCard,
      this.translation,
    );
    if (this.mistake && this.countHelp < 3) {
      this.isHideFalse = !this.isHideFalse;
    } else if (this.countHelp < 3) {
      this.isHideTrue = !this.isHideTrue;
    }
    this.countHelp += 1;
  }

  keyPressAction(event: KeyboardEvent): void {
    if (this.start) {
      if (+event.key === 1) {
        this.onAgree(true);
      } else if (+event.key === 2) {
        this.onAgree(false);
      } else if (+event.key === 3) {
        this.onHelp();
      }
    }
  }

  stopGame() {
    document.removeEventListener('keydown', this.keyPressAction);
    this.pauseAudio();
    this.play = false;
    this.end = true;
    this.start = false;
    this.countDown.unsubscribe();
    this.responseEndGame = {
      learned: this.wordsUniquePlayed.size,
      tries: this.countTries,
      right: this.countTrueSeries.reduce((accum, value) => accum + value, 0),
      series: Math.max(...this.countTrueSeries),
    };
    this.statsService.saveSprintStats(this.responseEndGame);
  }

  goBack(): void {
    this.location.back();
  }
}
