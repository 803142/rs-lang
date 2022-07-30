import { AggregatedWordsRedux, ICurrentWords } from '../common/models/aggregatedWords.model';
import { ISettings } from '../common/models/settings.model';
import { IStats } from '../common/models/stats.model';
import { Word } from '../common/models/word.model';
import { ILoginState } from './models/loginState.models';

export interface AppState {
  words: ReadonlyArray<AggregatedWordsRedux>;
  expectation: boolean;
  login: ILoginState;
  dictionary: ICurrentWords;
  settings: ISettings;
  stats: IStats;
  gameList: Word[];
}
