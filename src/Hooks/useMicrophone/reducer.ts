import { Reducer } from 'preact/hooks';

import { Action } from '@Types/Action';
import { MicrophoneActions, MicrophoneState } from './types';

export const reducer: Reducer<MicrophoneState, Action<MicrophoneActions>> = (
  state,
  { type, payload },
) => {
  switch (type) {
    case MicrophoneActions.SetError:
      return {
        ...state,
        error: payload as string,
        result: undefined,
      };
    case MicrophoneActions.SetGranted:
      return {
        ...state,
        error: undefined,
        result: {
          isGranted: payload as boolean,
        },
      };
    default:
      return state;
  }
};
