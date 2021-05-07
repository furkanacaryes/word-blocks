import { renderHook } from '@testing-library/preact-hooks';

import { MicrophoneState, useMicrophone } from './index';
import { askPermissionSafe, queryMicrophonePermission } from './index.helpers';

import { permissionMock } from '@Mocks';
import { allowQuery, mockNavigator } from '@TestHelpers/navigator';

afterAll(() => {
  // ? Reset back to defaults
  mockNavigator();
});

describe('useMicrophone', () => {
  describe('behaviours', () => {
    it('should return expected shape and initial value', async () => {
      const { result } = renderHook(() => useMicrophone());

      expect(result.current).toMatchObject<MicrophoneState>({ isMicrophoneAllowed: false });
    });

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

  describe('helpers', () => {
    describe('askPermissionSafe', () => {
      it('resolves to `true` ONLY if the permission is `granted`', async () => {
        await permissionMock.triggerChange('granted');

        return expect(askPermissionSafe()).resolves.toBe(true);
      });

      it('otherwise, resolves to `false` instead of throwing', async () => {
        await permissionMock.triggerChange('denied');

        return expect(askPermissionSafe()).resolves.toBe(false);
      });
    });

    describe('queryMicrophonePermission', () => {
      describe('when `microphone` is queryable', () => {
        it('should resolve', () => {
          allowQuery(true);

          return expect(queryMicrophonePermission()).resolves.not.toThrow();
        });
      });

      describe('when `microphone` is NOT queryable', () => {
        it('should throw a friendly error along with the original', () => {
          allowQuery(false);

          return expect(queryMicrophonePermission()).rejects.toMatchInlineSnapshot(`
            Object {
              "message": "Couldn't query the 'microphone' permission on this browser.",
              "originalError": undefined,
            }
          `);
        });
      });
    });
  });
});
