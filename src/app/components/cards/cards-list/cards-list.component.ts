import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Observer } from 'rxjs';
import { LoadWords } from 'src/app/redux/actions/words.actions';
import { AppState } from 'src/app/redux/app.state';
import { selectExpectation } from 'src/app/redux/selectors/request.selector';

export interface ExampleTab {
  group: number;
  icon: string;
  color: number[];
}

@Component({
  selector: 'app-cards-list',
  templateUrl: './cards-list.component.html',
  styleUrls: ['./cards-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardsListComponent {
  value: string;

  asyncTabs: Observable<ExampleTab[]>;

  expectation: Observable<boolean>;

  constructor(private store: Store<AppState>) {
    this.expectation = this.store.select(selectExpectation);
    this.asyncTabs = new Observable((observer: Observer<ExampleTab[]>) => {
      setTimeout(() => {
        observer.next([
          { group: 0, icon: 'filter_1', color: [252, 0, 0] },
          { group: 1, icon: 'filter_2', color: [0, 128, 0] },
          { group: 2, icon: 'filter_3', color: [0, 0, 255] },
          { group: 3, icon: 'filter_4', color: [255, 165, 0] },
          { group: 4, icon: 'filter_5', color: [238, 130, 238] },
          { group: 5, icon: 'filter_6', color: [128, 0, 0] },
        ]);
      });
    });
  }

  addWordsGroup(group: number) {
    this.store.dispatch(LoadWords({ page: 0, group, wordsPerPage: 60 }));
  }

  colorRGB(color: number[]): string {
    return `rgb(${color.join()})`;
  }
}
