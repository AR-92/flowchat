#!/usr/bin/env node

/**
 * Script to automatically fix common linting issues in the project
 */

import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { join } from 'path';

// Get the project root directory
const projectRoot = process.cwd();

// Function to run a command and handle errors
function runCommand(command, description) {
  try {
    console.log(`\n🔧 ${description}...`);
    execSync(command, { cwd: projectRoot, stdio: 'inherit' });
    console.log(`✅ ${description} completed successfully`);
  } catch (error) {
    console.error(`❌ ${description} failed:`);
    console.error(error.message);
    process.exit(1);
  }
}

// Function to check if a file exists
function checkFileExists(filePath) {
  const fullPath = join(projectRoot, filePath);
  return existsSync(fullPath);
}

// Main function
async function main() {
  console.log('🚀 Starting automated linting fixes...');

  // Check if required configuration files exist
  const requiredFiles = ['eslint.config.js', '.prettierrc'];

  for (const file of requiredFiles) {
    if (!checkFileExists(file)) {
      console.error(`❌ Required configuration file '${file}' not found`);
      process.exit(1);
    }
  }

  console.log('✅ All required configuration files found');

  // Run ESLint with fix option
  runCommand(
    'npx eslint . --ext .js --fix --ignore-pattern src/assets/js/svg-loader-static.js --ignore-pattern scripts/css-migration-helper.js --ignore-pattern tests/unit/framework-migration-helper.test.js --ignore-pattern index.html',
    'Running ESLint to fix JavaScript issues'
  );

  // Run Prettier to format code
  runCommand(
    "npx prettier --write . '!src/assets/js/svg-loader-static.js' '!scripts/css-migration-helper.js' '!tests/unit/framework-migration-helper.test.js' '!index.html'",
    'Running Prettier to format code'
  );

  console.log('\n🎉 All automated linting fixes completed!');
  console.log('✅ Your code should now be properly formatted and linted');
}

// Run the main function
main().catch(error => {
  console.error('❌ An error occurred:', error);
  process.exit(1);
});
