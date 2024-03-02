module.exports = {
  extends: ['eason', 'plugin:storybook/recommended'],
  overrides: [
    {
      files: '**/*.{ts,tsx}',
      extends: ['next/core-web-vitals', 'eason/typescript'],
      rules: {
        // 'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': [
          'warn',
          {
            args: 'none',
          },
        ],
      },
    },
  ],
};
