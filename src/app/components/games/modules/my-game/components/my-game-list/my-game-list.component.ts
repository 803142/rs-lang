import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { first } from 'rxjs/operators';

import { Word } from 'src/app/common/models/word.model';
import { StatsService } from 'src/app/common/services/stats.service';
import { GameResult } from 'src/app/components/games/models/games.result.model';
import { LoadStatWords } from 'src/app/redux/actions/words.actions';
import { AppState } from 'src/app/redux/app.state';
import { selectGameList } from 'src/app/redux/selectors/listGame.selectors';
import { URL_BACK_SERVER } from 'src/app/shared/constants/url-constants';
import { StatisticGame } from '../../game-statistic.model';
@Component({
  selector: 'app-my-game-list',
  templateUrl: './my-game-list.component.html',
  styleUrls: ['./my-game-list.component.scss'],
})
export class MyGameListComponent implements OnInit {
  apiUrl = URL_BACK_SERVER.URL_BACK;

  words: Word[];

  solvedWords = new Set<Word>();

  unsolvedWords = new Set<Word>();

  changedGameList: Word[] = [];

  myGamesArray: Word[] = [];

  imagesArray: Word[] = [];

  wordsArray: Word[] = [];

  skipped = 0;

  wordsPerPage = 5;

  wordsPerPageDivinedCountIndex = 4;

  wordsCount = 0;

  amount: number;

  amountTotalWords = 0;

  countImageArrayLength = 0;

  score = 0;

  scorePerDividedWord = 10;

  tryCount = 0;

  maxTryCount = 4;

  dragPictureId: string;

  dropPictureId: string;

  sound = new Audio();

  scoreAudio = 'assets/sounds/score.mp3';

  tryAudio = 'assets/sounds/try.mp3';

  disabled = true;

  statistic: StatisticGame;

  countGoodAnswer = 0;

  bestSeries = [];

  countAllTries = 0;

  openResult = false;

  gameResult: GameResult[] = [];

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private store: Store<AppState>,
    private statsService: StatsService,
  ) {}

  ngOnInit() {
    this.store
      .select(selectGameList())
      .pipe(first())
      .subscribe((gameList) => {
        this.words = gameList;
        this.amount = gameList.length;
      });
    this.tryCount = 0;
    this.solvedWords = new Set<Word>();
    this.unsolvedWords = new Set<Word>();
    this.onNewWords();
    this.onChangeWords();
  }

  onChangeWords() {
    this.countImageArrayLength = 0;
    this.imagesArray = [];
    this.wordsArray = [];
    this.myGamesArray = this.changedGameList.slice(this.skipped, this.skipped + this.wordsPerPage);
    this.imagesArray.push(...this.myGamesArray);
    this.wordsArray.push(...this.myGamesArray);
    this.skipped += this.wordsPerPage;
    this.wordsArray.sort(() => Math.random() - 0.5);
    if (this.myGamesArray.length === 0) {
      this.onNewWords();
    }
  }

  onNewWords() {
    const randomWords = this.words.sort(() => Math.random() - 0.5);
    this.changedGameList = randomWords.slice(this.wordsCount, this.wordsCount + this.amount);
    this.wordsCount += this.amount;
    if (this.changedGameList.length === 0) {
      this.countGoodAnswer += 1;
      this.bestSeries.push(this.countGoodAnswer);
      this.getStatistic();
    }
  }

  addGameResult(data, result: boolean): void {
    this.gameResult.push({
      word: data.word,
      wordTranslate: data.wordTranslate,
      audio: data.audio,
      result,
    });
  }

  submitResult(ev: boolean): void {
    const path = ev ? 'games/my-game' : '/games';
    this.openResult = false;
    this.router.navigate([path]);
  }

  drop(event, dropPictureId: string) {
    this.dropPictureId = dropPictureId;
    if (this.dragPictureId !== dropPictureId) {
      this.unsolvedWords.add(event.item.data);
      this.addGameResult(event.item.data, false);
      this.playSoundTry();
      this.tryCount += 1;
      this.countAllTries += 1;
      if (this.tryCount > this.maxTryCount) {
        this.tryCount = 5;
        if (this.bestSeries.length === 0) {
          this.bestSeries.push(0);
        }
        this.getStatistic();
        this.openDialog();
        this.getStatWord();
      }
    } else {
      const elem = event.container.element.nativeElement.querySelector('.inside');
      elem.appendChild(event.item.element.nativeElement);
      this.solvedWords.add(event.item.data);
      this.addGameResult(event.item.data, true);
      this.playSoundScore();

      this.countImageArrayLength += 1;
      this.score += this.scorePerDividedWord;
      this.checkCountImageArrayLength();
      this.countGoodAnswer += 1;
      this.countAllTries += 1;
      this.bestSeries.push(this.countGoodAnswer);
      this.amountTotalWords += 1;
      if (this.amountTotalWords === this.amount) {
        this.getStatWord();
        this.getStatistic();
        this.openDialog();
      }
    }
  }

  checkCountImageArrayLength() {
    if (this.countImageArrayLength > this.wordsPerPageDivinedCountIndex) {
      this.onChangeWords();
    }
  }

  started(event, dragPictureId: string) {
    this.dragPictureId = dragPictureId;
  }

  noReturnPredicate() {
    return false;
  }

  playSoundScore() {
    this.sound.src = 'assets/sounds/score.mp3';
    this.sound.load();
    this.sound.play();
  }

  playSoundTry() {
    this.sound.src = 'assets/sounds/try.mp3';
    this.sound.load();
    this.sound.play();
  }

  getStatistic() {
    this.statsService.saveMyGameStats({
      learned: this.amount,
      tries: this.countAllTries,
      right: this.solvedWords.size,
      series: this.getMaxOfBestAnswers(this.bestSeries),
    });
  }

  getMaxOfBestAnswers(bestSeries) {
    return Math.max.apply(null, bestSeries);
  }

  openDialog() {
    this.openResult = true;
  }

  getStatWord() {
    this.unsolvedWords.forEach((el) => {
      this.store.dispatch(LoadStatWords({ word: el, error: true }));
    });
    this.solvedWords.forEach((el) => {
      this.store.dispatch(LoadStatWords({ word: el, error: false }));
    });
  }
}
