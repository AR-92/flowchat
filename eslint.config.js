// ESLint configuration for a project using ES modules
import eslint from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import pluginPrettier from 'eslint-plugin-prettier';

export default [
  {
    // Global ignores
    ignores: [
      'node_modules/',
      'dist/',
      'build/',
      'coverage/',
      '!.eslintrc.js',
      'src/assets/js/svg-loader-static.js',
      'scripts/css-migration-helper.js',
      'tests/unit/framework-migration-helper.test.js',
      'index.html',
    ],
  },
  eslint.configs.recommended,
  prettierConfig,
  {
    // Global settings
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        // Browser globals
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        fetch: 'readonly',
        HTMLElement: 'readonly',

        // Node.js globals
        require: 'readonly',
        module: 'readonly',
        exports: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        process: 'readonly',

        // Jest globals
        describe: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        it: 'readonly',
        beforeAll: 'readonly',
        beforeEach: 'readonly',
        afterAll: 'readonly',
        afterEach: 'readonly',
        jest: 'readonly',
      },
    },

    // Plugins
    plugins: {
      prettier: pluginPrettier,
    },

    // Rules
    rules: {
      // Prettier integration
      'prettier/prettier': 'error',

      // General rules
      'no-console': 'warn',
      'no-unused-vars': 'error',
      'no-undef': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      eqeqeq: 'error',
      curly: 'error',
      'brace-style': ['error', '1tbs'],
      camelcase: 'error',
      'comma-dangle': ['error', 'always-multiline'],
      'comma-spacing': 'error',
      'comma-style': 'error',
      'dot-location': ['error', 'property'],
      'eol-last': 'error',
      'func-call-spacing': 'error',
      indent: ['error', 2],
      'key-spacing': 'error',
      'keyword-spacing': 'error',
      'linebreak-style': ['error', 'unix'],
      'max-len': ['warn', { code: 100 }],
      'new-cap': 'error',
      'new-parens': 'error',
      'no-multiple-empty-lines': ['error', { max: 1 }],
      'no-trailing-spaces': 'error',
      'object-curly-spacing': ['error', 'always'],
      'one-var': ['error', 'never'],
      'padded-blocks': ['error', 'never'],
      'quote-props': ['error', 'as-needed'],
      'semi-spacing': 'error',
      'space-before-blocks': 'error',
      'space-before-function-paren': ['error', 'never'],
      'space-in-parens': 'error',
      'space-infix-ops': 'error',
      'space-unary-ops': 'error',
    },
  },
];
