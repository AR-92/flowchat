// Script to optimize Font Awesome fonts by subsetting to only used icons

// Icons we're using (from our grep results)
const usedIcons = [
  'arrow-down', 'arrow-left', 'arrow-right', 'bell', 'bolt', 'book', 'building',
  'bullhorn', 'bullseye', 'calculator', 'calendar', 'calendar-check', 'chart-bar',
  'chart-line', 'check', 'check-circle', 'chevron-down', 'circle', 'clock', 'cogs',
  'compass', 'envelope', 'envelope-open-text', 'exclamation-triangle', 'expand-arrows-alt',
  'external-link-alt', 'eye', 'file-alt', 'file-invoice-dollar', 'filter', 'graduation-cap',
  'headset', 'heartbeat', 'history', 'home', 'hospital-user', 'industry', 'layer-group',
  'lightbulb', 'lock', 'map-marker-alt', 'microchip', 'paper-plane', 'percentage', 'phone-alt',
  'play', 'plug', 'plus-circle', 'project-diagram', 'recycle', 'robot', 'rocket', 'search',
  'server', 'shield-alt', 'smile', 'star', 'star-half-alt', 'sync-alt', 'times', 'times-circle',
  'user-clock', 'user-friends', 'user-plus', 'users'
];

console.log(`Found ${usedIcons.length} icons in use:`);
console.log(usedIcons);

console.log('\nTo optimize Font Awesome fonts:');
console.log('1. We need to identify which font files contain these icons');
console.log('2. Create a subset of those font files with only the used icons');
console.log('3. Update CSS to reference the subset fonts');

console.log('\nBased on the icons used, we need:');
console.log('- Solid style icons (fas): Most of our icons use this style');
console.log('- Regular style icons (far): Some icons like "circle", "check-circle" might use this');
console.log('- Brands style icons (fab): None of our icons appear to be brands');

console.log('\nFont file sizes:');
console.log('- fa-brands-400.woff2: 108KB');
console.log('- fa-brands-400.ttf: 187KB');
console.log('- fa-regular-400.woff2: 25KB');
console.log('- fa-regular-400.ttf: 64KB');
console.log('- fa-solid-900.woff2: 150KB');
console.log('- fa-solid-900.ttf: 395KB');
console.log('- fa-v4compatibility.woff2: 4.5KB');
console.log('- fa-v4compatibility.ttf: 10KB');

console.log('\nPotential savings:');
console.log('- We can remove fa-brands-400.* (295KB) as we are not using any brand icons');
console.log('- We might be able to subset fa-solid-900.* and fa-regular-400.* to only include used icons');
console.log('- Total potential savings: ~300KB');