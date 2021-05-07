/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');

const folders = fs
  .readdirSync('src', { withFileTypes: true })
  .filter((dirItem) => dirItem.isDirectory())
  .map((dirItem) => dirItem.name);

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'preact',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  overrides: [
    {
      files: ['*.tsx', '*.ts'],
      rules: {
        'simple-import-sort/sort': [
          'error',
          {
            groups: [
              // Packages. `preact` related packages come first.
              // Things that start with a lowercase letter or `@` followed by a letter.
              ['^preact', '^@?[a-z][-?\\w]*'],
              // Absolute imports and Relative imports.
              [`^@(${folders.join('|')})(/.*|$)`, '^\\.'],
              // for scss imports.
              ['^[^.]'],
            ],
          },
        ],
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['simple-import-sort', 'sort-keys-fix'],
  rules: {
    'import/order': 'off',
    'simple-import-sort/sort': 'error',
    'sort-imports': 'off',
    'sort-keys-fix/sort-keys-fix': 'error',
  },
};
