#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Simple Asset Validation Script
function validateAssets() {
  console.log('🚀 Starting Asset Validation...\n');

  // Read HTML file
  const htmlPath = path.join(__dirname, '../index.html');
  const htmlContent = fs.readFileSync(htmlPath, 'utf8');

  let passed = 0;
  let failed = 0;

  // Validate HTML structure
  console.log('=== HTML Structure Validation ===');
  if (htmlContent.includes('<!doctype html>')) {
    console.log('✅ Doctype declaration found');
    passed++;
  } else {
    console.log('❌ Doctype declaration missing');
    failed++;
  }

  if (htmlContent.includes('<html')) {
    console.log('✅ HTML tag found');
    passed++;
  } else {
    console.log('❌ HTML tag missing');
    failed++;
  }

  if (htmlContent.includes('<head')) {
    console.log('✅ Head tag found');
    passed++;
  } else {
    console.log('❌ Head tag missing');
    failed++;
  }

  if (htmlContent.includes('<body')) {
    console.log('✅ Body tag found');
    passed++;
  } else {
    console.log('❌ Body tag missing');
    failed++;
  }

  if (/<title>.*<\/title>/i.test(htmlContent)) {
    console.log('✅ Title tag found');
    passed++;
  } else {
    console.log('❌ Title tag missing');
    failed++;
  }

  console.log('');

  // Validate Images
  console.log('=== Image Asset Validation ===');
  const imageMatches = htmlContent.match(/src="([^"]+\.(png|jpg|jpeg|gif|webp|svg))"/gi) || [];
  const backgroundMatches =
    htmlContent.match(/url\((['"]?)([^'")]+\.(png|jpg|jpeg|gif|webp|svg))(['"]?)\)/gi) || [];

  let imagePaths = [];

  // Extract image paths
  imageMatches.forEach(match => {
    const url = match.match(/src="([^"]+)"/)[1];
    if (url && !url.startsWith('http')) {
      imagePaths.push(url);
    }
  });

  backgroundMatches.forEach(match => {
    const urlMatch = match.match(/url\((['"]?)([^'")]+)(['"]?)\)/);
    if (urlMatch && urlMatch[2] && !urlMatch[2].startsWith('http')) {
      imagePaths.push(urlMatch[2]);
    }
  });

  // Remove duplicates
  imagePaths = [...new Set(imagePaths)];

  console.log(`Found ${imagePaths.length} unique image references`);

  let validImages = 0;
  imagePaths.forEach(imgPath => {
    let absolutePath = imgPath;
    if (imgPath.startsWith('../')) {
      absolutePath = path.join(__dirname, 'src/pages/', imgPath);
    } else if (imgPath.startsWith('./')) {
      absolutePath = path.join(__dirname, 'src/pages/', imgPath);
    } else {
      absolutePath = path.join(__dirname, 'src/pages/', imgPath);
    }

    absolutePath = path.normalize(absolutePath);

    if (fs.existsSync(absolutePath)) {
      console.log(`✅ Image exists: ${imgPath}`);
      validImages++;
    } else {
      console.log(`❌ Image not found: ${imgPath}`);
      failed++;
    }
  });

  if (imagePaths.length > 0) {
    const successRate = (validImages / imagePaths.length) * 100;
    console.log(`Image success rate: ${successRate.toFixed(1)}%`);
  }

  console.log('');

  // Validate CSS
  console.log('=== CSS Asset Validation ===');
  const cssMatches = htmlContent.match(/<link[^>]+href="([^"]+\.css)"/gi) || [];

  let cssPaths = [];
  cssMatches.forEach(match => {
    const url = match.match(/href="([^"]+)"/)[1];
    if (url && !url.startsWith('http')) {
      cssPaths.push(url);
    }
  });

  cssPaths = [...new Set(cssPaths)];

  console.log(`Found ${cssPaths.length} unique CSS references`);

  let validCSS = 0;
  cssPaths.forEach(cssPath => {
    let absolutePath = cssPath;
    if (cssPath.startsWith('../')) {
      absolutePath = path.join(__dirname, 'src/pages/', cssPath);
    } else {
      absolutePath = path.join(__dirname, 'src/pages/', cssPath);
    }

    absolutePath = path.normalize(absolutePath);

    if (fs.existsSync(absolutePath)) {
      console.log(`✅ CSS file exists: ${cssPath}`);
      validCSS++;
    } else {
      console.log(`❌ CSS file not found: ${cssPath}`);
      failed++;
    }
  });

  if (cssPaths.length > 0) {
    const successRate = (validCSS / cssPaths.length) * 100;
    console.log(`CSS success rate: ${successRate.toFixed(1)}%`);
  }

  console.log('');

  // Validate JavaScript
  console.log('=== JavaScript Asset Validation ===');
  const jsMatches = htmlContent.match(/<script[^>]+src="([^"]+\.js)"/gi) || [];

  let jsPaths = [];
  jsMatches.forEach(match => {
    const url = match.match(/src="([^"]+)"/)[1];
    if (url && !url.startsWith('http')) {
      jsPaths.push(url);
    }
  });

  jsPaths = [...new Set(jsPaths)];

  console.log(`Found ${jsPaths.length} unique JS references`);

  let validJS = 0;
  jsPaths.forEach(jsPath => {
    let absolutePath = jsPath;
    if (jsPath.startsWith('../')) {
      absolutePath = path.join(__dirname, 'src/pages/', jsPath);
    } else {
      absolutePath = path.join(__dirname, 'src/pages/', jsPath);
    }

    absolutePath = path.normalize(absolutePath);

    if (fs.existsSync(absolutePath)) {
      console.log(`✅ JS file exists: ${jsPath}`);
      validJS++;
    } else {
      console.log(`❌ JS file not found: ${jsPath}`);
      failed++;
    }
  });

  if (jsPaths.length > 0) {
    const successRate = (validJS / jsPaths.length) * 100;
    console.log(`JS success rate: ${successRate.toFixed(1)}%`);
  }

  console.log('');

  // Generate final report
  console.log('=== VALIDATION REPORT ===');
  console.log(`✅ Passed: ${passed + validImages + validCSS + validJS}`);
  console.log(`❌ Failed: ${failed}`);

  const totalTests = passed + failed + validImages + validCSS + validJS;
  if (totalTests > 0) {
    const successRate = ((passed + validImages + validCSS + validJS) / totalTests) * 100;
    console.log(`📈 Success Rate: ${successRate.toFixed(1)}%`);
  }

  if (failed === 0) {
    console.log('\n🎉 All asset validations passed!');
    process.exit(0);
  } else {
    console.log('\n❌ Some asset validations failed!');
    process.exit(1);
  }
}

// Run the validation
validateAssets();
