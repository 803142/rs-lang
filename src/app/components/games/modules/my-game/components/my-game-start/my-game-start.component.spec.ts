import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MyGameStartComponent } from './my-game-start.component';

describe('MyGameStartComponent', () => {
  let component: MyGameStartComponent;
  let fixture: ComponentFixture<MyGameStartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyGameStartComponent],
      imports: [RouterTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyGameStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
