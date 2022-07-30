import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';
import { ISettings } from '../../../common/models/settings.model';
import { Word } from '../../../common/models/word.model';
import { URL_BACK_SERVER } from '../../../shared/constants/url-constants';

@Component({
  selector: 'app-dictionary-item',
  templateUrl: './dictionary-item.component.html',
  styleUrls: ['./dictionary-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DictionaryItemComponent {
  @Input() word: Word;

  @Input() color: number[];

  @Input() label: string;

  @Input() settings: ISettings;

  @Output() restoreWordEvent = new EventEmitter();

  apiUrl = URL_BACK_SERVER.URL_BACK;

  audio: HTMLAudioElement;

  audioExample: HTMLAudioElement;

  audioMeaning: HTMLAudioElement;

  play = false;

  colorRGB(a = 0.3): string {
    return `rgba(${[...this.color, a].join()})`;
  }

  playAudio() {
    this.play = true;
    this.audio = new Audio(`${URL_BACK_SERVER.URL_BACK}/${this.word.audio}`);

    this.audioExample = new Audio(`${URL_BACK_SERVER.URL_BACK}/${this.word.audioExample}`);

    this.audioMeaning = new Audio(`${URL_BACK_SERVER.URL_BACK}/${this.word.audioMeaning}`);
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

  isRestore() {
    return this.label === 'Сложные слова' || this.label === 'Удалённые слова';
  }

  restoreWord() {
    this.restoreWordEvent.emit(this.word);
  }
}
