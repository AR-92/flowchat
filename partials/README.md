# Partials Directory

This directory contains reusable HTML partials that are shared across multiple pages to ensure consistency and reduce code duplication.

## Partial Files

1. **header.html** - Contains the navigation bar and brand identity
2. **footer.html** - Contains the footer with company information, links, and copyright
3. **scripts.html** - Contains common JavaScript code used across all pages
4. **background.html** - Contains background elements and accessibility skip link

## Usage

To use these partials in your HTML files, simply copy the content from the partial file and paste it into your main HTML file at the appropriate location.

For example, to include the header partial in your HTML file:
```html
<!-- Include header partial -->
<!-- Enhanced Professional Navbar -->
<nav class="fixed top-0 left-0 right-0 z-50 bg-dark-900/90 backdrop-blur-xl py-3 px-6">
    ...
</nav>
```

## Benefits

Using partials provides several benefits:
- **Consistency** - Ensures all pages have the same header, footer, and background elements
- **Maintainability** - Changes to common elements only need to be made in one place
- **Reduced duplication** - Eliminates the need to repeat the same code across multiple files
- **Scalability** - Makes it easier to add new pages that follow the same design patterns