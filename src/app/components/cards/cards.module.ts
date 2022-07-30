import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardsListComponent } from './cards-list/cards-list.component';
import { SharedModule } from '../../shared/shared.module';
import { CardsTabComponent } from './cards-tab/cards-tab.component';
import { CardItemComponent } from './card-item/card-item.component';
import { CardsRoutingModule } from './cards-routing.module';

@NgModule({
  declarations: [CardsListComponent, CardsTabComponent, CardItemComponent],
  imports: [CommonModule, SharedModule, CardsRoutingModule],
})
export class CardsModule {}
