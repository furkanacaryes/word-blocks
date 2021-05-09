import { renderHook } from '@testing-library/preact-hooks';

import { MicrophoneState, useMicrophone } from './index';

import { permissionMock } from '@Mocks';
import { resetMockNavigator } from '@TestHelpers/navigator';

afterAll(() => {
  resetMockNavigator();
});

describe('useMicrophone', () => {
  describe('provided value', () => {
    it('should return expected shape and initial value', async () => {
      const { result } = renderHook(() => useMicrophone());

      expect(result.current).toMatchObject<MicrophoneState>({ isMicrophoneAllowed: false });
    });
  });

  describe('behaviours', () => {
    it('should listen changes and update state accordingly', async () => {
      const { result, waitForNextUpdate } = renderHook(() => useMicrophone());

      // ? Initial values
      expect(result.current?.isMicrophoneAllowed).toBe(false);

      // ? onMount
      await waitForNextUpdate();
      expect(result.current?.isMicrophoneAllowed).toBe(true);

      await permissionMock.triggerChange('denied');

      expect(result.current?.isMicrophoneAllowed).toBe(false);
    });
  });
});
