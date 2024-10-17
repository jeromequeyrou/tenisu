import { sumByArray } from './sumByArray';

describe('sumByArray', () => {
  it('should sum all number of the array', () => {
    const numbers = [1, 2, 3, 4];
    expect(sumByArray(numbers)).toBe(10);
  });

  it('should return 0 when array is empty', () => {
    const numbers = [];
    expect(sumByArray(numbers)).toBe(0);
  });
});
