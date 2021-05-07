/* eslint-disable sort-keys-fix/sort-keys-fix */

export default {
  rootDir: '../',
  preset: 'jest-preset-preact',
  setupFiles: ['<rootDir>/test/jest.setup.ts'],
  moduleNameMapper: {
    // ? Anything which starts with '@' followed by 'Capitalizedword'
    '^@([A-Z]\\w+)$': '<rootDir>/src/$1',
  },
};
