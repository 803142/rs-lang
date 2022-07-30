import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ISettings } from 'src/app/common/models/settings.model';
import { LoadListGame } from 'src/app/redux/actions/listGame.actions';
import { saveSettings } from 'src/app/redux/actions/settings.actions';
import { AppState } from 'src/app/redux/app.state';
import { selectSetGames } from 'src/app/redux/selectors/settings.selector';

@Component({
  selector: 'app-games-settings-dialog',
  templateUrl: './games-settings-dialog.component.html',
  styleUrls: ['./games-settings-dialog.component.scss'],
})
export class GamesSettingsDialogComponent {
  wordsAmount: number[] = [10, 20, 30, 40, 50, 60];

  levelChosen: number[] = [1, 2, 3, 4, 5, 6];

  setGames: FormGroup;

  hideRequiredControl = new FormControl(false);

  groupLevel: FormControl;

  groupAmount: FormControl;

  setting: ISettings;

  constructor(fb: FormBuilder, private store: Store<AppState>) {
    this.store.select(selectSetGames).subscribe((set) => {
      const { groupAmount, hideRequired, groupLevel } = set.optional.setGame;
      this.setting = { optional: set.optional, wordsPerDay: set.wordsPerDay };
      this.hideRequiredControl = new FormControl(hideRequired);
      this.groupLevel = new FormControl(groupLevel);
      this.groupAmount = new FormControl(groupAmount);
    });
    this.setGames = fb.group({
      hideRequired: this.hideRequiredControl,
      groupLevel: this.groupLevel,
      groupAmount: this.groupAmount,
    });
  }

  onSubmit() {
    this.store.dispatch(
      saveSettings({
        payload: {
          ...this.setting,
          optional: { ...this.setting.optional, setGame: this.setGames.value },
        },
      }),
    );
    const { groupLevel, groupAmount } = this.setGames.value;
    this.store.dispatch(
      LoadListGame({ group: groupLevel - 1, page: 0, wordsPerPage: groupAmount }),
    );
  }
}
