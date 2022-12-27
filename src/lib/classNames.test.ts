import { cn } from './classNames';

const testCases = [
  {
    input: 'a',
    expectedOut: 'a',
  },
  {
    input: ['a', 'b', 'c'],
    expectedOut: 'a b c',
  },
  {
    input: [
      {
        included: true,
        'not-included': false,
      },
    ],
    expectedOut: 'included',
  },
  {
    input: [
      'a',
      {
        included: true,
        'not-included': false,
      },
      'b',
    ],
    expectedOut: 'a included b',
  },
] as const;

describe('classNames', () => {
  it.each(testCases)('正しい文字列になること', ({ input, expectedOut }) => {
    const result = cn(...input);

    expect(result).toBe(expectedOut);
    expect(result).toMatchSnapshot();
  });
});
