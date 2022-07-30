import { BreakpointObserver } from '@angular/cdk/layout';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Observable, merge } from 'rxjs';
import { Word } from 'src/app/common/models/word.model';
import { delay, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/redux/app.state';
import { selectWordsByGroup } from 'src/app/redux/selectors/words.selector';
import { LoadWords } from 'src/app/redux/actions/words.actions';
import { GamesService } from 'src/app/common/services/games.service';
import { GameModel } from 'src/app/common/models/games.model';
import { gameWordsList } from 'src/app/redux/actions/listGame.actions';

@Component({
  selector: 'app-cards-tab',
  templateUrl: './cards-tab.component.html',
  styleUrls: ['./cards-tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardsTabComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @Input() group: number;

  @Input() color: number[];

  words: Observable<Word[]>;

  gameList: Word[];

  data: Observable<Word[]>;

  cols: Observable<number>;

  rowHeight: Observable<string>;

  games$: Observable<GameModel[]>;

  length: number;

  lengthBase: number;

  constructor(
    public breakpointObserver: BreakpointObserver,
    private store: Store<AppState>,
    private gamesService: GamesService,
  ) {
    this.games$ = this.gamesService.getGames();
    this.cols = this.breakpointObserver.observe(['(min-width: 700px)', '(min-width: 1060px)']).pipe(
      map(({ breakpoints }) => {
        if (breakpoints['(min-width: 1060px)']) return 3;
        if (breakpoints['(min-width: 700px)']) return 2;
        return 1;
      }),
    );
    this.rowHeight = this.breakpointObserver
      .observe([
        '(min-width: 1580px)',
        '(min-width: 1360px)',
        '(min-width: 1180px)',
        '(min-width: 1058px)',
        '(min-width: 940px)',
        '(min-width: 940px)',
        '(min-width: 860px)',
        '(min-width: 699px)',
        '(min-width: 370px)',
        '(min-width: 580px)',
        '(min-width: 490px)',
        '(min-width: 440px)',
        '(min-width: 400px)',
      ])
      .pipe(
        map(({ breakpoints }) => {
          if (breakpoints['(min-width: 1580px)']) return '1.4:1';
          if (breakpoints['(min-width: 1360px)']) return '1.3:1';
          if (breakpoints['(min-width: 1180px)']) return '1.1:1';
          if (breakpoints['(min-width: 1058px)']) return '1:1';
          if (breakpoints['(min-width: 940px)']) return '1.4:1';
          if (breakpoints['(min-width: 860px)']) return '1.2:1';
          if (breakpoints['(min-width: 790px)']) return '1.1:1';
          if (breakpoints['(min-width: 699px)']) return '1:1.1';
          if (breakpoints['(min-width: 580px)']) return '1.7:1';
          if (breakpoints['(min-width: 490px)']) return '1.4:1';
          if (breakpoints['(min-width: 440px)']) return '1.2:1';
          if (breakpoints['(min-width: 400px)']) return '1.1:1';
          if (breakpoints['(min-width: 370px)']) return '1:1.1';
          return '1:1.15';
        }),
      );
  }

  connect(): Observable<Word[]> {
    const dataMutations = [this.data, this.paginator.page];
    return merge(...dataMutations).pipe(
      delay(0),
      map(() => {
        let words: Word[];
        this.data.subscribe((data) => {
          words = data;
          this.gameList = data;
        });
        const res = this.getPagedData([...(words || [])]);
        this.gameList = res;
        return res;
      }),
    );
  }

  private getPagedData(data: Word[]) {
    this.gameList = data;
    if (
      this.lengthBase !== 0 &&
      this.lengthBase - 30 <= (this.paginator.pageIndex + 1) * this.paginator.pageSize &&
      this.lengthBase < this.length
    ) {
      this.store.dispatch(
        LoadWords({ page: this.lengthBase / 60, group: this.group, wordsPerPage: 60 }),
      );
    }
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;

    return data.splice(startIndex, this.paginator.pageSize);
  }

  ngOnInit(): void {
    this.data = this.store.select(selectWordsByGroup(this.group)).pipe(
      map((words) => {
        this.lengthBase = words[0].paginatedResults.length;
        return words[0].paginatedResults;
      }),
    );
    this.store.select(selectWordsByGroup(this.group)).subscribe((words) => {
      this.length = words[0].totalCount[0][this.group];
    });
  }

  ngAfterViewInit() {
    this.words = this.connect();
  }

  colorRGB(a = 0.3): string {
    return `rgba(${[...this.color, a].join()})`;
  }

  addGameList() {
    this.store.dispatch(gameWordsList({ Words: this.gameList.slice(0, 20) }));
  }
}
