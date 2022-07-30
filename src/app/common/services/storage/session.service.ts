import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

import { MemoryService } from './memory.service';
import { SessionStorage } from './utils/session.storage';
import { storageAvailable } from './utils/storage.util';

@Injectable({
  providedIn: 'root',
})
export class SessionService implements SessionStorage {
  private readonly storage: Storage;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private memoryStorage: MemoryService,
  ) {
    if (storageAvailable('sessionStorage')) {
      this.storage = window.sessionStorage;
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

  getItem(key: string): any | null {
    return JSON.parse(this.storage.getItem(key));
  }

  key(index: number): string | null {
    return this.storage.key(index);
  }

  removeItem(key: string): void {
    this.storage.removeItem(key);
  }

  setItem(key: string, value: any): void {
    this.storage.setItem(key, JSON.stringify(value));
  }
}
