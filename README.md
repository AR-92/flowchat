# Project Structure

This document outlines the professional organization of the project files.

## Root Directory

```
/
├── docs/                 # Documentation files
├── scripts/              # Utility scripts
├── src/                 # Source code directory
│   ├── assets/          # All static assets
│   │   ├── css/         # Stylesheets
│   │   ├── fonts/        # Font files
│   │   ├── icons/        # Icon files (including favicon)
│   │   ├── images/       # Image files
│   │   ├── js/           # JavaScript files
│   │   ├── media/        # Other media files
│   │   └── svgs/         # SVG files
│   ├── components/      # Reusable UI components
│   ├── config/           # Configuration files
│   ├── pages/           # Web pages
│   │   ├── blog/         # Blog files
│   │   │   └── rss.xml   # RSS feed
│   │   └── index.html    # Main HTML file (moved to root)
│   ├── styles/           # Global styles
│   └── utils/            # Utility functions
├── tests/               # Test directory
│   ├── unit/            # Unit tests
│   ├── integration/     # Integration tests
│   ├── e2e/             # End-to-end tests
│   ├── helpers/         # Test helpers
│   └── fixtures/        # Test data
├── .git/                # Git repository
├── .gitignore           # Git ignore file
├── jest.config.js       # Jest configuration
├── package.json         # Project metadata and scripts
└── README.md            # Project documentation
```

## Key Improvements

1. **Consistent Naming**: All directories use lowercase with hyphens
2. **Logical Grouping**: Related files are grouped together
3. **Separation of Concerns**: Tests, source code, and configuration are separated
4. **Scalable Structure**: Easy to add new components, pages, or assets
5. **Professional Standards**: Follows common web development conventions

## Asset Organization

All static assets are organized in `src/assets/` by type:

- `css/` - Stylesheets
- `fonts/` - Font files
- `icons/` - Icon files (including favicon)
- `images/` - Image files
- `js/` - JavaScript files
- `media/` - Other media files
- `svgs/` - SVG files

This organization makes it easy to locate and manage assets.

## Automated Organization

The project includes automated tools to maintain clean organization:

- `npm run test:structure` - Validates directory structure
- `npm run organize:root` - Automatically organizes root directory

## Code Quality

The project includes automated code quality tools:

- `npm run lint` - Checks code for linting errors
- `npm run lint:fix` - Automatically fixes linting errors where possible
- `npm run format` - Formats code according to project style guidelines
- `npm run format:check` - Checks if code is formatted correctly

See `docs/CODE_QUALITY.md` for complete details.
