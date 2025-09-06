# Code Quality Setup

This document explains the code quality tools and configuration used in this project.

## Linting with ESLint

ESLint is a static code analysis tool that helps identify syntax errors, style issues, and potential bugs in JavaScript code.

### Configuration

The project uses a modern ESLint configuration with the flat config format in `eslint.config.js`. This configuration includes:

1. Recommended ESLint rules
2. Prettier integration for code formatting
3. Custom rules for code style and best practices

### Scripts

The following npm scripts are available for linting:

- `npm run lint` - Checks code for linting errors
- `npm run lint:fix` - Automatically fixes linting errors where possible
- `npm run lint:auto-fix` - Runs an automated script to fix common linting issues

## Formatting with Prettier

Prettier is an opinionated code formatter that enforces consistent code style across the project.

### Configuration

The project uses a Prettier configuration in `.prettierrc` that specifies:

- Single quotes for strings
- No semicolons at the end of statements
- 2-space indentation
- Trailing commas where applicable

### Scripts

The following npm scripts are available for formatting:

- `npm run format` - Formats code according to project style guidelines
- `npm run format:check` - Checks if code is formatted correctly

## Best Practices

1. Run the linter before committing code to ensure it meets project standards
2. Use the automatic fix options when possible to save time on formatting
3. Configure your editor to format on save using Prettier for a seamless workflow
4. Address all linting errors before submitting pull requests
5. Use `npm run lint:auto-fix` to automatically fix common linting issues

## Troubleshooting

If you encounter issues with the linter or formatter:

1. Ensure all dependencies are installed with `npm install`
2. Check that your editor is using the project's ESLint and Prettier configurations
3. Run the tools from the command line to see detailed error messages
4. Refer to the official ESLint and Prettier documentation for configuration options
