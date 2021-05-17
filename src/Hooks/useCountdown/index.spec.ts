import { renderHook } from '@testing-library/preact-hooks';

import { Clock } from '@Types';
import { useCountdown } from './index';
import { CountdownProps } from './types';

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

const renderUseCountdown = (props?: Partial<CountdownProps>) => {
  const onEnd = jest.fn();

  const hookProps = { duration: 3_000, frequency: 1_000, onEnd, ...props };

  const { result, waitForNextUpdate } = renderHook(() => useCountdown(hookProps));

  if (!result.current) throw result.error;

  const tickOneSecond = async () => {
    jest.runOnlyPendingTimers();
    return waitForNextUpdate();
  };

  return {
    result,
    spies: { onEnd },
    tickOneSecond,
    waitForNextUpdate,
  };
};

describe('useCountdown', () => {
  describe('provided value', () => {
    it('should return a `Countdown` object with correct initials', () => {
      const { result } = renderUseCountdown({ duration: 1_000 });

      expect(result.current).toMatchInlineSnapshot(`
        Object {
          "lapse": [Function],
          "pause": [Function],
          "remaining": Object {
            "milliseconds": "00",
            "minutes": "00",
            "seconds": "01",
          },
          "reset": [Function],
          "start": [Function],
          "totalElapsed": Object {
            "milliseconds": "00",
            "minutes": "00",
            "seconds": "00",
          },
        }
      `);
    });
  });

  describe('behaviours', () => {
    describe('when `start` gets called', () => {
      it('should start ticking once per given frequency', async () => {
        const { result, tickOneSecond } = renderUseCountdown();

        result.current?.start();

        expect(setInterval).toHaveBeenCalledTimes(1);

        expect(result.current?.totalElapsed).toMatchObject<Clock>({
          milliseconds: '00',
          minutes: '00',
          seconds: '00',
        });

        await tickOneSecond();

        expect(result.current?.totalElapsed).toMatchObject<Clock>({
          milliseconds: '00',
          minutes: '00',
          seconds: '01',
        });
      });

      it('should restart if already done', async () => {
        const { result, tickOneSecond, waitForNextUpdate } = renderUseCountdown();

        result.current?.start();

        await tickOneSecond();
        await tickOneSecond();
        await tickOneSecond();

        expect(result.current?.totalElapsed).toMatchObject<Clock>({
          milliseconds: '00',
          minutes: '00',
          seconds: '03',
        });

        result.current?.start();

        await waitForNextUpdate();

        expect(result.current?.totalElapsed).toMatchObject<Clock>({
          milliseconds: '00',
          minutes: '00',
          seconds: '00',
        });
      });

      it('should resume if paused', async () => {
        const { result, tickOneSecond } = renderUseCountdown();

        result.current?.start();
        expect(setInterval).toHaveBeenCalledTimes(1);

        await tickOneSecond();

        expect(result.current?.totalElapsed).toMatchObject<Clock>({
          milliseconds: '00',
          minutes: '00',
          seconds: '01',
        });

        result.current?.pause();

        result.current?.start();

        await tickOneSecond();

        expect(result.current?.totalElapsed).toMatchObject<Clock>({
          milliseconds: '00',
          minutes: '00',
          seconds: '02',
        });
      });
    });

    describe('when `pause` gets called', () => {
      it('should stop ticking', async () => {
        expect.assertions(3);

        const { result, tickOneSecond } = renderUseCountdown();

        result.current?.start();

        expect(setInterval).toHaveBeenCalledTimes(1);

        await tickOneSecond();

        expect(result.current?.totalElapsed).toMatchObject<Clock>({
          milliseconds: '00',
          minutes: '00',
          seconds: '01',
        });

        result.current?.pause();

        setTimeout(() => {
          // ? Since there will be no state update, `waitForNextUpdate` would break the test.
          process.nextTick(() => {
            expect(result.current?.totalElapsed).toMatchObject<Clock>({
              milliseconds: '00',
              minutes: '00',
              seconds: '01',
            });
          });
        }, 102030);
      });
    });

    describe('when `reset` gets called', () => {
      describe('with param `keepTotalElapsed` as `true`', () => {
        it('should save `totalElapsedTime`', async () => {
          const { result, tickOneSecond } = renderUseCountdown();

          result.current?.start();

          await tickOneSecond();

          expect(result.current?.totalElapsed).toMatchObject<Clock>({
            milliseconds: '00',
            minutes: '00',
            seconds: '01',
          });

          result.current?.reset(true);
          result.current?.start();

          await tickOneSecond();

          expect(result.current?.totalElapsed).toMatchObject<Clock>({
            milliseconds: '00',
            minutes: '00',
            seconds: '02',
          });
        });
      });

      it('should stop ticking and reset the result', async () => {
        const { result, waitForNextUpdate, tickOneSecond } = renderUseCountdown();

        result.current?.start();

        await tickOneSecond();

        expect(result.current?.remaining).toMatchObject<Clock>({
          milliseconds: '00',
          minutes: '00',
          seconds: '02',
        });

        result.current?.reset();
        await waitForNextUpdate();

        expect(result.current?.remaining).toMatchObject<Clock>({
          milliseconds: '00',
          minutes: '00',
          seconds: '03',
        });

        expect(result.current?.totalElapsed).toMatchObject<Clock>({
          milliseconds: '00',
          minutes: '00',
          seconds: '00',
        });
      });
    });

    describe('when `lapse` gets called', () => {
      it('should reset the remaining, keep the total elapsed and resume ticking', async () => {
        const { result, waitForNextUpdate, tickOneSecond } = renderUseCountdown();

        result.current?.start();

        await tickOneSecond();

        expect(result.current?.remaining).toMatchObject<Clock>({
          milliseconds: '00',
          minutes: '00',
          seconds: '02',
        });

        result.current?.lapse();

        await waitForNextUpdate();

        expect(result.current?.remaining).toMatchObject<Clock>({
          milliseconds: '00',
          minutes: '00',
          seconds: '03',
        });

        expect(result.current?.totalElapsed).toMatchObject<Clock>({
          milliseconds: '00',
          minutes: '00',
          seconds: '01',
        });
      });
    });
  });
});
