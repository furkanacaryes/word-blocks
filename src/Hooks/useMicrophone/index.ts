import { useCallback, useEffect, useReducer, useRef } from 'preact/hooks';

import { askPermissionSafe, queryMicrophonePermission } from './helpers';
import { reducer } from './reducer';
import { MicrophoneActions, MicrophoneState } from './types';

/**
 * Provides the microphone permission state
 * @returns {MicrophoneState} MicrophoneState
 */
export const useMicrophone = (): MicrophoneState => {
  const permission = useRef<PermissionStatus>();

  const [state, dispatch] = useReducer(reducer, {});

  const setGranted = (is: boolean) => {
    dispatch({ payload: is, type: MicrophoneActions.SetGranted });
  };

  const setError = (error: string) => {
    dispatch({ payload: error, type: MicrophoneActions.SetError });
  };

  const syncState = useCallback(async () => {
    const isGranted = permission.current?.state === 'granted';

    if (isGranted) return setGranted(true);

    const isGrantedFallback = await askPermissionSafe();

    if (isGrantedFallback) return setGranted(true);

    setError('You need to give permission for microphone.');
  }, []);

  const onMount = useCallback(async () => {
    try {
      permission.current = await queryMicrophonePermission();

      syncState();

      permission.current.addEventListener('change', syncState);
    } catch {
      syncState();
    }
  }, [syncState]);

  const onUnmount = useCallback(() => {
    permission.current?.removeEventListener('change', syncState);
  }, [syncState]);

  useEffect(() => {
    onMount();

    return onUnmount;
  }, [onMount, onUnmount]);

  return state;
};
