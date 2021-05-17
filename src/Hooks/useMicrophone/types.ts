export type MicrophoneState = Partial<{
  result: {
    isGranted: boolean;
  };
  error: string;
}>;

export enum MicrophoneActions {
  SetError,
  SetGranted,
}
