# FlowChat - Professional Test Setup

## Overview

This repository contains a professionally organized, test-driven web application with comprehensive quality assurance measures. The project follows industry best practices for structure, testing, and code quality.

## Key Features

### 📁 Professional Project Structure
- Organized files in logical directories (`src/`, `tests/`, `docs/`, `scripts/`)
- Assets organized by type in `src/assets/` (css, fonts, icons, images, js, media, svgs)
- Clear separation between source code, tests, and documentation

### 🧪 Comprehensive Test Suite
- 6 test suites covering different aspects of the project
- 76 individual tests validating project integrity
- Continuous validation through automated testing
- Asset validation, HTML validation, and path resolution checks

### 💯 Code Quality Assurance
- ESLint for JavaScript linting with modern configuration
- Prettier for automated code formatting
- Custom rules for consistent code style
- npm scripts for linting and formatting

### ⚙️ Automated Organization Tools
- Automatic project organization script
- Continuous structure validation
- Utility scripts for maintenance tasks
- Asset loading resolution fixes

### 📊 Framework Migration Analysis
- CSS analysis tool to evaluate current framework usage
- Theme preservation analysis
- Migration path recommendations
- Unit conversion analysis for responsive design

## Project Structure

```
/
├── docs/                 # Documentation files
├── scripts/              # Utility scripts
├── src/                  # Source code directory
│   ├── assets/           # All static assets
│   │   ├── css/          # Stylesheets
│   │   ├── fonts/        # Font files
│   │   ├── icons/        # Icon files (including favicon)
│   │   ├── images/       # Image files
│   │   ├── js/           # JavaScript files
│   │   ├── media/        # Other media files
│   │   └── svgs/         # SVG files
│   ├── components/       # Reusable UI components
│   ├── config/           # Configuration files
│   ├── pages/            # Web pages
│   │   ├── blog/         # Blog files
│   │   └── index.html    # Main HTML file
│   ├── styles/            # Global styles
│   └── utils/            # Utility functions
├── tests/               # Test directory
│   ├── unit/            # Unit tests
│   ├── integration/     # Integration tests
│   ├── e2e/             # End-to-end tests
│   ├── helpers/         # Test helpers
│   └── fixtures/        # Test data
├── .git/                # Git repository
├── jest.config.js       # Jest configuration
├── package.json         # Project metadata and scripts
└── README.md            # Project documentation
```

## Available Scripts

### Testing
```bash
npm test                    # Run all tests
npm run test:watch         # Run tests in watch mode
npm run test:coverage      # Run tests with coverage report
npm run test:unit         # Run unit tests only
npm run test:structure    # Validate root directory structure
npm run test:assets       # Validate asset files
npm run test:path         # Validate path resolution
```

### Code Quality
```bash
npm run lint              # Check code for linting errors
npm run lint:fix          # Automatically fix linting errors
npm run format            # Format code according to style guidelines
npm run format:check      # Check if code is formatted correctly
```

### Organization
```bash
npm run organize:root     # Automatically organize root directory
npm run validate:html    # Validate HTML files
npm run validate:assets   # Validate asset files
npm run validate:git     # Validate Git setup
npm run analyze:css       # Analyze CSS for framework migration
```

## Documentation

Comprehensive documentation is available in the `docs/` directory:

- [Project Organization Summary](docs/PROJECT_ORGANIZATION_SUMMARY.md)
- [Complete Project Setup](docs/COMPLETE_PROJECT_SETUP.md)
- [Testing Guide](docs/TESTING.md)
- [Code Quality Guide](docs/CODE_QUALITY.md)
- [Asset Loading Resolution](docs/ASSET_LOADING_RESOLUTION.md)
- [Framework Migration Analysis](docs/FRAMEWORK_MIGRATION_ANALYSIS.md)

## Validation Results

All validation checks are passing:
- ✅ 76 tests passed across 6 test suites
- ✅ Asset validation confirms all files exist
- ✅ Path resolution confirms correct structure
- ✅ Root structure validation confirms clean organization
- ✅ HTML structure validation confirms proper formatting
- ✅ Code quality validation confirms consistent style

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Run tests: `npm test`
4. Check code quality: `npm run lint`
5. Format code: `npm run format`

## Contributing

This project follows industry best practices for contributions:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.