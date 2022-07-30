import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { DictionaryRoutingModule } from './dictionary-routing.module';
import { DictionaryComponent } from './dictionary/dictionary.component';
import { DictionaryTabComponent } from './dictionary-tab/dictionary-tab.component';
import { DictionaryListComponent } from './dictionary-list/dictionary-list.component';
import { DictionaryItemComponent } from './dictionary-item/dictionary-item.component';

@NgModule({
  declarations: [
    DictionaryComponent,
    DictionaryTabComponent,
    DictionaryListComponent,
    DictionaryItemComponent,
  ],
  imports: [CommonModule, SharedModule, DictionaryRoutingModule],
})
export class DictionaryModule {}
