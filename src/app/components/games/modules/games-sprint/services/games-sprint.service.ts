import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { timer } from 'rxjs';

import { Word } from '../../../../../common/models/word.model';

@Injectable({
  providedIn: 'root',
})
export class GamesSprintService {
  resultOfComparison: boolean;

  constructor(private http: HttpClient) {}

  getWords() {
    return this.http.get<Word[]>('assets/data/words.json');
  }

  compareWordAndTranslation(word: Word, translation: Word) {
    this.resultOfComparison = word._id === translation._id;
    return this.resultOfComparison;
  }

  getCounter(tick) {
    return timer(0, tick);
  }
}
