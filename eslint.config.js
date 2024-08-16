module.exports = [
  {
    ignores: ['node_modules/**'],
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      'prefer-const': 'error',
      'new-cap': ['error', { capIsNewExceptions: ['Router'] }],
      'indent': ['error', 2],
    },
  },
];
  