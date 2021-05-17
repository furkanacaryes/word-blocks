import { renderHook } from '@testing-library/preact-hooks';

import { useMicrophone } from './index';
import { MicrophoneState } from './types';

import { permissionMock } from '@Mocks';
import { allowUserMedia, resetMockNavigator } from '@TestHelpers/navigator';

afterAll(() => {
  resetMockNavigator();
});

describe('useMicrophone', () => {
  describe('provided value', () => {
    it('should return expected shape and initial value', async () => {
      const { result, waitForNextUpdate } = renderHook(() => useMicrophone());

      // ? Initial values
      expect(result.current).toMatchObject({});

      // ? onMount
      await waitForNextUpdate();
      expect(result.current).toStrictEqual<MicrophoneState>({
        error: undefined,
        result: {
          isGranted: true,
        },
      });
    });
  });

  describe('behaviours', () => {
    it('should update state as expected on denial', async () => {
      const { result, waitForNextUpdate } = renderHook(() => useMicrophone());

      await waitForNextUpdate();

      await permissionMock.triggerChange('denied');
      expect(result.current).toStrictEqual<MicrophoneState>({
        error: 'You need to give permission for microphone.',
        result: undefined,
      });
    });

    it('should update state as expected on approval', async () => {
      const { result, waitForNextUpdate } = renderHook(() => useMicrophone());

      await waitForNextUpdate();

      await permissionMock.triggerChange('granted');
      expect(result.current).toStrictEqual<MicrophoneState>({
        error: undefined,
        result: {
          isGranted: true,
        },
      });
    });

    it('should ask permission then updates state accordinly', async () => {
      const { result, waitForNextUpdate } = renderHook(() => useMicrophone());

      await waitForNextUpdate();

      allowUserMedia(true);
      await permissionMock.triggerChange('prompt');
      expect(result.current).toStrictEqual<MicrophoneState>({
        error: undefined,
        result: {
          isGranted: true,
        },
      });

      allowUserMedia(false);
      await permissionMock.triggerChange('prompt');
      expect(result.current).toStrictEqual<MicrophoneState>({
        error: 'You need to give permission for microphone.',
        result: undefined,
      });
    });
  });
});
