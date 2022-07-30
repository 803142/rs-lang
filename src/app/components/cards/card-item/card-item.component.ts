import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { ISettings } from 'src/app/common/models/settings.model';
import { Word } from 'src/app/common/models/word.model';
import { LoadDifficultyWords, LoadStatWords } from 'src/app/redux/actions/words.actions';
import { AppState } from 'src/app/redux/app.state';
import { selectSettings } from 'src/app/redux/selectors/settings.selector';
import { URL_BACK_SERVER } from 'src/app/shared/constants/url-constants';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardItemComponent {
  @Input() word: Word;

  @Input() color: number[];

  apiUrl = URL_BACK_SERVER.URL_BACK;

  audio: HTMLAudioElement;

  audioExample: HTMLAudioElement;

  audioMeaning: HTMLAudioElement;

  play = false;

  set: ISettings;

  constructor(private store: Store<AppState>) {
    this.store.select(selectSettings).subscribe((set) => {
      this.set = set;
    });
  }

  colorRGB(a = 0.3): string {
    return `rgba(${[...this.color, a].join()})`;
  }

  addDifficultyWord(wordId: string, difficulty: 'easy' | 'hard' | 'deleted', newWord: boolean) {
    this.store.dispatch(LoadDifficultyWords({ wordId, difficulty, newWord }));
  }

  playAudio() {
    this.play = true;
    this.audio = new Audio(`${this.apiUrl}${this.word.audio}`);

    this.audioExample = new Audio(`${this.apiUrl}${this.word.audioExample}`);

    this.audioMeaning = new Audio(`${this.apiUrl}${this.word.audioMeaning}`);
    this.audio.play();
    [this.audio, this.audioExample, this.audioMeaning].forEach((el, index, arr) => {
      el.addEventListener('ended', () => arr[index + 1] && arr[index + 1].play());
    });
  }

  stopAudio() {
    this.play = false;
    this.audio.pause();
    this.audioExample.pause();
    this.audioMeaning.pause();
  }

  click(word: Word, error: boolean) {
    this.store.dispatch(
      LoadStatWords({
        word,
        error,
      }),
    );
  }
}
