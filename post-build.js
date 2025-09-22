// Post-build script to optimize the dist folder
const fs = require('fs');
const path = require('path');

// Replace script references in HTML files
const htmlFiles = [
  'dist/index.html',
  'dist/404.html'
  // Add other HTML files as needed
];

htmlFiles.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace script references with minified versions
    content = content.replace(
      '<script src="/assets/js/main.js"></script>',
      '<script src="/assets/js/main.min.js"></script>'
    );
    content = content.replace(
      '<script src="/assets/js/index-orbs.js"></script>',
      '<script src="/assets/js/index-orbs.min.js"></script>'
    );
    
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file} to use minified JavaScript files`);
  }
});

console.log('Post-build optimization complete!');