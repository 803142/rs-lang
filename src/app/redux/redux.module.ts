import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { AuthEffects } from './effects/auth.effects';
import { DictionaryEffects } from './effects/dictionary.effects';
import { GameListEffects } from './effects/listGame.effect';
import { SettingsEffects } from './effects/settings.effects';
import { StatisticsEffects } from './effects/stats.effects';
import { WordsEffects } from './effects/words.effects';
import { authFeatureKey, authReducer } from './reducers/auth.reducers';
import { dictionaryFeatureKey, dictionaryReducer } from './reducers/dictionary.reducers';
import { gameListFeatureKey, gameListReducer } from './reducers/listGame.reducer';
import { expectationFeatureKey, expectationReducer } from './reducers/request.reducer';
import { settingsFeatureKey, settingsReducer } from './reducers/settings.reducer';
import { statsFeatureKey, statsReducer } from './reducers/stats.reducer';
import { wordsFeatureKey, booksReducer } from './reducers/words.reducer';

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forRoot({}),
    EffectsModule.forRoot([
      WordsEffects,
      AuthEffects,
      DictionaryEffects,
      SettingsEffects,
      GameListEffects,
      StatisticsEffects,
    ]),
    StoreModule.forFeature(wordsFeatureKey, booksReducer),
    StoreModule.forFeature(expectationFeatureKey, expectationReducer),
    StoreModule.forFeature(settingsFeatureKey, settingsReducer),
    StoreModule.forFeature(statsFeatureKey, statsReducer),
    StoreModule.forFeature(authFeatureKey, authReducer),
    StoreModule.forFeature(dictionaryFeatureKey, dictionaryReducer),
    StoreModule.forFeature(gameListFeatureKey, gameListReducer),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    HttpClientModule,
  ],
})
export class ReduxModule {}
