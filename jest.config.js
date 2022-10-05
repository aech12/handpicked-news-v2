module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['js', 'jsx', 'mjs', 'ts', 'vue'],
  moduleNameMapper: {
    '^~/(.*)': '<rootDir>/$1',
    '#imports': '<rootDir>/.nuxt/imports.d.ts',
    // '#imports':
      // '<rootDir>/node_modules/nuxt3/dist/pages/runtime/composables.mjs',
  },
  transform: {
    '^.+\\.(js|jsx|mjs)$': 'babel-jest',
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '.+\\.(css|scss|png|jpg|svg)$': 'jest-transform-stub',
    '.*\\.(vue)$': '@vue/vue3-jest',
  },
  transformIgnorePatterns: ['node_modules/(?!(nuxt3|unenv))'],
  setupFiles: ['./global-test-utils-config.ts'],
  testPathIgnorePatterns: ['/node_modules/', 'tests'],
  testEnvironmentOptions: {
    customExportConditions: ['node', 'node-addons'],
  },
}
