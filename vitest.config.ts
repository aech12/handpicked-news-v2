/// <reference types="vitest" />

import { fileURLToPath } from 'url'
import * as path from 'path'

import { defineConfig } from 'vitest/config'
import Vue from '@vitejs/plugin-vue'

import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  plugins: [
    Vue(),
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/, /\.vue\?vue/, // .vue
        /\.md$/, // .md
      ],
      imports: [
        // presets
        'vue',
        'vue-router',
        // custom
        {
          '@vueuse/core': [
            // named imports
            'useMouse', // import { useMouse } from '@vueuse/core',
            // alias
            ['useFetch', 'useMyFetch'], // import { useFetch as useMyFetch } from '@vueuse/core',
          ],
          '@nuxtjs/supabase': [
            'useSupabaseClient',
          ],
        },
      ],
    }),
  ],
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
