import { Observable } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { GameModel } from 'src/app/common/models/games.model';
import { GamesService } from 'src/app/common/services/games.service';
import { Word } from 'src/app/common/models/word.model';
import { gameWordsList } from 'src/app/redux/actions/listGame.actions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/redux/app.state';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss'],
})
export class ButtonsComponent implements OnInit {
  @Input() color: number[];

  @Input() words: Word[];

  games$: Observable<GameModel[]>;

  constructor(private gamesService: GamesService, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.games$ = this.gamesService.getGames();
  }

  colorRGB(a = 0.3): string {
    return `rgba(${[...this.color, a].join()})`;
  }

  addGameList() {
    this.store.dispatch(gameWordsList({ Words: this.words }));
  }

  notEnoughWords(): boolean {
    return this.words.length < 20;
  }

  ButtonsTitle(): string {
    return this.notEnoughWords()
      ? 'Для начала игры необходимо минимум 20 слов на странице'
      : 'Начать игру';
  }
}
