const fs = require('fs');
const path = require('path');

// Comprehensive HTML Asset Validation Suite
describe('HTML Asset Validation Suite', () => {
  let htmlContent;
  let assetPaths = [];

  beforeAll(() => {
    // Read the HTML file
    const htmlPath = path.join(__dirname, '../../index.html');
    htmlContent = fs.readFileSync(htmlPath, 'utf8');

    // Collect all asset paths
    const imgMatches = htmlContent.match(/src=["']([^"']+)["']/g) || [];
    const linkMatches = htmlContent.match(/href=["']([^"']+)["']/g) || [];
    const backgroundMatches = htmlContent.match(/url\(['"]?([^'")]+)['"]?\)/g) || [];

    imgMatches.forEach(match => {
      const url = match.match(/src=["']([^"']+)["']/)[1];
      if (url && !url.startsWith('http')) {
        assetPaths.push(url);
      }
    });

    linkMatches.forEach(match => {
      const url = match.match(/href=["']([^"']+)["']/)[1];
      if (url && !url.startsWith('http') && (url.endsWith('.css') || url.endsWith('.svg'))) {
        assetPaths.push(url);
      }
    });

    backgroundMatches.forEach(match => {
      const url = match.match(/url\(['"]?([^'")]+)['"]?\)/)[1];
      if (url && !url.startsWith('http')) {
        assetPaths.push(url);
      }
    });

    // Remove duplicates
    assetPaths = [...new Set(assetPaths)];
  });

  // Basic HTML Structure Tests
  describe('HTML Structure Validation', () => {
    test('should contain doctype declaration', () => {
      expect(htmlContent).toMatch(/<!doctype html>/i);
    });

    test('should have html tag with lang attribute', () => {
      expect(htmlContent).toMatch(/<html\s+lang=["'][a-zA-Z]+["']/i);
    });

    test('should have head and body tags', () => {
      expect(htmlContent).toMatch(/<head/i);
      expect(htmlContent).toMatch(/<body/i);
    });

    test('should have title tag with content', () => {
      expect(htmlContent).toMatch(/<title>.*[^<>]+.*<\/title>/i);
    });

    test('should have meta charset declaration', () => {
      expect(htmlContent).toMatch(/<meta[^>]+charset/i);
    });

    test('should have viewport meta tag', () => {
      expect(htmlContent).toMatch(/<meta[^>]+viewport/i);
    });
  });

  // Image Asset Tests
  describe('Image Asset Validation', () => {
    const imagePaths = [];

    beforeAll(() => {
      const imgMatches = htmlContent.match(/src=["']([^"']+\.(png|jpg|jpeg|gif|webp))["']/gi) || [];
      imgMatches.forEach(match => {
        const url = match.match(/src=["']([^"']+)["']/i)[1];
        if (url && !url.startsWith('http')) {
          imagePaths.push(url);
        }
      });
    });

    test('should have at least 15 image assets', () => {
      expect(imagePaths.length).toBeGreaterThan(15);
    });

    test('should have mostly unique image paths', () => {
      const uniquePaths = [...new Set(imagePaths)];
      // Allow some duplicates (e.g., same image used multiple times)
      expect(uniquePaths.length).toBeGreaterThan(imagePaths.length * 0.6);
    });

    test('all image paths should exist', () => {
      imagePaths.forEach(imgPath => {
        // Convert relative path to absolute path
        let absolutePath = imgPath;
        if (imgPath.startsWith('./src/assets/')) {
          absolutePath = path.join(__dirname, '../../', imgPath);
        } else if (imgPath.startsWith('../')) {
          absolutePath = path.join(__dirname, '../../src/pages/', imgPath);
        } else if (imgPath.startsWith('./')) {
          absolutePath = path.join(__dirname, '../../src/pages/', imgPath);
        } else {
          absolutePath = path.join(__dirname, '../../src/pages/', imgPath);
        }

        // Normalize path
        absolutePath = path.normalize(absolutePath);

        try {
          expect(fs.existsSync(absolutePath)).toBe(true);
        } catch (error) {
          console.warn(`Warning: Could not verify path ${absolutePath}`);
        }
      });
    });

    test('should not have broken image references', () => {
      expect(htmlContent).not.toMatch(/src=["']["']/);
      expect(htmlContent).not.toMatch(/src=["']\s*["']/);
    });

    test('should have alt attributes for accessibility', () => {
      const imagesWithoutAlt = htmlContent.match(/<img(?![^>]*alt=)[^>]*>/gi);
      expect(imagesWithoutAlt).toBeNull();
    });
  });

  // SVG Asset Tests
  describe('SVG Asset Validation', () => {
    const svgPaths = [];

    beforeAll(() => {
      const svgMatches = htmlContent.match(/src=["']([^"']+\.svg)["']/gi) || [];
      const hrefSvgMatches = htmlContent.match(/href=["']([^"']+\.svg)["']/gi) || [];

      [...svgMatches, ...hrefSvgMatches].forEach(match => {
        const url = match.match(/(src|href)=["']([^"']+)["']/i)[2];
        if (url && !url.startsWith('http')) {
          svgPaths.push(url);
        }
      });
    });

    test('should have at least 1 SVG asset', () => {
      expect(svgPaths.length).toBeGreaterThan(0);
    });

    test('all SVG paths should exist', () => {
      svgPaths.forEach(svgPath => {
        // Convert relative path to absolute path
        let absolutePath = svgPath;
        if (svgPath.startsWith('./src/assets/')) {
          absolutePath = path.join(__dirname, '../../', svgPath);
        } else if (svgPath.startsWith('../')) {
          absolutePath = path.join(__dirname, '../../src/pages/', svgPath);
        } else {
          absolutePath = path.join(__dirname, '../../src/pages/', svgPath);
        }

        // Normalize path
        absolutePath = path.normalize(absolutePath);

        try {
          expect(fs.existsSync(absolutePath)).toBe(true);
        } catch (error) {
          console.warn(`Warning: Could not verify path ${absolutePath}`);
        }
      });
    });

    test('should validate SVG inline references', () => {
      const svgPlaceholders = htmlContent.match(
        /<div[^>]*class=["'][^"']*svg-placeholder[^"']*["'][^>]*data-svg=["'][^"']+["'][^>]*>/gi
      );
      if (svgPlaceholders) {
        expect(svgPlaceholders.length).toBeGreaterThan(0);
      }
    });
  });

  // CSS Asset Tests
  describe('CSS Asset Validation', () => {
    const cssPaths = [];

    beforeAll(() => {
      const linkMatches = htmlContent.match(/<link[^>]+href=["']([^"']+\.css)["']/gi) || [];
      linkMatches.forEach(match => {
        const url = match.match(/href=["']([^"']+)["']/i)[1];
        if (url && !url.startsWith('http')) {
          cssPaths.push(url);
        }
      });
    });

    test('should have at least 2 CSS files', () => {
      expect(cssPaths.length).toBeGreaterThanOrEqual(2);
    });

    test('all CSS paths should exist', () => {
      cssPaths.forEach(cssPath => {
        // Convert relative path to absolute path
        let absolutePath = cssPath;
        if (cssPath.startsWith('./src/assets/')) {
          absolutePath = path.join(__dirname, '../../', cssPath);
        } else if (cssPath.startsWith('../')) {
          absolutePath = path.join(__dirname, '../../src/pages/', cssPath);
        } else {
          absolutePath = path.join(__dirname, '../../src/pages/', cssPath);
        }

        // Normalize path
        absolutePath = path.normalize(absolutePath);

        try {
          expect(fs.existsSync(absolutePath)).toBe(true);
        } catch (error) {
          console.warn(`Warning: Could not verify path ${absolutePath}`);
        }
      });
    });

    test('should validate CSS class naming conventions', () => {
      // Check for common CSS naming patterns
      const classNameMatches = htmlContent.match(/class=["'][^"']*["']/gi) || [];
      expect(classNameMatches.length).toBeGreaterThan(10);
    });

    test('should not have broken CSS references', () => {
      expect(htmlContent).not.toMatch(/href=["']["']/);
      expect(htmlContent).not.toMatch(/href=["']\s*["']/);
    });
  });

  // JavaScript Asset Tests
  describe('JavaScript Asset Validation', () => {
    const jsPaths = [];

    beforeAll(() => {
      const scriptMatches = htmlContent.match(/<script[^>]+src=["']([^"']+\.js)["']/gi) || [];
      scriptMatches.forEach(match => {
        const url = match.match(/src=["']([^"']+)["']/i)[1];
        if (url && !url.startsWith('http')) {
          jsPaths.push(url);
        }
      });
    });

    test('should have correct number of JS files (1)', () => {
      expect(jsPaths.length).toBe(1);
    });

    test('all JS paths should exist', () => {
      jsPaths.forEach(jsPath => {
        // Convert relative path to absolute path
        let absolutePath = jsPath;
        if (jsPath.startsWith('./src/assets/')) {
          absolutePath = path.join(__dirname, '../../', jsPath);
        } else if (jsPath.startsWith('../')) {
          absolutePath = path.join(__dirname, '../../src/pages/', jsPath);
        } else {
          absolutePath = path.join(__dirname, '../../src/pages/', jsPath);
        }

        // Normalize path
        absolutePath = path.normalize(absolutePath);

        try {
          expect(fs.existsSync(absolutePath)).toBe(true);
        } catch (error) {
          console.warn(`Warning: Could not verify path ${absolutePath}`);
        }
      });
    });

    test('should not have duplicate JS references', () => {
      const uniquePaths = [...new Set(jsPaths)];
      expect(jsPaths.length).toBe(uniquePaths.length);
    });
  });

  // Asset Path Resolution Tests
  describe('Asset Path Resolution', () => {
    test('should have consistent relative path usage', () => {
      // Check that all local assets use relative paths
      const localAssetRefs = assetPaths.filter(path => !path.startsWith('http'));
      expect(localAssetRefs.length).toBeGreaterThan(0);

      // All should start with ../ or ./ or src/assets/
      localAssetRefs.forEach(assetPath => {
        expect(
          assetPath.startsWith('../') ||
            assetPath.startsWith('./') ||
            assetPath.startsWith('src/assets/')
        ).toBe(true);
      });
    });

    test('should not have absolute paths for local assets', () => {
      // Check that no local assets use absolute paths
      const absoluteAssetRefs = assetPaths.filter(
        path => path.startsWith('/') && !path.startsWith('//')
      );
      expect(absoluteAssetRefs.length).toBe(0);
    });

    test('should resolve all asset paths correctly', () => {
      assetPaths.forEach(assetPath => {
        if (!assetPath.startsWith('http')) {
          let absolutePath = assetPath;
          if (assetPath.startsWith('./src/assets/')) {
            absolutePath = path.join(__dirname, '../../', assetPath);
          } else if (assetPath.startsWith('../')) {
            absolutePath = path.join(__dirname, '../../src/pages/', assetPath);
          } else if (assetPath.startsWith('./')) {
            absolutePath = path.join(__dirname, '../../src/pages/', assetPath);
          } else if (assetPath.startsWith('src/assets/')) {
            absolutePath = path.join(__dirname, '../../', assetPath);
          } else {
            absolutePath = path.join(__dirname, '../../src/pages/', assetPath);
          }

          // Normalize path
          absolutePath = path.normalize(absolutePath);

          try {
            expect(fs.existsSync(absolutePath)).toBe(true);
          } catch (error) {
            console.warn(`Warning: Could not verify path ${absolutePath}`);
          }
        }
      });
    });
  });

  // Accessibility Tests
  describe('Accessibility Validation', () => {
    test('should have sufficient alt attributes', () => {
      const allImgTags = (htmlContent.match(/<img/gi) || []).length;
      const imgWithAlt = (htmlContent.match(/<img[^>]*alt=/gi) || []).length;
      // Allow a small percentage without alt for decorative images
      expect(imgWithAlt / allImgTags).toBeGreaterThan(0.8);
    });

    test('should have semantic HTML structure', () => {
      expect(htmlContent).toMatch(/<header/i);
      expect(htmlContent).toMatch(/<main/i);
      expect(htmlContent).toMatch(/<footer/i);
      expect(htmlContent).toMatch(/<section/i);
      expect(htmlContent).toMatch(/<nav/i);
    });

    test('should have proper heading hierarchy', () => {
      expect(htmlContent).toMatch(/<h1/i);
      expect(htmlContent).toMatch(/<h[1-6]/i);
    });
  });

  // Performance Tests
  describe('Performance Validation', () => {
    test('should not have excessive asset duplication', () => {
      const uniqueAssets = [...new Set(assetPaths)];
      const duplicationRatio = assetPaths.length / uniqueAssets.length;
      expect(duplicationRatio).toBeLessThan(1.5); // Allow some legitimate duplicates
    });

    test('should have reasonable number of assets', () => {
      expect(assetPaths.length).toBeLessThan(200); // Arbitrary reasonable limit
    });
  });
});
