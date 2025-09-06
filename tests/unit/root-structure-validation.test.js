const fs = require('fs');
const path = require('path');

// Root Directory Structure Validation Test
describe('Root Directory Structure Validation', () => {
  const projectRoot = path.join(__dirname, '../../');

  describe('Expected Directory Structure', () => {
    const expectedDirectories = [
      'src', // Source code directory
      'tests', // Test directory
      'node_modules', // Node modules (auto-generated)
    ];

    const forbiddenDirectories = [
      '__tests__', // Old test directory format
      'dist', // Build output (should be in specific location)
      'build', // Build output (should be in specific location)
    ];

    test('should have required directories', () => {
      expectedDirectories.forEach(dir => {
        const dirPath = path.join(projectRoot, dir);
        expect(fs.existsSync(dirPath)).toBe(true);
      });
    });

    test('should not have forbidden directories', () => {
      forbiddenDirectories.forEach(dir => {
        const dirPath = path.join(projectRoot, dir);
        expect(fs.existsSync(dirPath)).toBe(false);
      });
    });
  });

  describe('Expected File Organization', () => {
    // Configuration and documentation files that should be in root
    const expectedRootFiles = ['package.json', 'jest.config.js', 'README.md'];

    // Files that should NOT be in root (should be in specific directories)
    const forbiddenRootFiles = [
      '.env', // Should be in config or src
      'server.js', // Should be in src
      'app.js', // Should be in src
    ];

    test('should have essential configuration files in root', () => {
      expectedRootFiles.forEach(file => {
        const filePath = path.join(projectRoot, file);
        expect(fs.existsSync(filePath)).toBe(true);
      });
    });

    test('should not have misplaced files in root', () => {
      forbiddenRootFiles.forEach(file => {
        // Skip index.html and CNAME.txt as they're intentionally in root now
        if (file === 'index.html' || file === 'CNAME.txt') {
          return;
        }

        const filePath = path.join(projectRoot, file);
        // This test allows files to not exist (that's good) but fails if they exist in wrong place
        if (fs.existsSync(filePath)) {
          expect(false).toBe(true); // Fail if file exists in root
        } else {
          expect(true).toBe(true); // Pass if file doesn't exist in root
        }
      });
    });
  });

  describe('Asset Directory Validation', () => {
    const srcPath = path.join(projectRoot, 'src');
    const expectedAssetDirs = ['assets', 'components', 'pages', 'styles', 'utils', 'config'];

    test('should have proper src directory structure', () => {
      // Check that src directory exists
      expect(fs.existsSync(srcPath)).toBe(true);

      // Check for expected subdirectories
      expectedAssetDirs.forEach(dir => {
        const dirPath = path.join(srcPath, dir);
        expect(fs.existsSync(dirPath)).toBe(true);
      });
    });

    test('should have proper asset organization', () => {
      const assetsPath = path.join(srcPath, 'assets');
      if (fs.existsSync(assetsPath)) {
        const assetTypes = ['css', 'js', 'images', 'svgs', 'fonts', 'icons', 'media'];
        assetTypes.forEach(type => {
          const typePath = path.join(assetsPath, type);
          expect(fs.existsSync(typePath)).toBe(true);
        });
      }
    });
  });

  describe('Test Directory Validation', () => {
    const testPath = path.join(projectRoot, 'tests');

    test('should have proper test directory structure', () => {
      expect(fs.existsSync(testPath)).toBe(true);

      const testTypes = ['unit', 'integration', 'e2e', 'helpers', 'fixtures'];
      testTypes.forEach(type => {
        const typePath = path.join(testPath, type);
        expect(fs.existsSync(typePath)).toBe(true);
      });
    });
  });

  describe('Documentation Organization', () => {
    const expectedDocs = ['README.md'];

    const optionalDocs = [
      'ASSET_TESTING.md',
      'TESTING.md',
      'TEST_SUITE_ORGANIZATION.md',
      'ASSET_LOADING_RESOLUTION.md',
    ];

    test('should have main documentation in root', () => {
      expectedDocs.forEach(doc => {
        const docPath = path.join(projectRoot, doc);
        expect(fs.existsSync(docPath)).toBe(true);
      });
    });

    test('should not have excessive documentation files in root', () => {
      // Count documentation files
      const files = fs.readdirSync(projectRoot);
      const mdFiles = files.filter(file => file.endsWith('.md'));

      // Should have reasonable number of documentation files
      expect(mdFiles.length).toBeLessThanOrEqual(10);
    });
  });
});
