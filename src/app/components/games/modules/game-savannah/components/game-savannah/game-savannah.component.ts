import { Component, OnDestroy, OnInit } from '@angular/core';
import { Word } from 'src/app/common/models/word.model';
import { Subscription } from 'rxjs';
import { selectGameList } from 'src/app/redux/selectors/listGame.selectors';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/redux/app.state';
import { MatDialog } from '@angular/material/dialog';
import { StatsService } from 'src/app/common/services/stats.service';
import { IGame } from 'src/app/common/models/stats.model';
import { Router } from '@angular/router';
import { GamesBannerData } from 'src/app/components/games/models/games-start-banner.model';
import { GameResult } from 'src/app/components/games/models/games.result.model';
import { first } from 'rxjs/operators';
import { LoadStatWords } from 'src/app/redux/actions/words.actions';
import { GameSavannahLangs } from '../../models/game-savannah-langs.enum';
import { GameSavannahStatus } from '../../models/game-savannah-status.model';
import { GameSavannahService } from '../../services/game-savannah.service';
import { GameSavannahDialogComponent } from '../game-savannah-dialog/game-savannah-dialog.component';

@Component({
  selector: 'app-game-savannah',
  templateUrl: './game-savannah.component.html',
  styleUrls: ['./game-savannah.component.scss'],
})
export class GameSavannahComponent implements OnDestroy, OnInit {
  private timerId: ReturnType<typeof setTimeout>;

  langs: string[] = Object.keys(GameSavannahLangs).map((key) => GameSavannahLangs[key]);

  subscription!: Subscription;

  gameSavannahStatus: GameSavannahStatus = {
    errors: 0,
    sound: true,
    currentLang: GameSavannahLangs.en,
  };

  play = false;

  openStatistics = false;

  paused = true;

  words: Word[] = [];

  gameResult: GameResult[] = [];

  currentWord: string;

  currentWordId: number;

  answers: string[];

  animationTime = 5;

  isPaused = false;

  startTime: number;

  gameSavannahStatistic: IGame = {
    learned: 0,
    tries: 0,
    right: 0,
    series: 0,
  };

  currentSeries = 0;

  banner: GamesBannerData = {
    title: 'Саванна',
    subtitle:
      'Мини-игра «Саванна» - это тренировка по переводу пассивного изученного словаря в активную стадию.',
  };

  sound = new Audio();

  scoreAudio = 'assets/sounds/score.mp3';

  tryAudio = 'assets/sounds/try.mp3';

  constructor(
    private gameSavannahService: GameSavannahService,
    private store: Store<AppState>,
    public dialog: MatDialog,
    private statsService: StatsService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.store
      .select(selectGameList())
      .pipe(first())
      .subscribe((words) => {
        this.words = words;
      });
    this.resetStatistics();
    this.subscription = this.gameSavannahService.data.subscribe((data) => {
      this.gameSavannahStatus = data;
    });
  }

  ngOnDestroy(): void {
    this.setStatistics();
    this.setDefaultData();
    this.subscription.unsubscribe();
  }

  playSound(valid: boolean): void {
    if (this.gameSavannahStatus.sound) {
      this.sound.src = valid ? this.scoreAudio : this.tryAudio;
      this.sound.load();
      this.sound.play();
    }
  }

  setStatistics(): void {
    this.gameSavannahStatistic.learned = this.words.length;
    this.gameSavannahStatistic.tries = this.gameResult.length;
    this.gameResult.forEach((el) => {
      if (el.result) this.gameSavannahStatistic.right += 1;
    });
    this.statsService.saveSavannaStats(this.gameSavannahStatistic);
  }

  resetStatistics(): void {
    ['learned', 'tries', 'right', 'series'].forEach((key) => {
      this.gameSavannahStatistic[key] = 0;
    });
    this.currentSeries = 0;
  }

  clearTimer(): void {
    if (this.timerId) clearTimeout(this.timerId);
  }

  changeGameSavannahStatus(data: GameSavannahStatus): void {
    this.gameSavannahService.updateGameStatus(data);
  }

  changeLang(key: string): void {
    this.gameSavannahStatus.currentLang = GameSavannahLangs[key];
    this.gameSavannahService.updateGameStatus(this.gameSavannahStatus);
  }

  setDefaultData(): void {
    this.play = true;
    this.openStatistics = false;
    this.paused = false;
    this.clearTimer();
  }

  startGame(): void {
    this.setDefaultData();
    this.gameSavannahStatus.wordsCount = this.words.length;
    this.gameSavannahService.updateGameStatus(this.gameSavannahStatus);
    this.playWord(0);
  }

  submitResult(event: boolean): void {
    if (event) {
      this.setDefaultData();
      this.restartGame();
    } else {
      this.router.navigate(['/games']);
    }
  }

  restartGame(): void {
    this.gameSavannahStatus.errors = 0;
    this.gameSavannahStatus.progressError = '0%';
    this.gameSavannahStatus.currentCounts = 0;
    this.gameSavannahStatus.progressAll = '0%';
    this.gameSavannahService.updateGameStatus(this.gameSavannahStatus);
    this.play = false;
    this.openStatistics = false;
    this.paused = true;
    this.words = this.shuffle(this.words);
  }

  openRestartGameDialog(): void {
    this.isPaused = true;
    this.clearTimer();
    const delta = Date.now() - this.startTime;
    const dialogRef = this.dialog.open(GameSavannahDialogComponent, {
      width: '450px',
      height: 'auto',
      data: {
        callBackTrue: () => this.restartGame(),
      },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.isPaused = false;
      this.startTimer(delta + 1000);
    });
  }

  playWord(id: number): void {
    this.clearTimer();
    if (id >= this.words.length || this.gameSavannahStatus.errors >= 5) {
      this.openStatistics = true;
      this.play = false;
    } else {
      this.paused = false;
      this.currentWordId = id;
      this.currentWord = this.words[id][this.langKey()];
      this.answers = this.setAnswersWords(id);
      this.startTimer();
    }
  }

  startTimer(time = (this.animationTime + 2) * 1000): void {
    this.startTime = Date.now();
    this.timerId = setTimeout(() => {
      this.checkAnswer('');
    }, time);
  }

  setAnswersWords(id: number): string[] {
    const res = [this.words[id][this.answersKey()]];
    while (res.length < 4) {
      const ind = this.getRandomInt(this.words.length);
      if (ind !== id && !res.some((el) => el === this.words[ind][this.answersKey()])) {
        res.push(this.words[ind][this.answersKey()]);
      }
    }
    return this.shuffle(res);
  }

  getAnswer(): string {
    return this.words[this.currentWordId][this.answersKey()];
  }

  setWordStatistic(data: boolean): void {
    this.playSound(data);
    if (!this.gameResult.some((el) => el.word === this.words[this.currentWordId].word)) {
      this.gameResult.push({
        word: this.words[this.currentWordId].word,
        wordTranslate: this.words[this.currentWordId].wordTranslate,
        result: data,
        audio: this.words[this.currentWordId].audio,
      });
    } else {
      const ind = this.gameResult.findIndex(
        (el) => el.word === this.words[this.currentWordId].word,
      );
      this.gameResult[ind].result = data;
    }
  }

  checkAnswer(answer: string) {
    if (this.timerId) {
      this.paused = true;
      this.gameSavannahStatistic.tries += 1;
      if (answer !== this.getAnswer()) {
        this.store.dispatch(LoadStatWords({ word: this.words[this.currentWordId], error: true }));
        this.setWordStatistic(false);
        this.gameSavannahStatus.errors += 1;
        this.currentSeries = 0;
      } else {
        this.store.dispatch(LoadStatWords({ word: this.words[this.currentWordId], error: false }));
        this.setWordStatistic(true);
        this.gameSavannahStatus.currentCounts += 1;
        this.gameSavannahStatistic.right += 1;
        this.currentSeries += 1;
        if (this.currentSeries >= this.gameSavannahStatistic.series) {
          this.gameSavannahStatistic.series = this.currentSeries;
        }
      }
      this.updateStatus();
      const timerId = setTimeout(() => {
        this.playWord(this.currentWordId + 1);
        clearTimeout(timerId);
      }, (this.animationTime + 5) * 100);
    }
  }

  updateStatus() {
    this.gameSavannahStatus.progressError = `${
      (this.gameSavannahStatus.errors / this.gameSavannahStatus.wordsCount) * 100
    }%`;
    this.gameSavannahStatus.progressAll = `${
      ((this.gameSavannahStatus.errors + this.gameSavannahStatus.currentCounts) /
        this.gameSavannahStatus.wordsCount) *
      100
    }%`;
    this.gameSavannahService.updateGameStatus(this.gameSavannahStatus);
  }

  private getRandomInt(max: number): number {
    return Math.floor(Math.random() * Math.floor(max));
  }

  private langKey(): string {
    return this.gameSavannahStatus.currentLang === 'en' ? 'word' : 'wordTranslate';
  }

  private answersKey(): string {
    return this.gameSavannahStatus.currentLang === 'ru' ? 'word' : 'wordTranslate';
  }

  private shuffle(arr: any[]): any[] {
    const res = [...arr];
    let j;
    for (let i = res.length - 1; i > 0; i -= 1) {
      j = Math.floor(Math.random() * (i + 1));
      [res[j], res[i]] = [res[i], res[j]];
    }
    return res;
  }
}
