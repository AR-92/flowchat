module.exports = {
  // Root directories to search for tests
  roots: ['<rootDir>/tests'],

  // Test environment
  testEnvironment: 'jsdom',

  // Test file patterns
  testMatch: [
    '**/tests/unit/**/*.test.js',
    '**/tests/unit/**/*.spec.js',
    '**/tests/integration/**/*.test.js',
    '**/tests/integration/**/*.spec.js',
    '**/tests/e2e/**/*.test.js',
    '**/tests/e2e/**/*.spec.js',
  ],

  // File extensions to look for
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],

  // Setup files
  setupFilesAfterEnv: ['<rootDir>/tests/helpers/setup.js'],

  // Ignore patterns
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/build/'],

  // Coverage settings
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!src/**/*.d.ts'],

  // Verbose output
  verbose: true,

  // Clear mocks
  clearMocks: true,
};
