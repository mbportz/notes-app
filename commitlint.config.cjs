/** @type {import('@commitlint/types').UserConfig} */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Optional stricter rules:
    'subject-empty': [2, 'never'],
    'header-max-length': [2, 'always', 72],
  },
};
