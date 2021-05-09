export type CountdownProps = {
  duration: number;
  frequency?: number;
  onEnd: (totalElapsed: Clock) => void;
};

export type Countdown = {
  lapse: () => void;
  start: () => void;
  pause: () => void;
  reset: (keepTotalElapsed?: boolean) => void;
  totalElapsed: Clock;
  remaining: Clock;
};

export type Clock = Record<'minutes' | 'seconds' | 'milliseconds', string>;
