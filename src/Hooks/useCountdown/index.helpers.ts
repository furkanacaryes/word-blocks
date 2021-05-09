import { Clock } from './index.types';

/**
 * Converts given number to 2-digit string.
 * @param {number} number Number to convert.
 * @returns 2-digit string.
 */
export const toDoubleDigit = (number: number): string => {
  return number.toString().slice(0, 2).replace(/^\d$/, '0$&');
};

/**
 *
 * @param {number} ms Milliseconds to convert to a Clock object.
 * @returns {Duration} Duration object
 */
export const toClock = (ms: number): Clock => {
  const clock = new Date(ms);

  if (clock.getHours() > 0) throw new Error('Should be lesser than an hour!');

  return {
    milliseconds: toDoubleDigit(clock.getMilliseconds()),
    minutes: toDoubleDigit(clock.getMinutes()),
    seconds: toDoubleDigit(clock.getSeconds()),
  };
};
