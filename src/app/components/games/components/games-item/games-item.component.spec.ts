import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { GamesItemComponent } from './games-item.component';
import { GameModel } from '../../../../common/models/games.model';

const testGame: GameModel = {
  id: 1,
  name: 'test name',
  nameRU: 'Игра1',
  description: 'test description',
  img: 'test img',
};

describe('GamesItemComponent', () => {
  let component: GamesItemComponent;
  let fixture: ComponentFixture<GamesItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GamesItemComponent],
      imports: [HttpClientModule, RouterTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GamesItemComponent);
    component = fixture.componentInstance;
    component.game = testGame;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
