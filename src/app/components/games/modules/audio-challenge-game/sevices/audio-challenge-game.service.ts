import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { first } from 'rxjs/operators';

import { AppState } from 'src/app/redux/app.state';
import { selectGameList } from 'src/app/redux/selectors/listGame.selectors';
import { Word } from 'src/app/common/models/word.model';
import { LoadStatWords } from 'src/app/redux/actions/words.actions';
import { IGame } from 'src/app/common/models/stats.model';
import { StatsService } from 'src/app/common/services/stats.service';
import { AudioChallengeState, AudioChallengeWord } from '../models/game-adio-challenge.model';
import { GAME_LENGTH, initialAudioChallengeState } from '../constants/audio-challenge.constants';

@Injectable({
  providedIn: 'root',
})
export class AudioChallengeGameService {
  private gameState = new BehaviorSubject<AudioChallengeState>(initialAudioChallengeState);

  constructor(private store: Store<AppState>, private statsService: StatsService) {}

  getStateChange(): Observable<AudioChallengeState> {
    return this.gameState.asObservable();
  }

  getCurrentState(): AudioChallengeState {
    return this.gameState.getValue();
  }

  setGameState(state: Partial<AudioChallengeState>) {
    const newState = { ...this.getCurrentState(), ...state };
    this.gameState.next(newState);
  }

  gameStart() {
    const newState = { ...initialAudioChallengeState };
    this.gameState.next(newState);
    this.getWords();
    const { wordsInGame } = this.getCurrentState();
    if (wordsInGame.length) {
      this.setGameState({ isGameStarted: true });
    }
  }

  gameEnd() {
    this.setGameState({ isGameEnded: true });
  }

  getWords() {
    this.store
      .select(selectGameList())
      .pipe(first())
      .subscribe((words) => {
        this.setGameState({
          wordsInGame: words,
        });
        const [currentWord] = words;
        this.setGameState({
          currentWord: this.createAudioChallengeWord(currentWord),
        });
        return undefined;
      });
  }

  nextWord() {
    const { resultList, wordsInGame } = this.getCurrentState();

    const nextWord = wordsInGame[resultList.length];
    const currentWord = this.createAudioChallengeWord(nextWord);
    this.setGameState({
      currentWord,
      isTranslationChoosed: false,
    });
    if (resultList.length === GAME_LENGTH || !nextWord) {
      this.formattedStatistic();
      this.gameEnd();
    }
  }

  createAudioChallengeWord(word: Word): AudioChallengeWord {
    const translationsArray = this.createTranslationTask(word);
    return { ...word, translationsArray, answer: -1 };
  }

  createTranslationTask(wordArg: Word): string[] {
    if (!wordArg) {
      return [];
    }
    const { _id: id } = wordArg;

    const filterFunction = (word: Word) => {
      const { _id: wordId } = word;
      return wordId !== id;
    };

    const array = this.shuffle(
      this.getCurrentState()
        .wordsInGame.filter(filterFunction)
        .map((word: Word) => word.wordTranslate),
    ).slice(0, 4);
    return this.shuffle([...array, wordArg.wordTranslate]);
  }

  makeTurn(index: number | undefined) {
    let resultAnswer = false;
    const { resultList, currentWord, isTranslationChoosed } = this.getCurrentState();
    if (isTranslationChoosed) {
      return;
    }
    if (index >= 0) {
      resultAnswer = currentWord.wordTranslate === currentWord.translationsArray[index];
      currentWord.answer = index;
    }
    this.store.dispatch(LoadStatWords({ word: currentWord, error: !resultAnswer }));
    const resultListNew = [...resultList, { word: currentWord, result: resultAnswer }];
    this.setGameState({
      resultList: resultListNew,
      isTranslationChoosed: true,
      currentWord,
    });
  }

  shuffle(arr = []) {
    const res = [...arr];
    return res.sort(() => Math.random() - 0.5);
  }

  closeGame() {
    this.setGameState(initialAudioChallengeState);
  }

  formattedStatistic() {
    const { resultList: statistic } = this.getCurrentState();
    let session = 0;
    const resultState: IGame = statistic.reduce(
      (acc, cur, index, arr) => {
        const result = { ...acc };
        if (cur.result) {
          result.right += 1;
          session += 1;
        }
        if (!cur.result) {
          result.series = result.series <= session ? session : result.series;
          session = 0;
        }
        result.tries = arr.length - acc.right;

        return result;
      },
      {
        learned: statistic.length,
        tries: 0,
        right: 0,
        series: 0,
      },
    );
    this.statsService.saveAudioStats(resultState);
  }
}
