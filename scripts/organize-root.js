#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Root Directory Organization Script
class RootDirectoryOrganizer {
  constructor() {
    this.projectRoot = path.join(__dirname, '..');
    this.report = {
      organized: [],
      alreadyCorrect: [],
      errors: [],
    };
  }

  logAction(action, item) {
    this.report.organized.push({ action, item });
    console.log(`✅ ${action}: ${item}`);
  }

  logAlreadyCorrect(item) {
    this.report.alreadyCorrect.push(item);
    console.log(`✅ Already correct: ${item}`);
  }

  logError(error, item) {
    this.report.errors.push({ error, item });
    console.log(`❌ Error ${error}: ${item}`);
  }

  organizeDocumentation() {
    console.log('\n=== Organizing Documentation Files ===');

    // Documentation files that should stay in root
    const mainDocs = ['README.md'];

    // Documentation files that could be organized
    const allFiles = fs.readdirSync(this.projectRoot);
    const docFiles = allFiles.filter(
      file => file.endsWith('.md') && file !== 'README.md' && !file.startsWith('.')
    );

    // Only organize if we have more than a few documentation files
    if (docFiles.length > 3) {
      // Create docs directory if it doesn't exist
      const docsDir = path.join(this.projectRoot, 'docs');
      if (!fs.existsSync(docsDir)) {
        fs.mkdirSync(docsDir);
        this.logAction('Created directory', 'docs');
      }

      // Move documentation files to docs directory
      docFiles.forEach(docFile => {
        const sourcePath = path.join(this.projectRoot, docFile);
        const destPath = path.join(docsDir, docFile);

        if (fs.existsSync(sourcePath) && !fs.existsSync(destPath)) {
          fs.renameSync(sourcePath, destPath);
          this.logAction('Moved documentation', docFile);
        } else if (fs.existsSync(destPath)) {
          this.logAlreadyCorrect(`Documentation already in docs: ${docFile}`);
        }
      });
    } else {
      console.log('📝 Few documentation files found, keeping in root for simplicity');
      docFiles.forEach(doc => this.logAlreadyCorrect(`Documentation in root: ${doc}`));
    }
  }

  organizeScripts() {
    console.log('\n=== Organizing Script Files ===');

    // Script files that should be in scripts directory
    const allFiles = fs.readdirSync(this.projectRoot);
    const scriptFiles = allFiles.filter(
      file =>
        file.endsWith('.js') &&
        file !== 'jest.config.js' &&
        file !== 'package.json' &&
        !file.startsWith('.')
    );

    // Only organize if we have script files to move
    if (scriptFiles.length > 0) {
      // Create scripts directory if it doesn't exist
      const scriptsDir = path.join(this.projectRoot, 'scripts');
      if (!fs.existsSync(scriptsDir)) {
        fs.mkdirSync(scriptsDir);
        this.logAction('Created directory', 'scripts');
      }

      // Move script files to scripts directory
      scriptFiles.forEach(scriptFile => {
        const sourcePath = path.join(this.projectRoot, scriptFile);
        const destPath = path.join(scriptsDir, scriptFile);

        if (fs.existsSync(sourcePath) && !fs.existsSync(destPath)) {
          fs.renameSync(sourcePath, destPath);
          this.logAction('Moved script', scriptFile);
        } else if (fs.existsSync(destPath)) {
          this.logAlreadyCorrect(`Script already in scripts: ${scriptFile}`);
        }
      });
    } else {
      console.log('📝 No script files to organize');
    }
  }

  organizeConfigFiles() {
    console.log('\n=== Organizing Configuration Files ===');

    // For now, we'll just report on config files that are correctly placed
    const configFiles = fs
      .readdirSync(this.projectRoot)
      .filter(file => file.startsWith('.') && !file.startsWith('.git') && file !== '.gitignore');

    // Report on config files
    configFiles.forEach(configFile => {
      const configPath = path.join(this.projectRoot, configFile);
      if (fs.existsSync(configPath)) {
        this.logAlreadyCorrect(`Config file in root (acceptable): ${configFile}`);
      }
    });
  }

  cleanUpTempFiles() {
    console.log('\n=== Cleaning Up Temporary Files ===');

    // Files and directories that should be removed/ignored
    const tempItems = [
      'coverage', // Coverage directory from testing
    ];

    tempItems.forEach(tempItem => {
      const tempPath = path.join(this.projectRoot, tempItem);
      if (fs.existsSync(tempPath)) {
        if (fs.lstatSync(tempPath).isDirectory()) {
          fs.rmSync(tempPath, { recursive: true, force: true });
          this.logAction('Removed directory', tempItem);
        } else {
          fs.unlinkSync(tempPath);
          this.logAction('Removed file', tempItem);
        }
      } else {
        this.logAlreadyCorrect(`Already removed: ${tempItem}`);
      }
    });
  }

  validateStructure() {
    console.log('\n=== Validating Final Structure ===');

    // Check that essential directories exist
    const essentialDirs = ['src', 'tests', 'scripts'];
    essentialDirs.forEach(dir => {
      const dirPath = path.join(this.projectRoot, dir);
      if (fs.existsSync(dirPath)) {
        this.logAlreadyCorrect(`Essential directory exists: ${dir}`);
      } else {
        this.logError('Missing', `Essential directory: ${dir}`);
      }
    });

    // Check that essential files exist
    const essentialFiles = ['package.json', 'jest.config.js', 'README.md'];
    essentialFiles.forEach(file => {
      const filePath = path.join(this.projectRoot, file);
      if (fs.existsSync(filePath)) {
        this.logAlreadyCorrect(`Essential file exists: ${file}`);
      } else {
        this.logError('Missing', `Essential file: ${file}`);
      }
    });
  }

  generateReport() {
    console.log('\n=== ORGANIZATION REPORT ===');
    console.log(`✅ Actions taken: ${this.report.organized.length} items`);
    console.log(`✅ Already correct: ${this.report.alreadyCorrect.length} items`);
    console.log(`❌ Errors: ${this.report.errors.length} items`);

    if (this.report.organized.length > 0) {
      console.log('\n📋 Actions taken:');
      this.report.organized.forEach(item => {
        console.log(`  ${item.action}: ${item.item}`);
      });
    }

    if (this.report.errors.length > 0) {
      console.log('\n❌ Errors encountered:');
      this.report.errors.forEach(item => {
        console.log(`  ${item.error}: ${item.item}`);
      });
    }

    console.log('\n🎉 Root directory organization complete!');
    console.log('📁 Project structure is now clean and professional');
  }

  run() {
    console.log('🚀 Starting Root Directory Organization...\n');

    try {
      this.organizeDocumentation();
      this.organizeScripts();
      this.organizeConfigFiles();
      this.cleanUpTempFiles();
      this.validateStructure();
      this.generateReport();
    } catch (error) {
      console.error('💥 Organization failed:', error.message);
      process.exit(1);
    }
  }
}

// Run the organizer
if (require.main === module) {
  const organizer = new RootDirectoryOrganizer();
  organizer.run();
}

module.exports = RootDirectoryOrganizer;
