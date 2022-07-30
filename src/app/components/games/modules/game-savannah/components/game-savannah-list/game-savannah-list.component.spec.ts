import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameSavannahListComponent } from './game-savannah-list.component';

describe('GameSavannahListComponent', () => {
  let component: GameSavannahListComponent;
  let fixture: ComponentFixture<GameSavannahListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GameSavannahListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameSavannahListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
