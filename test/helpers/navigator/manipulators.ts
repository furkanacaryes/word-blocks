const dynamicMock = (shouldResolve: boolean) => {
  return jest.fn(() => (shouldResolve ? Promise.resolve() : Promise.reject()));
};

/**
 * Manipulates `navigator.mediaDevices.getUserMedia()` for expectations.
 * @param shouldResolve Whether the inner promise should resolve
 */
export const allowUserMedia = (shouldResolve: boolean): void => {
  Object.defineProperty(global.navigator.mediaDevices, 'getUserMedia', {
    value: dynamicMock(shouldResolve),
    writable: true,
  });
};

/**
 * Manipulates `navigator.permissions.query()` function for expectations.
 * @param {boolean} shouldResolve Whether the inner promise should resolve
 */
export const allowQuery = (shouldResolve: boolean): void => {
  Object.defineProperty(global.navigator.permissions, 'query', {
    value: dynamicMock(shouldResolve),
    writable: true,
  });
};
