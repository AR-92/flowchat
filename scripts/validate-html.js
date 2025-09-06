#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Read the HTML file
const htmlPath = path.join(__dirname, '../index.html');
const htmlContent = fs.readFileSync(htmlPath, 'utf8');

console.log('=== HTML Structure Validation ===');

// Check for doctype
if (htmlContent.match(/<!doctype html>/i)) {
  console.log('✅ Doctype declaration found');
} else {
  console.log('❌ Doctype declaration missing');
}

// Check for html tag
if (htmlContent.match(/<html/i)) {
  console.log('✅ HTML tag found');
} else {
  console.log('❌ HTML tag missing');
}

// Check for head tag
if (htmlContent.match(/<head/i)) {
  console.log('✅ Head tag found');
} else {
  console.log('❌ Head tag missing');
}

// Check for body tag
if (htmlContent.match(/<body/i)) {
  console.log('✅ Body tag found');
} else {
  console.log('❌ Body tag missing');
}

// Check for title tag
if (htmlContent.match(/<title>.*<\/title>/i)) {
  console.log('✅ Title tag found');
} else {
  console.log('❌ Title tag missing');
}

// Check script tags
const scriptMatches = htmlContent.match(/<script/g);
if (scriptMatches && scriptMatches.length === 1) {
  console.log('✅ Correct number of script tags (1)');
} else {
  console.log(`❌ Incorrect number of script tags (${scriptMatches ? scriptMatches.length : 0})`);
}

// Check link tags
const linkMatches = htmlContent.match(/<link/g);
if (linkMatches && linkMatches.length > 10) {
  console.log(`✅ Sufficient link tags found (${linkMatches.length})`);
} else {
  console.log(`❌ Insufficient link tags (${linkMatches ? linkMatches.length : 0})`);
}

// Check img tags
const imgMatches = htmlContent.match(/<img/g);
if (imgMatches && imgMatches.length > 15) {
  console.log(`✅ Sufficient img tags found (${imgMatches.length})`);
} else {
  console.log(`❌ Insufficient img tags (${imgMatches ? imgMatches.length : 0})`);
}

// Check for href=null attributes
if (!htmlContent.match(/href="null"/)) {
  console.log('✅ No href="null" attributes found');
} else {
  console.log('❌ Found href="null" attributes');
}

// Check for duplicate script tags
const scriptSrcMatches = htmlContent.match(/<script[^>]*src="[^"]*"/g);
if (scriptSrcMatches) {
  const uniqueScripts = [...new Set(scriptSrcMatches)];
  if (scriptSrcMatches.length === uniqueScripts.length) {
    console.log('✅ No duplicate script tags found');
  } else {
    console.log(
      `❌ Duplicate script tags found: ${scriptSrcMatches.length - uniqueScripts.length}`
    );
  }
}

console.log('\n=== Validation Complete ===');
