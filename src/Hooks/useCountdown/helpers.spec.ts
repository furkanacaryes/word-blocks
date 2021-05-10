import { toClock, toDoubleDigit } from './helpers';
import { Clock } from './types';

describe('useCountdown helpers', () => {
  describe('toDoubleDigit', () => {
    it('should convert given number to 2-digit string', () => {
      expect(toDoubleDigit(0)).toBe('00');
      expect(toDoubleDigit(1)).toBe('01');
      expect(toDoubleDigit(2)).toBe('02');
      expect(toDoubleDigit(3)).toBe('03');
      expect(toDoubleDigit(4)).toBe('04');
      expect(toDoubleDigit(5)).toBe('05');
      expect(toDoubleDigit(6)).toBe('06');
      expect(toDoubleDigit(7)).toBe('07');
      expect(toDoubleDigit(8)).toBe('08');
      expect(toDoubleDigit(9)).toBe('09');
      expect(toDoubleDigit(10)).toBe('10');
    });
  });

  describe('toClock', () => {
    describe('should convert given milliseconds to a `Clock` object', () => {
      test.each([
        [1_000, '00', '01', '00'],
        [1_500, '00', '01', '50'],
        [20_000, '00', '20', '00'],
        [20_500, '00', '20', '50'],
        [300_000, '05', '00', '00'],
        [600_000, '10', '00', '00'],
        [900_000, '15', '00', '00'],
        [3_599_990, '59', '59', '99'],
      ])(
        '.toClock(%i) => {minutes: %s, seconds: %s, milliseconds: %s}',
        (ms, minutes, seconds, milliseconds) => {
          expect(toClock(ms)).toMatchObject<Clock>({
            milliseconds,
            minutes,
            seconds,
          });
        },
      );
    });

    it('should throw if given time is greater-equal than 1 hour', () => {
      expect(() => toClock(3_600_000)).toThrowError('Should be lesser than an hour!');
    });
  });
});
