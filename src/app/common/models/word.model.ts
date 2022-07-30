export interface Word {
  _id: string;
  page: number;
  group: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  wordTranslate: string;
  textMeaningTranslate: string;
  textExampleTranslate: string;
  userWord: {
    difficulty: 'easy' | 'hard' | 'deleted';
    optional: {
      repeat: number;
      failCount: number;
    };
  };
}

export interface IHttpAnswer {
  id: string;
  difficulty: string;
  wordId: string;
}
