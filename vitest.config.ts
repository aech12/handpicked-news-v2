/// <reference types="vitest" />

import { fileURLToPath } from 'url'
import * as path from 'path';

import { defineConfig } from 'vitest/config'
import Vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [Vue()],
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./', import.meta.url)),
      // '#imports': path.resolve(__dirname, './.nuxt/imports.d.ts'),
      '#imports': '<rootDir>/.nuxt/imports.d.ts',
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'setup-tests.ts',
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
    exclude: ['**/tests/**', '**/tests-examples/**', '**/node_modules/**'],
  },
})
