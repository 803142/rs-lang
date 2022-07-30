import { AudioChallengeState, AudioChallengeWord } from '../models/game-adio-challenge.model';

export const GAME_LENGTH = 20;

export const initialAudioChallengeWord: AudioChallengeWord = {
  _id: '',
  word: '',
  page: 0,
  group: 0,
  image: '',
  audio: '',
  audioMeaning: '',
  audioExample: '',
  textMeaning: '',
  textExample: '',
  transcription: '',
  wordTranslate: '',
  textMeaningTranslate: '',
  textExampleTranslate: '',
  translationsArray: [],
  answer: -1,
  userWord: {
    difficulty: 'easy',
    optional: {
      repeat: 0,
      failCount: 0,
    },
  },
};

export const initialAudioChallengeState: AudioChallengeState = {
  wordsInGame: [],
  resultList: [],
  isGameStarted: false,
  currentWord: initialAudioChallengeWord,
  isTranslationChoosed: false,
  maxRightAnswers: 0,
  previousMaxAnswers: 0,
  isGameEnded: false,
};
