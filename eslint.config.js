import reactPlugin from 'eslint-plugin-react';
import typescriptEslintParser from '@typescript-eslint/parser';
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';

export default [
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: typescriptEslintParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 2021,
        sourceType: 'module',
      },
    },
    plugins: {
      react: reactPlugin,
      '@typescript-eslint': typescriptEslintPlugin,
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...typescriptEslintPlugin.configs.recommended.rules,
      'react/prop-types': 'off',
      'semi': ['error', 'always'],
      'quotes': ['error', 'single'],
    },
  },
];
