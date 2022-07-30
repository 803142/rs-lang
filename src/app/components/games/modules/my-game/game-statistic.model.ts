export class StatisticGame {
  learned: number;

  tries: number;

  right: number;

  series: number;

  constructor(learned: number, tries: number, right: number, series: number) {
    this.learned = learned;
    this.tries = tries;
    this.right = right;
    this.series = series;
  }
}
