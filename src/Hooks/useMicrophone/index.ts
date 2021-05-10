import { useCallback, useEffect, useState } from 'preact/hooks';

import { askPermissionSafe, queryMicrophonePermission } from './helpers';

export type MicrophoneState = {
  isMicrophoneAllowed: boolean;
};

/**
 * Provides the microphone permission state
 * @returns {MicrophoneState} MicrophoneState
 */
export const useMicrophone = (): MicrophoneState => {
  const [isAllowed, setAllowed] = useState(false);

  const onMount = useCallback(async () => {
    try {
      const permission = await queryMicrophonePermission();

      setAllowed(permission.state === 'granted');

      permission.addEventListener('change', async function () {
        if (this.state === 'granted') {
          setAllowed(true);
        } else {
          setAllowed(await askPermissionSafe());
        }
      });
    } catch {
      setAllowed(await askPermissionSafe());
    }
  }, []);

  useEffect(() => {
    onMount();
  }, [onMount]);

  return { isMicrophoneAllowed: isAllowed };
};
