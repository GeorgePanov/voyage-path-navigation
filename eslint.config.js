import js from '@eslint/js';
import globals from 'globals';
import perfectionist from 'eslint-plugin-perfectionist';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    plugins: {
      perfectionist,
    },
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      'perfectionist/sort-imports': [
        'warn',
        {
          type: 'natural',
          order: 'asc',

          groups: [
            'type',
            'builtin',
            'external',
            'app',
            'components',
            'shared',
            'internal',
            ['parent', 'sibling', 'index'],
            'side-effect',
            'unknown',
          ],

          customGroups: [
            {
              groupName: 'app',
              elementNamePattern: '~/app/',
            },
            {
              groupName: 'components',
              elementNamePattern: '~/components/',
            },
            {
              groupName: 'shared',
              elementNamePattern: '~/shared/',
            },
          ],
        },
      ],

      '@typescript-eslint/no-unused-vars': ['warn'],
    },
  },
]);
