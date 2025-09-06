#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Simple validation that .gitignore exists and has proper content
console.log('=== .gitignore Validation ===');

// Check that .gitignore exists in root
const gitignorePath = path.join(__dirname, '..', '.gitignore');
if (fs.existsSync(gitignorePath)) {
  console.log('✅ .gitignore found in root');

  // Read the content
  const content = fs.readFileSync(gitignorePath, 'utf8');

  // Check for key patterns
  const keyPatterns = [
    'node_modules/',
    '*.log',
    '.DS_Store',
    '*.tmp',
    '.env',
    'package-lock.json',
    'coverage/',
    '.gitignore',
  ];

  let foundPatterns = 0;
  keyPatterns.forEach(pattern => {
    if (content.includes(pattern)) {
      console.log(`✅ Pattern found: ${pattern}`);
      foundPatterns++;
    } else {
      console.log(`❌ Pattern missing: ${pattern}`);
    }
  });

  console.log(`\nFound ${foundPatterns}/${keyPatterns.length} key patterns`);

  if (foundPatterns >= keyPatterns.length * 0.8) {
    console.log('✅ .gitignore appears to be comprehensive');
  } else {
    console.log('❌ .gitignore may be missing important patterns');
  }
} else {
  console.log('❌ .gitignore NOT found in root');
}

console.log('\n=== Repository Structure Validation ===');

// Check that .git directory exists
const gitPath = path.join(__dirname, '..', '.git');
if (fs.existsSync(gitPath)) {
  console.log('✅ .git directory found');
} else {
  console.log('❌ .git directory NOT found');
}

console.log('\n✅ .gitignore and repository structure validation complete!');
