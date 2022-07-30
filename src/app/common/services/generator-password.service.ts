import { Injectable } from '@angular/core';

const CHARACTER_GENERATOR =
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-+={}[]|:;<>,.?/`~';

@Injectable({
  providedIn: 'root',
})
export class GeneratorPasswordService {
  private getRandomCharacters(): string {
    return CHARACTER_GENERATOR.charAt(Math.floor(Math.random() * CHARACTER_GENERATOR.length));
  }

  public getRandomString(length: number): string {
    return Array.from({ length }).map(this.getRandomCharacters).join('');
  }
}
