import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    extends: [js.configs.recommended, reactRefresh.configs.vite],
    plugins: {
      'react-hooks': reactHooks,
    },
    rules: reactHooks.configs['recommended-latest'].rules,
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true }, sourceType: 'module' },
    },
  },
])
