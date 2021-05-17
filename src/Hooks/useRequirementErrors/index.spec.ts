import { renderHook } from '@testing-library/preact-hooks';

import { useRequirementErrors } from './index';

describe('useRequirementErrors', () => {
  describe('when browser is compatible', () => {
    it('should return expected shape with correct values', async () => {
      // TODO: pretend to allow microphone perm
      // TODO: pretend like speech is supported
      const { result, waitForNextUpdate } = renderHook(() => useRequirementErrors());

      await waitForNextUpdate(); // ? Wait for onMount

      expect(result.current).toMatchInlineSnapshot();
    });
  });

  describe('when browser is NOT compatible', () => {
    it('should return expected shape with correct values', async () => {
      // TODO: pretend to deny microphone perm
      // TODO: pretend like speech is NOT supported
      const { result, waitForNextUpdate } = renderHook(() => useRequirementErrors());

      await waitForNextUpdate();

      expect(result.current).toMatchInlineSnapshot();
    });
  });
});
