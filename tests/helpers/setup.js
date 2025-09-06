// Professional test setup file
// This file runs before each test file

// Mock console methods to track warnings and errors
const originalError = console.error;
const originalWarn = console.warn;

console.error = function (...args) {
  // Log the error but don't fail the test automatically
  console.log('_CONSOLE_ERROR_', ...args);
  originalError.apply(console, args);
};

console.warn = function (...args) {
  // Log the warning but don't fail the test automatically
  console.log('_CONSOLE_WARN_', ...args);
  originalWarn.apply(console, args);
};

// Clean up DOM after each test
afterEach(() => {
  // Clear any timers
  jest.clearAllTimers();

  // Reset any mocks
  jest.resetAllMocks();
});
