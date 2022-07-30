import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { GamesBannerData } from 'src/app/components/games/models/games-start-banner.model';

@Component({
  selector: 'app-games-sprint-main',
  templateUrl: './games-sprint-main.component.html',
  styleUrls: ['./games-sprint-main.component.scss'],
})
export class GamesSprintMainComponent {
  banner: GamesBannerData = {
    title: 'Спринт',
    subtitle: 'Мини-игра «Спринт» - это тренировка для повторения слов.',
  };

  constructor(private location: Location, private router: Router) {}

  goBack(): void {
    this.location.back();
  }

  startGame() {
    this.router.navigate(['/games/sprint/play']);
  }
}
