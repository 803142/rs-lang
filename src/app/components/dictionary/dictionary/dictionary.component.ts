import { Store } from '@ngrx/store';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { totalCount, wordsDictionary } from 'src/app/redux/selectors/dictionary.selectors';
import { Word } from 'src/app/common/models/word.model';
import { ISettings } from '../../../common/models/settings.model';
import { DictionaryService } from '../../../common/services/dictionary.service';
import { restoreWord } from '../../../redux/actions/dictionary.actions';
import { selectSettings } from '../../../redux/selectors/settings.selector';

export interface ExampleTab {
  label: string;
  icon: string;
  color: number[];
}

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DictionaryComponent implements OnInit {
  asyncTabs: Observable<ExampleTab[]>;

  expectation: Observable<boolean>;

  tabs: any;

  currentSection: number;

  currentGroup: number;

  words$: Observable<Word[]>;

  totalCount$: Observable<number>;

  settings: ISettings;

  constructor(private dictionaryService: DictionaryService, private store: Store) {
    this.tabs = [
      { label: 'Изучаемые слова', icon: 'filter_1', color: 'blue', id: 1 },
      { label: 'Сложные слова', icon: 'filter_2', color: 'green', id: 2 },
      { label: 'Удалённые слова', icon: 'filter_3', color: 'brown', id: 3 },
    ];
  }

  ngOnInit() {
    this.words$ = this.store.select(wordsDictionary);
    this.totalCount$ = this.store.select(totalCount);
    this.dictionaryService.updateWords();
    this.getGroup();
    this.getSection();
    this.getSettings();
  }

  onChangePage(event) {
    this.dictionaryService.changePage(event);
  }

  onChangeGroup(event) {
    this.dictionaryService.changeGroup(event);
  }

  onChangeSection(event) {
    this.getGroup();
    this.dictionaryService.changeSection(event);
  }

  restoreWord(event) {
    this.store.dispatch(restoreWord({ word: event }));
  }

  getGroup() {
    this.currentGroup = this.dictionaryService.getGroup();
  }

  getSection() {
    this.currentSection = this.dictionaryService.getSection();
  }

  getSettings() {
    this.store.select(selectSettings).subscribe((settings) => {
      this.settings = settings;
    });
  }
}
