import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

import { LocalStorage } from './utils/local.storage';
import { MemoryService } from './memory.service';
import { storageAvailable } from './utils/storage.util';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService implements LocalStorage {
  private readonly storage: Storage;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private memoryStorage: MemoryService,
  ) {
    if (isPlatformBrowser(this.platformId) && storageAvailable('localStorage')) {
      this.storage = window.localStorage;
    } else {
      this.storage = this.memoryStorage;
    }
  }

  get length(): number {
    return this.storage.length;
  }

  clear(): void {
    this.storage.clear();
  }

  getItem(key: string): string | null {
    return this.storage.getItem(key);
  }

  key(index: number): string | null {
    return this.storage.key(index);
  }

  removeItem(key: string): void {
    this.storage.removeItem(key);
  }

  setItem(key: string, value: string): void {
    this.storage.setItem(key, value);
  }
}
