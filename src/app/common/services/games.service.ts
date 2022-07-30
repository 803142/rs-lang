import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { GameModel } from 'src/app/common/models/games.model';

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  constructor(private http: HttpClient) {}

  getGames() {
    return this.http.get<GameModel[]>('assets/data/games-data.json');
  }
}
