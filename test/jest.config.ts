/* eslint-disable sort-keys-fix/sort-keys-fix */

export default {
  rootDir: '../',
  preset: 'jest-preset-preact',
  setupFiles: ['<rootDir>/test/jest.setup.ts'],
  moduleNameMapper: {
    '^@Mocks$': '<rootDir>/test/mocks/',
    '^@Mocks/(.*)$': '<rootDir>/test/mocks/$1',

    '^@TestHelpers$': '<rootDir>/test/helpers/',
    '^@TestHelpers/(.*)$': '<rootDir>/test/helpers/$1',

    '^@([A-Z]\\w+)$': '<rootDir>/src/$1',
  },
};
