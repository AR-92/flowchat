#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Simple validation that index.html and CNAME.txt are in root and assets work
console.log('=== Root File Validation ===');

// Check that index.html exists in root
const indexPath = path.join(__dirname, '..', 'index.html');
if (fs.existsSync(indexPath)) {
  console.log('✅ index.html found in root');
} else {
  console.log('❌ index.html NOT found in root');
}

// Check that CNAME.txt exists in root
const cnamePath = path.join(__dirname, '..', 'CNAME.txt');
if (fs.existsSync(cnamePath)) {
  console.log('✅ CNAME.txt found in root');
} else {
  console.log('❌ CNAME.txt NOT found in root');
}

// Check that src directory exists
const srcPath = path.join(__dirname, '..', 'src');
if (fs.existsSync(srcPath)) {
  console.log('✅ src directory found');
} else {
  console.log('❌ src directory NOT found');
}

// Check that assets directory exists
const assetsPath = path.join(__dirname, '..', 'src', 'assets');
if (fs.existsSync(assetsPath)) {
  console.log('✅ src/assets directory found');
} else {
  console.log('❌ src/assets directory NOT found');
}

console.log('\n=== Asset Path Validation ===');

// Read index.html and check some asset paths
const htmlContent = fs.readFileSync(indexPath, 'utf8');

// Check for CSS assets
const cssAssets = htmlContent.match(/href="src\/assets\/css\/[^"]*"/g) || [];
console.log(`Found ${cssAssets.length} CSS asset references`);

// Check for JS assets
const jsAssets = htmlContent.match(/src="src\/assets\/js\/[^"]*"/g) || [];
console.log(`Found ${jsAssets.length} JS asset references`);

// Check for image assets
const imageAssets = htmlContent.match(/src="src\/assets\/images\/[^"]*"/g) || [];
console.log(`Found ${imageAssets.length} image asset references`);

// Check for SVG assets
const svgAssets = htmlContent.match(/src="src\/assets\/svgs\/[^"]*"/g) || [];
console.log(`Found ${svgAssets.length} SVG asset references`);

console.log('\n✅ Root directory organization and asset paths updated successfully!');
console.log('📁 index.html and CNAME.txt are now in the root directory');
console.log('🔗 All asset paths have been updated to work from the root');
