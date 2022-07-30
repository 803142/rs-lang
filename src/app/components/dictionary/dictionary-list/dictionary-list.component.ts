import { BreakpointObserver } from '@angular/cdk/layout';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  ViewChild,
  EventEmitter,
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ISettings } from '../../../common/models/settings.model';
import { Word } from '../../../common/models/word.model';
import { AppState } from '../../../redux/app.state';

@Component({
  selector: 'app-dictionary-list',
  templateUrl: './dictionary-list.component.html',
  styleUrls: ['./dictionary-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DictionaryListComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @Input() group: number;

  @Input() color: number[];

  @Input() label: string;

  @Input() words$: Observable<Word[]>;

  @Input() settings: ISettings;

  @Input() totalCount$: Observable<number>;

  @Output() changePageEvent = new EventEmitter();

  @Output() restoreWordEvent = new EventEmitter();

  pageEvent: PageEvent;

  data: Observable<Word[]>;

  cols: Observable<number>;

  rowHeight: Observable<string>;

  length: number;

  lengthBase: number;

  constructor(public breakpointObserver: BreakpointObserver, private store: Store<AppState>) {
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

  changePage(event) {
    this.changePageEvent.emit(event);
  }

  restoreWord(event) {
    this.restoreWordEvent.emit(event);
  }

  identify(index, item: Word) {
    return item._id;
  }
}
