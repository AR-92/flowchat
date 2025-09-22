// Post-build script to optimize the dist folder
const { readFileSync, writeFileSync, existsSync, copyFileSync } = require('fs');
const { readdirSync } = require('fs');

// Function to process HTML files
function processHtmlFile(filePath) {
  if (existsSync(filePath)) {
    let content = readFileSync(filePath, 'utf8');
    
    // Replace script references with minified versions
    content = content.replace(
      '<script src="/assets/js/main.js"></script>',
      '<script src="/assets/js/main.min.js"></script>'
    );
    content = content.replace(
      '<script src="/assets/js/index-orbs.js"></script>',
      '<script src="/assets/js/index-orbs.min.js"></script>'
    );
    
    writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath} to use minified JavaScript files`);
  }
}

// Copy minified JavaScript files to dist/assets/js directory
const jsFiles = [
  'index-orbs.min.js',
  'main.min.js'
];

// Ensure the dist/assets/js directory exists
const { mkdirSync } = require('fs');
try {
  mkdirSync('dist/assets/js', { recursive: true });
} catch (err) {
  // Directory may already exist
}

// Copy minified files
jsFiles.forEach(file => {
  try {
    copyFileSync(`assets/js/${file}`, `dist/assets/js/${file}`);
    console.log(`Copied ${file} to dist/assets/js/`);
  } catch (err) {
    console.warn(`Could not copy ${file}:`, err.message);
  }
});

// Process main HTML files
const mainHtmlFiles = [
  'dist/index.html',
  'dist/404.html'
];

mainHtmlFiles.forEach(file => processHtmlFile(file));

// Process component HTML files in dist folder
if (existsSync('dist/components')) {
  const componentFiles = readdirSync('dist/components');
  componentFiles.forEach(file => {
    if (file.endsWith('.html')) {
      processHtmlFile(`dist/components/${file}`);
    }
  });
}

console.log('Post-build optimization complete!');