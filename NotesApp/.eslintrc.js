/* eslint-env node */
module.exports = {
  root: true,
  extends: [
    '@react-native', // RN base rules
    'plugin:@typescript-eslint/recommended',
    'plugin:jest/recommended', // pulled in by @react-native/eslint-config deps
    'prettier', // turn off rules that conflict with Prettier
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project: undefined, // set to './tsconfig.json' if you need type-aware linting
  },
  env: { 'jest/globals': true },
  rules: {
    'prettier/prettier': ['warn'],
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    'no-console': ['warn', { allow: ['warn', 'error'] }],
  },
  overrides: [
    {
      files: ['**/__tests__/**/*.{ts,tsx}', '**/*.test.{ts,tsx}'],
      env: { jest: true },
    },
  ],
  ignorePatterns: ['node_modules/', 'android/', 'ios/', 'dist/', 'build/'],
};
