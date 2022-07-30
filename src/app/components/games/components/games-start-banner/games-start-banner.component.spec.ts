import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GamesBannerData } from '../../models/games-start-banner.model';

import { GamesStartBannerComponent } from './games-start-banner.component';

const bannerMock: GamesBannerData = {
  title: 'testTitle',
  subtitle: 'testSubTitle',
};

describe('GamesStartBannerComponent', () => {
  let component: GamesStartBannerComponent;
  let fixture: ComponentFixture<GamesStartBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GamesStartBannerComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GamesStartBannerComponent);
    component = fixture.componentInstance;
    component.banner = bannerMock;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
