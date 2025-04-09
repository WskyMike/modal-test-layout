import js from '@eslint/js';
import css from '@eslint/css';
import eslintConfigPrettier from 'eslint-config-prettier';
import prettier from 'eslint-plugin-prettier';
import html from 'eslint-plugin-html';

export default [
  // CSS линтинг
  {
    files: ['**/*.css'],
    language: 'css/css',
    ...css.configs.recommended,
  },

  // Базовый JavaScript линтинг
  js.configs.recommended,
  eslintConfigPrettier,

  // Основная конфигурация
  {
    files: ['**/*.js', '**/*.html'],
    languageOptions: {
      globals: {
        // Браузерные глобалы
        document: 'readonly',
        window: 'readonly',
        console: 'readonly',
        // Node.js глобалы
        module: 'readonly',
        require: 'readonly',
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      html,
      prettier,
    },
    rules: {
      // Базовые правила
      indent: ['error', 2],
      'linebreak-style': ['error', 'unix'],
      quotes: ['error', 'single'],
      semi: ['error', 'always'],

      // Дополнительные правила
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-unused-vars': 'warn',
      'prefer-const': 'warn',
      'arrow-body-style': ['error', 'as-needed'],
      'arrow-parens': ['error', 'as-needed'],

      // Правила для улучшения читаемости
      'max-len': ['warn', { code: 100 }],
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }],
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ['error', 'never'],

      // Правила для предотвращения ошибок
      'no-var': 'error',
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-new-func': 'error',
      'no-new-wrappers': 'error',
    },
  },
];
