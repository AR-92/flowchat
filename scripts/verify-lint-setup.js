#!/usr/bin/env node

// Simple script to verify that the linter and formatter are properly set up
console.log('Verifying linter and formatter setup...');

// Check if ESLint is installed
try {
  const { ESLint } = await import('eslint');
  console.log('✅ ESLint is installed');
} catch (error) {
  console.log('❌ ESLint is not installed');
  console.error(error);
  process.exit(1);
}

// Check if Prettier is installed
try {
  await import('prettier');
  console.log('✅ Prettier is installed');
} catch (error) {
  console.log('❌ Prettier is not installed');
  console.error(error);
  process.exit(1);
}

// Check if ESLint config file exists
import fs from 'fs';
import path from 'path';

const eslintConfigPath = path.join(process.cwd(), 'eslint.config.js');
if (fs.existsSync(eslintConfigPath)) {
  console.log('✅ ESLint configuration file exists');
} else {
  console.log('❌ ESLint configuration file does not exist');
  process.exit(1);
}

// Check if Prettier config file exists
const prettierConfigPath = path.join(process.cwd(), '.prettierrc');
if (fs.existsSync(prettierConfigPath)) {
  console.log('✅ Prettier configuration file exists');
} else {
  console.log('❌ Prettier configuration file does not exist');
  process.exit(1);
}

console.log('\n🎉 All checks passed! Linter and formatter are properly set up.');
