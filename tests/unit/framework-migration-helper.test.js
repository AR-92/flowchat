const fs = require('fs');
const path = require('path');

// Framework Migration Helper Tests
describe('Framework Migration Helper', () => {
  let htmlContent;
  const cssContent = {};
  const classMap = {};

  beforeAll(() => {
    // Read the HTML file
    const htmlPath = path.join(__dirname, '../../index.html');
    htmlContent = fs.readFileSync(htmlPath, 'utf8');

    // Read CSS files
    const cssFiles = [
      '../../src/assets/css/inline-styles.css',
      '../../src/assets/css/layout-fixes.css',
    ];

    cssFiles.forEach(cssFile => {
      try {
        const cssPath = path.join(__dirname, cssFile);
        if (fs.existsSync(cssPath)) {
          cssContent[cssFile] = fs.readFileSync(cssPath, 'utf8');
        }
      } catch (error) {
        console.warn(`Could not read CSS file: ${cssFile}`);
      }
    });
  });

  // CSS Framework Compatibility Tests
  describe('CSS Framework Compatibility', () => {
    test('should identify custom CSS classes', () => {
      // Extract all class names from HTML
      const classMatches = htmlContent.match(/class=["']([^"']+)["']/g) || [];
      const allClasses = [];

      classMatches.forEach(match => {
        const classes = match.match(/class=["']([^"']+)["']/)[1].split(' ');
        allClasses.push(...classes);
      });

      // Filter out utility classes that might be framework-specific
      const customClasses = allClasses.filter(
        cls =>
          !cls.startsWith('col-') &&
          !cls.startsWith('row') &&
          !cls.startsWith('container') &&
          !cls.startsWith('d-') &&
          !cls.startsWith('justify-') &&
          !cls.startsWith('align-') &&
          !cls.startsWith('btn') &&
          !cls.startsWith('alert') &&
          !cls.startsWith('card'),
      );

      expect(customClasses.length).toBeGreaterThan(0);

      // Store for later use
      classMap.custom = [...new Set(customClasses)];
    });

    test('should identify Bootstrap-like classes', () => {
      const bootstrapClasses = [
        'container',
        'container-fluid',
        'row',
        'col-',
        'col-lg-',
        'col-md-',
        'col-sm-',
        'btn',
        'btn-',
        'alert',
        'card',
        'd-flex',
        'justify-content-',
        'align-items-',
      ];

      let foundBootstrapClasses = [];

      bootstrapClasses.forEach(bootstrapClass => {
        const regex = new RegExp(`class=["'][^"']*${bootstrapClass}[^"']*["']`, 'gi');
        const matches = htmlContent.match(regex) || [];
        foundBootstrapClasses = foundBootstrapClasses.concat(matches);
      });

      // Store for later use
      classMap.bootstrap = [...new Set(foundBootstrapClasses)];

      // Log the finding but don't fail the test
      console.log(`Found ${foundBootstrapClasses.length} Bootstrap-like classes`);
    });

    test('should identify Tailwind-like classes', () => {
      // Look for utility-first CSS classes
      const utilityPattern =
        /class=["'][^"']*(m[xyltpb]-\d+|p[xyltpb]-\d+|w-\w+|h-\w+|text-\w+|bg-\w+|flex|grid|rounded)[^"']*["']/gi;
      const utilityMatches = htmlContent.match(utilityPattern) || [];

      // Store for later use
      classMap.tailwind = [...new Set(utilityMatches)];

      // Log the finding but don't fail the test
      console.log(`Found ${utilityMatches.length} Tailwind-like utility classes`);
    });

    test('should analyze CSS custom properties (variables)', () => {
      Object.keys(cssContent).forEach(cssFile => {
        const css = cssContent[cssFile];
        const varMatches = css.match(/--[\w-]+:/g) || [];
        console.log(`Found ${varMatches.length} CSS custom properties in ${cssFile}`);
      });
    });
  });

  // Theme Preservation Tests
  describe('Theme Preservation Validation', () => {
    test('should identify color schemes', () => {
      // Look for color-related classes
      const colorPatterns = ['text-', 'bg-', 'border-', 'color-'];

      let colorClasses = [];
      colorPatterns.forEach(pattern => {
        const regex = new RegExp(`class=["'][^"']*${pattern}[\\w\\d-]+[^"']*["']`, 'gi');
        const matches = htmlContent.match(regex) || [];
        colorClasses = colorClasses.concat(matches);
      });

      console.log(`Found ${colorClasses.length} color-related classes`);
      expect(colorClasses.length).toBeGreaterThan(0);
    });

    test('should identify typography classes', () => {
      const typographyPatterns = ['font-', 'text-', 'display-', 'lead', 'small'];

      let typographyClasses = [];
      typographyPatterns.forEach(pattern => {
        const regex = new RegExp(`class=["'][^"']*${pattern}[\\w\\d-]*[^"']*["']`, 'gi');
        const matches = htmlContent.match(regex) || [];
        typographyClasses = typographyClasses.concat(matches);
      });

      console.log(`Found ${typographyClasses.length} typography classes`);
      expect(typographyClasses.length).toBeGreaterThan(0);
    });

    test('should identify spacing classes', () => {
      const spacingPatterns = [
        'm-',
        'mx-',
        'my-',
        'mt-',
        'mr-',
        'mb-',
        'ml-',
        'p-',
        'px-',
        'py-',
        'pt-',
        'pr-',
        'pb-',
        'pl-',
        'gap-',
        'space-',
      ];

      let spacingClasses = [];
      spacingPatterns.forEach(pattern => {
        const regex = new RegExp(`class=["'][^"']*${pattern}[\\w\\d-]*[^"']*["']`, 'gi');
        const matches = htmlContent.match(regex) || [];
        spacingClasses = spacingClasses.concat(matches);
      });

      console.log(`Found ${spacingClasses.length} spacing classes`);
      expect(spacingClasses.length).toBeGreaterThan(0);
    });
  });

  // Migration Path Analysis
  describe('Migration Path Analysis', () => {
    test('should generate migration report data', () => {
      const report = {
        totalElements: {
          images: (htmlContent.match(/<img/gi) || []).length,
          links: (htmlContent.match(/<link/gi) || []).length,
          scripts: (htmlContent.match(/<script/gi) || []).length,
          classes: (htmlContent.match(/class=/gi) || []).length,
        },
        customClasses: classMap.custom ? classMap.custom.length : 0,
        frameworkIndicators: {
          bootstrap: classMap.bootstrap ? classMap.bootstrap.length : 0,
          tailwind: classMap.tailwind ? classMap.tailwind.length : 0,
        },
        assets: {
          cssFiles: Object.keys(cssContent).length,
          inlineStyles: (htmlContent.match(/<style/gi) || []).length,
        }
      };

      console.log('Migration Report Data:', JSON.stringify(report, null, 2));
      expect(report.totalElements.images).toBeGreaterThan(0);
    });

    test('should identify framework-specific markup patterns', () => {
      // Look for data attributes commonly used by frameworks
      const dataAttributes = [
        'data-toggle',
        'data-target',
        'data-dismiss',
        'data-bs-',
        'data-tippy',
        'data-tooltip',
      ];

      let frameworkAttributes = [];
      dataAttributes.forEach(attr => {
        const regex = new RegExp(`${attr}=`, 'gi');
        const matches = htmlContent.match(regex) || [];
        frameworkAttributes = frameworkAttributes.concat(matches);
      });

      console.log(`Found ${frameworkAttributes.length} framework-specific data attributes`);
    });

    test('should identify component patterns', () => {
      // Look for common component class patterns
      const componentPatterns = [
        'navbar',
        'dropdown',
        'modal',
        'carousel',
        'accordion',
        'tab',
        'breadcrumb',
        'pagination',
      ];

      let components = [];
      componentPatterns.forEach(pattern => {
        const regex = new RegExp(`class=["'][^"']*${pattern}[\\w\\d-]*[^"']*["']`, 'gi');
        const matches = htmlContent.match(regex) || [];
        components = components.concat(matches);
      });

      console.log(`Found ${components.length} component-like classes`);
    });
  });

  // CSS Analysis for Migration
  describe('CSS Analysis for Migration', () => {
    test('should analyze CSS specificity', () => {
      Object.keys(cssContent).forEach(cssFile => {
        const css = cssContent[cssFile];
        // Count selectors by complexity
        const simpleSelectors = (css.match(/[^{]+\{/g) || []).length;
        const complexSelectors = (css.match(/[^{]+>[^{]+\{/g) || []).length;

        console.log(
          `${cssFile}: ${simpleSelectors} simple selectors, ${complexSelectors} complex selectors`
        );
      });
    });

    test('should identify CSS units used', () => {
      Object.keys(cssContent).forEach(cssFile => {
        const css = cssContent[cssFile];
        const unitRegex = /(\d*\.?\d+)(px|em|rem|%|vw|vh|pt|pc|in|mm|cm|ex|ch|vmin|vmax)/gi;
        const units = css.match(unitRegex) || [];
        const uniqueUnits = [
          ...new Set(
            units
              .map(u => {
                const match = u.match(/[a-z]+/i);
                return match ? match[0] : '';
              })
              .filter(u => u !== '')
          ),

        console.log(`${cssFile} uses units: ${uniqueUnits.join(', ')}`);
      });
    });

    test('should identify CSS preprocessors usage', () => {
      Object.keys(cssContent).forEach(cssFile => {
        const css = cssContent[cssFile];
        // Look for SCSS/SASS like nesting
        const nestedRules = (css.match(/[^{}]+[^{}]*\{/g) || []).length;

        console.log(`${cssFile}: ${nestedRules} potentially nested rules`);
      });
    });
  });

  // Theme Consistency Tests
  describe('Theme Consistency Validation', () => {
    test('should check for consistent naming conventions', () => {
      // Look for BEM, camelCase, kebab-case, etc.
      const classMatches = htmlContent.match(/class=["']([^"']+)["']/g) || [];
      const namingPatterns = {
        kebab: 0,
        camel: 0,
        snake: 0,
        bem: 0
      };

      classMatches.forEach(match => {
        const classes = match.match(/class=["']([^"']+)["']/)[1].split(' ');
        classes.forEach(cls => {
          if (cls.includes('-')) {namingPatterns.kebab++;}
          if (/[a-z][A-Z]/.test(cls)) {namingPatterns.camel++;}
          if (cls.includes('_')) {namingPatterns.snake++;}
          if (cls.includes('__') || cls.includes('--')) {namingPatterns.bem++;}
        });
      });

      console.log('Naming patterns found:', namingPatterns);
    });

    test('should identify theme-related CSS variables', () => {
      Object.keys(cssContent).forEach(cssFile => {
        const css = cssContent[cssFile];
        const themeVars = css.match(/--(theme|color|bg|text)-[a-zA-Z-]+/gi) || [];

        console.log(`${cssFile}: Found ${themeVars.length} theme-related CSS variables`);
      });
    });
  });
});
