import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GamesBannerData } from 'src/app/components/games/models/games-start-banner.model';

@Component({
  selector: 'app-my-game-start',
  templateUrl: './my-game-start.component.html',
  styleUrls: ['./my-game-start.component.scss'],
})
export class MyGameStartComponent {
  banner: GamesBannerData = {
    title: 'Своя игра',
    subtitle:
      'Мини-игра «Своя игра» - это тренировка зрительного восприятия правильности перевода.',
  };

  constructor(private router: Router) {}

  onStartGame() {
    this.router.navigate(['games/my-game/my-game-start']);
  }
}
