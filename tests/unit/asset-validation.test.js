const fs = require('fs');
const path = require('path');

// Simple asset validation test
describe('Asset Validation Tests', () => {
  const htmlPath = path.join(__dirname, '../../index.html');
  let htmlContent;

  beforeAll(() => {
    // Read the HTML file only once
    htmlContent = fs.readFileSync(htmlPath, 'utf8');
  });

  describe('HTML Structure', () => {
    test('should have doctype declaration', () => {
      expect(htmlContent).toMatch(/<!doctype html>/i);
    });

    test('should have required HTML tags', () => {
      expect(htmlContent).toMatch(/<html/i);
      expect(htmlContent).toMatch(/<head/i);
      expect(htmlContent).toMatch(/<body/i);
    });

    test('should have title tag', () => {
      expect(htmlContent).toMatch(/<title>.*<\/title>/i);
    });
  });

  describe('CSS Assets', () => {
    const cssPaths = [];

    beforeAll(() => {
      // Extract CSS file paths
      const linkMatches = htmlContent.match(/<link[^>]+href=["']([^"']+\.css)["']/gi) || [];
      linkMatches.forEach(match => {
        const url = match.match(/href=["']([^"']+)["']/i)[1];
        if (url && !url.startsWith('http')) {
          cssPaths.push(url);
        }
      });
    });

    test('should reference CSS files', () => {
      expect(cssPaths.length).toBeGreaterThan(0);
    });

    test('should have all CSS files exist', () => {
      cssPaths.forEach(cssPath => {
        // Since the HTML is in the root and assets are in src/assets/,
        // the paths should be accessible from the web root
        let absolutePath;
        if (cssPath.startsWith('./src/assets/')) {
          // For paths like ./src/assets/css/file.css, the actual file is in src/assets/css/file.css
          absolutePath = path.join(__dirname, '../../', cssPath);
        } else if (cssPath.startsWith('src/assets/')) {
          // For paths like src/assets/css/file.css, the actual file is in src/assets/css/file.css
          absolutePath = path.join(__dirname, '../../', cssPath);
        } else {
          // Fallback for other paths
          absolutePath = path.join(__dirname, '../../src/pages/', cssPath);
        }

        // Normalize the path
        absolutePath = path.normalize(absolutePath);
        expect(fs.existsSync(absolutePath)).toBe(true);
      });
    });
  });

  describe('JavaScript Assets', () => {
    const jsPaths = [];

    beforeAll(() => {
      // Extract JS file paths
      const scriptMatches = htmlContent.match(/<script[^>]+src=["']([^"']+\.js)["']/gi) || [];
      scriptMatches.forEach(match => {
        const url = match.match(/src=["']([^"']+)["']/i)[1];
        if (url && !url.startsWith('http')) {
          jsPaths.push(url);
        }
      });
    });

    test('should reference JavaScript files', () => {
      expect(jsPaths.length).toBeGreaterThan(0);
    });

    test('should have all JS files exist', () => {
      jsPaths.forEach(jsPath => {
        // Since the HTML is in the root and assets are in src/assets/,
        // the paths should be accessible from the web root
        let absolutePath;
        if (jsPath.startsWith('./src/assets/')) {
          // For paths like ./src/assets/js/file.js, the actual file is in src/assets/js/file.js
          absolutePath = path.join(__dirname, '../../', jsPath);
        } else if (jsPath.startsWith('src/assets/')) {
          // For paths like src/assets/js/file.js, the actual file is in src/assets/js/file.js
          absolutePath = path.join(__dirname, '../../', jsPath);
        } else {
          // Fallback for other paths
          absolutePath = path.join(__dirname, '../../src/pages/', jsPath);
        }

        // Normalize the path
        absolutePath = path.normalize(absolutePath);
        expect(fs.existsSync(absolutePath)).toBe(true);
      });
    });

    test('should not have duplicate JS references', () => {
      const uniquePaths = [...new Set(jsPaths)];
      expect(jsPaths.length).toBe(uniquePaths.length);
    });
  });

  describe('Image Assets', () => {
    const imagePaths = [];

    beforeAll(() => {
      // Extract image paths from src attributes
      const imgMatches = htmlContent.match(/src=["']([^"']+\.(png|jpg|jpeg|gif|webp))["']/gi) || [];
      imgMatches.forEach(match => {
        const url = match.match(/src=["']([^"']+)["']/i)[1];
        if (url && !url.startsWith('http')) {
          imagePaths.push(url);
        }
      });

      // Extract image paths from background CSS
      const backgroundMatches =
        htmlContent.match(/url\(['"]?([^'")]+\.(png|jpg|jpeg|gif|webp))['"]?\)/gi) || [];
      backgroundMatches.forEach(match => {
        const urlMatch = match.match(/url\(['"]?([^'")]+)['"]?\)/i);
        if (urlMatch && urlMatch[1] && !urlMatch[1].startsWith('http')) {
          imagePaths.push(urlMatch[1]);
        }
      });
    });

    test('should reference image files', () => {
      expect(imagePaths.length).toBeGreaterThan(10);
    });

    test('should have most image files exist', () => {
      let existingFiles = 0;
      let missingFiles = 0;
      const missingFileList = [];

      imagePaths.forEach(imgPath => {
        // Since the HTML is in the root and assets are in src/assets/,
        // the paths should be accessible from the web root
        let absolutePath;
        if (imgPath.startsWith('./src/assets/')) {
          // For paths like ./src/assets/images/file.png, the actual file is in src/assets/images/file.png
          absolutePath = path.join(__dirname, '../../', imgPath);
        } else if (imgPath.startsWith('src/assets/')) {
          // For paths like src/assets/images/file.png, the actual file is in src/assets/images/file.png
          absolutePath = path.join(__dirname, '../../', imgPath);
        } else {
          // Fallback for other paths
          absolutePath = path.join(__dirname, '../../src/pages/', imgPath);
        }

        // Normalize the path
        absolutePath = path.normalize(absolutePath);

        if (fs.existsSync(absolutePath)) {
          existingFiles++;
        } else {
          missingFiles++;
          missingFileList.push(imgPath);
        }
      });

      // Log missing files for debugging
      if (missingFileList.length > 0) {
        console.log('Missing image files:', missingFileList);
      }

      // Expect at least 80% of image files to exist
      const successRate = existingFiles / imagePaths.length;
      expect(successRate).toBeGreaterThan(0.8);
    });
  });
});
