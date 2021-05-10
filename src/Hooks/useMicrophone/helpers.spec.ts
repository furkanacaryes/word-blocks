import { askPermissionSafe, queryMicrophonePermission } from './helpers';

import { permissionMock } from '@Mocks';
import { allowQuery, resetMockNavigator } from '@TestHelpers/navigator';

afterAll(() => {
  resetMockNavigator();
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
