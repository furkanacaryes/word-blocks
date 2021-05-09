import { renderHook } from '@testing-library/preact-hooks';

import { useCountdown } from './index';
import { Clock, CountdownProps } from './index.types';

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

  return {
    countdown: result.current,
    spies: { onEnd },
    waitForNextUpdate,
  };
};

describe('useCountdown', () => {
  describe('provided value', () => {
    it('should return a `Countdown` object with correct initials', () => {
      const { countdown } = renderUseCountdown({ duration: 1_000 });

      expect(countdown).toMatchInlineSnapshot(`
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
        const { countdown, waitForNextUpdate } = renderUseCountdown();

        countdown.start();

        expect(setInterval).toHaveBeenCalledTimes(1);

        expect(countdown.totalElapsed).toMatchObject<Clock>({
          milliseconds: '00',
          minutes: '00',
          seconds: '00',
        });

        jest.runOnlyPendingTimers(); // ? Exhaust pending interval
        await waitForNextUpdate(); // ? Wait for state update

        expect(countdown.totalElapsed).toMatchObject<Clock>({
          milliseconds: '00',
          minutes: '00',
          seconds: '01',
        });
      });

      it('should restart if already done', async () => {
        const { countdown, waitForNextUpdate } = renderUseCountdown();

        countdown.start();

        jest.runAllTimers(); // ? Exhaust whole countdown
        await waitForNextUpdate();

        expect(countdown.totalElapsed).toMatchObject<Clock>({
          milliseconds: '00',
          minutes: '00',
          seconds: '03',
        });

        countdown.start();

        await waitForNextUpdate();

        expect(countdown.totalElapsed).toMatchObject<Clock>({
          milliseconds: '00',
          minutes: '00',
          seconds: '00',
        });
      });

      it('should resume if paused', async () => {
        const { countdown, waitForNextUpdate } = renderUseCountdown();

        countdown.start();
        expect(setInterval).toHaveBeenCalledTimes(1);

        jest.runOnlyPendingTimers();
        await waitForNextUpdate();

        expect(countdown.totalElapsed).toMatchObject<Clock>({
          milliseconds: '00',
          minutes: '00',
          seconds: '01',
        });

        countdown.pause();

        countdown.start();

        jest.runOnlyPendingTimers();
        await waitForNextUpdate();

        expect(countdown.totalElapsed).toMatchObject<Clock>({
          milliseconds: '00',
          minutes: '00',
          seconds: '02',
        });
      });
    });

    describe('when `pause` gets called', () => {
      it('should stop ticking', async () => {
        expect.assertions(3);

        const { countdown, waitForNextUpdate } = renderUseCountdown();

        countdown.start();

        expect(setInterval).toHaveBeenCalledTimes(1);

        jest.runOnlyPendingTimers();
        await waitForNextUpdate();

        expect(countdown.totalElapsed).toMatchObject<Clock>({
          milliseconds: '00',
          minutes: '00',
          seconds: '01',
        });

        countdown.pause();

        setTimeout(() => {
          // ? Since there will be no state update, `waitForNextUpdate` would break the test.
          process.nextTick(() => {
            expect(countdown.totalElapsed).toMatchObject<Clock>({
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
          const { countdown, waitForNextUpdate } = renderUseCountdown();

          countdown.start();

          jest.runAllTimers();
          await waitForNextUpdate();

          expect(countdown.totalElapsed).toMatchObject<Clock>({
            milliseconds: '00',
            minutes: '00',
            seconds: '03',
          });

          countdown.reset(true);
          await waitForNextUpdate();

          countdown.start();

          jest.runAllTimers();
          await waitForNextUpdate();

          expect(countdown.totalElapsed).toMatchObject<Clock>({
            milliseconds: '00',
            minutes: '00',
            seconds: '06',
          });
        });
      });

      it('should stop ticking and reset the countdown', async () => {
        const { countdown, waitForNextUpdate } = renderUseCountdown();

        countdown.start();

        jest.runAllTimers();
        await waitForNextUpdate();

        expect(countdown.remaining).toMatchObject<Clock>({
          milliseconds: '00',
          minutes: '00',
          seconds: '00',
        });

        countdown.reset();
        await waitForNextUpdate();

        expect(countdown.remaining).toMatchObject<Clock>({
          milliseconds: '00',
          minutes: '00',
          seconds: '03',
        });

        expect(countdown.totalElapsed).toMatchObject<Clock>({
          milliseconds: '00',
          minutes: '00',
          seconds: '00',
        });
      });
    });

    describe('when `lapse` gets called', () => {
      it('should reset the countdown, keep the total elapsed and resume ticking', async () => {
        const { countdown, waitForNextUpdate, spies } = renderUseCountdown();

        countdown.start();

        jest.runOnlyPendingTimers();
        await waitForNextUpdate();

        expect(countdown.remaining).toMatchObject<Clock>({
          milliseconds: '00',
          minutes: '00',
          seconds: '02',
        });

        countdown.lapse();

        await waitForNextUpdate();

        expect(countdown.remaining).toMatchObject<Clock>({
          milliseconds: '00',
          minutes: '00',
          seconds: '03',
        });

        expect(countdown.totalElapsed).toMatchObject<Clock>({
          milliseconds: '00',
          minutes: '00',
          seconds: '01',
        });

        jest.runAllTimers();
        await waitForNextUpdate();

        expect(spies.onEnd).toHaveBeenCalledTimes(1);

        expect(countdown.totalElapsed).toMatchObject<Clock>({
          milliseconds: '00',
          minutes: '00',
          seconds: '04',
        });
      });
    });
  });
});
