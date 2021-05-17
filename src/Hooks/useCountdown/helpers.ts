import { Clock } from '@Types';

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

  if (clock.getUTCHours() > 0) throw new Error('Should be lesser than an hour!');

  return {
    milliseconds: toDoubleDigit(clock.getUTCMilliseconds()),
    minutes: toDoubleDigit(clock.getUTCMinutes()),
    seconds: toDoubleDigit(clock.getUTCSeconds()),
  };
};
