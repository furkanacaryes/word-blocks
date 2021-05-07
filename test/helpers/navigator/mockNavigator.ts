import { permissionMock } from '@Mocks/permission.mock';

export const mockNavigator = (): void => {
  Object.defineProperties(global.navigator, {
    mediaDevices: {
      value: {
        getUserMedia: jest.fn(() => {
          return permissionMock.state === 'granted' ? Promise.resolve() : Promise.reject();
        }),
      },
      writable: true,
    },
    permissions: {
      value: {
        query: jest.fn(() => Promise.resolve(permissionMock)),
      },
      writable: true,
    },
  });
};
