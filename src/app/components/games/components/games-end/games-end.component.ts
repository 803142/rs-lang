import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Word } from 'src/app/common/models/word.model';
import { URL_BACK_SERVER } from 'src/app/shared/constants/url-constants';
import { GameResult } from '../../models/games.result.model';

@Component({
  selector: 'app-games-end',
  templateUrl: './games-end.component.html',
  styleUrls: ['./games-end.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GamesEndComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() words: Word[];

  @Input() gameResult: GameResult[] = [];

  @Input() countOfBadResults = 5;

  @Input() light = false;

  @Output() submitResult = new EventEmitter();

  displayedColumns: string[] = ['word', 'wordTranslate', 'result', 'audio'];

  dataSource;

  subTitle = '';

  audio: HTMLAudioElement;

  play = false;

  submitted = false;

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.gameResult);
    this.dataSource.sort = this.sort;
    this.calcStatistics();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy() {
    if (!this.submitted) this.playAgain();
  }

  playAgain(): void {
    this.submitted = true;
    this.submitResult.emit(true);
  }

  cancel(): void {
    this.submitted = true;
    this.submitResult.emit(false);
  }

  playWordAudio(audio: string): void {
    if (this.audio) this.audio.pause();
    this.audio = new Audio(`${URL_BACK_SERVER.URL_BACK + audio}`);
    this.audio.play();
  }

  private calcStatistics(): void {
    let right = 0;
    this.gameResult.forEach((el) => {
      if (el.result) {
        right += 1;
      }
    });
    if (right >= this.words.length - this.countOfBadResults) {
      this.subTitle += `Отлично! Вы знаете ${right} из ${this.gameResult.length} слов.`;
    } else {
      this.subTitle += `Тренируйтесь еще. Вы знаете только ${right} из ${this.gameResult.length} слов.`;
    }
  }
}
