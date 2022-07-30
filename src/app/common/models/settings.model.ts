export interface ISettings {
  wordsPerDay: number;
  optional: {
    displayTranslation: boolean;
    displayHandlingButtons: boolean;
    setGame: {
      groupAmount: number;
      groupLevel: number;
      hideRequired: boolean;
    };
  };
  id?: number;
}
