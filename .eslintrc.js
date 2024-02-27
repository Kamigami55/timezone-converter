module.exports = {
  extends: ['eason'],
  overrides: [
    {
      files: '**/*.{ts,tsx}',
      extends: ['next/core-web-vitals', 'eason/typescript'],
    },
  ],
};
