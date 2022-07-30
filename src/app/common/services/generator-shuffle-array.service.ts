import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GeneratorShuffleArrayService {
  public shuffleArray(array: object[]): object[] {
    const arrayCopy = array;
    while (arrayCopy.length) {
      const arrayElement = Math.floor(Math.random() * (arrayCopy.length -= 1));
      const anotherArrayElement = arrayCopy[arrayCopy.length];
      arrayCopy[array.length] = arrayCopy[arrayElement];
      arrayCopy[arrayElement] = anotherArrayElement;
    }
    return arrayCopy;
  }

  public getElementsOfArray(array: object[], randomNumbersQuantity: number): object[] {
    return array.splice(0, randomNumbersQuantity - 1);
  }

  public getRandomNumbers(rangeLength: number, randomNumbersQuantity: number): number[] {
    const array: number[] = [];
    for (let index = 0; index <= rangeLength; index += 1) {
      array.push(index);
    }
    const result: number[] = [];
    for (let index = 1; index <= randomNumbersQuantity; index += 1) {
      const random = Math.floor(Math.random() * (rangeLength - index));
      result.push(array[random]);
      array[random] = array[rangeLength - index];
    }
    return result;
  }
}
