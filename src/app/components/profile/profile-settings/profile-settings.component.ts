import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ISettings } from 'src/app/common/models/settings.model';
import { saveSettings } from 'src/app/redux/actions/settings.actions';
import { AppState } from 'src/app/redux/app.state';
import { selectSetGames } from 'src/app/redux/selectors/settings.selector';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss'],
})
export class ProfileSettingsComponent implements OnInit {
  settings: ISettings;

  formGroup: FormGroup;

  wordsPerDay: number;

  constructor(private store: Store<AppState>, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.store.select(selectSetGames).subscribe((settings) => {
      this.settings = settings;
    });

    this.wordsPerDay = this.settings.wordsPerDay;

    this.formGroup = this.formBuilder.group({
      wordsPerDay: this.settings.wordsPerDay,
      displayTranslation: this.settings.optional.displayTranslation,
      displayHandlingButtons: this.settings.optional.displayHandlingButtons,
    });
  }

  onSliderChange($event) {
    this.wordsPerDay = $event.value;
  }

  onFormSubmit() {
    const { wordsPerDay, displayTranslation, displayHandlingButtons } = this.formGroup.value;
    const payload = {
      wordsPerDay,
      optional: {
        ...this.settings.optional,
        displayTranslation,
        displayHandlingButtons,
      },
    };
    this.store.dispatch(saveSettings({ payload }));
  }
}
