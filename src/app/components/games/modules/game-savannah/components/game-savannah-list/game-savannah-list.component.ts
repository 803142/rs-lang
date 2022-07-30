import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-game-savannah-list',
  templateUrl: './game-savannah-list.component.html',
  styleUrls: ['./game-savannah-list.component.scss'],
})
export class GameSavannahListComponent implements OnInit, OnDestroy {
  @Input() currentWord: string;

  @Input() answers: string[];

  @Input() answer: string;

  @Input() time = '--time: 5s;';

  @Input() isPaused = false;

  @Output() checked = new EventEmitter();

  current = '';

  ngOnInit(): void {
    document.addEventListener('keydown', this.keyPressAction.bind(this));
  }

  ngOnDestroy(): void {
    document.removeEventListener('keydown', this.keyPressAction);
  }

  checkedAnswer(answer: string): void {
    this.current = this.answer;
    const timerId = setTimeout(() => {
      this.checked.emit(answer);
      clearTimeout(timerId);
    }, 500);
  }

  keyPressAction(event: KeyboardEvent): void {
    let code;
    if (event.key !== undefined) {
      code = parseInt(event.key, 10) - 1;
    } else if (event.keyCode !== undefined) {
      code = event.keyCode - 49;
    }
    if (code >= 0 && code <= 3) {
      this.checkedAnswer(this.answers[code]);
    }
  }
}
