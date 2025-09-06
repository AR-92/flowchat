const fs = require('fs');
const path = require('path');

// CSS Framework Migration Helper
class CSSMigrationHelper {
  constructor() {
    this.htmlPath = path.join(__dirname, '../index.html');
    this.cssDir = path.join(__dirname, 'src/assets/css');
    this.analysis = {
      frameworkDetection: {},
      themePreservation: {},
      migrationPaths: {},
    };
  }

  async analyzeCurrentFramework() {
    console.log('🔍 Analyzing current CSS framework usage...\n');

    const htmlContent = fs.readFileSync(this.htmlPath, 'utf8');

    // Detect framework indicators
    this.analysis.frameworkDetection = {
      bootstrap: this.detectBootstrap(htmlContent),
      tailwind: this.detectTailwind(htmlContent),
      bulma: this.detectBulma(htmlContent),
      foundation: this.detectFoundation(htmlContent),
      materialize: this.detectMaterialize(htmlContent),
      custom: this.detectCustomFramework(htmlContent),
    };

    // Analyze theme preservation needs
    this.analysis.themePreservation = {
      colors: this.analyzeColorScheme(htmlContent),
      typography: this.analyzeTypography(htmlContent),
      spacing: this.analyzeSpacing(htmlContent),
      components: this.analyzeComponents(htmlContent),
    };

    // Determine migration paths
    this.analysis.migrationPaths = this.determineMigrationPaths();

    return this.analysis;
  }

  detectBootstrap(htmlContent) {
    const bootstrapIndicators = [
      { class: 'container', weight: 1 },
      { class: 'row', weight: 1 },
      { class: 'col-', weight: 2 },
      { class: 'btn', weight: 2 },
      { class: 'alert', weight: 1 },
      { class: 'card', weight: 1 },
      { attr: 'data-toggle', weight: 3 },
      { attr: 'data-target', weight: 3 },
    ];

    let score = 0;
    bootstrapIndicators.forEach(indicator => {
      if (indicator.class) {
        const regex = new RegExp(`class=["'][^"']*\\b${indicator.class}[^"']*["']`, 'gi');
        const matches = htmlContent.match(regex) || [];
        score += matches.length * indicator.weight;
      }
      if (indicator.attr) {
        const regex = new RegExp(`${indicator.attr}=`, 'gi');
        const matches = htmlContent.match(regex) || [];
        score += matches.length * indicator.weight;
      }
    });

    return {
      score,
      isLikely: score > 10,
      confidence: Math.min(100, Math.round((score / 20) * 100)),
    };
  }

  detectTailwind(htmlContent) {
    const utilityClasses = [
      { pattern: 'm[xyltpb]-\\d+', weight: 1 }, // Margin
      { pattern: 'p[xyltpb]-\\d+', weight: 1 }, // Padding
      { pattern: 'w-(full|screen|\\d+)', weight: 1 }, // Width
      { pattern: 'h-(full|screen|\\d+)', weight: 1 }, // Height
      { pattern: 'text-(xs|sm|base|lg|xl|\\d+)', weight: 2 }, // Text size
      { pattern: 'bg-[\\w-]+', weight: 1 }, // Background
      { pattern: 'flex', weight: 2 }, // Flexbox
      { pattern: 'grid', weight: 2 },                   // Grid
    ];

    let score = 0;
    utilityClasses.forEach(indicator => {
      const regex = new RegExp(`class=["'][^"']*${indicator.pattern}[^"']*["']`, 'gi');
      const matches = htmlContent.match(regex) || [];
      score += matches.length * indicator.weight;
    });

    return {
      score,
      isLikely: score > 15,
      confidence: Math.min(100, Math.round((score / 30) * 100)),
    };
  }

  detectBulma(htmlContent) {
    const bulmaIndicators = [
      { class: 'navbar', weight: 2 },
      { class: 'panel', weight: 2 },
      { class: 'level', weight: 2 },
      { class: 'hero', weight: 1 },
      { class: 'section', weight: 1 },
      { class: 'box', weight: 1 },
      { class: 'button', weight: 1 },
    ];

    let score = 0;
    bulmaIndicators.forEach(indicator => {
      const regex = new RegExp(`class=["'][^"']*\\b${indicator.class}[^"']*["']`, 'gi');
      const matches = htmlContent.match(regex) || [];
      score += matches.length * indicator.weight;
    });

    return {
      score,
      isLikely: score > 5,
      confidence: Math.min(100, Math.round((score / 10) * 100)),
    };
  }

  detectFoundation(htmlContent) {
    const foundationIndicators = [
      { class: 'grid-x', weight: 3 },
      { class: 'cell', weight: 2 },
      { class: 'button', weight: 1 },
      { class: 'callout', weight: 2 },
    ];

    let score = 0;
    foundationIndicators.forEach(indicator => {
      const regex = new RegExp(`class=["'][^"']*\\b${indicator.class}[^"']*["']`, 'gi');
      const matches = htmlContent.match(regex) || [];
      score += matches.length * indicator.weight;
    });

    return {
      score,
      isLikely: score > 3,
      confidence: Math.min(100, Math.round((score / 6) * 100)),
    };
  }

  detectMaterialize(htmlContent) {
    const materializeIndicators = [
      { class: 'material-icons', weight: 3 },
      { class: 'waves-effect', weight: 2 },
      { class: 'card-panel', weight: 2 },
      { class: 'btn', weight: 1 },
      { class: 'container', weight: 1 },
    ];

    let score = 0;
    materializeIndicators.forEach(indicator => {
      const regex = new RegExp(`class=["'][^"']*\\b${indicator.class}[^"']*["']`, 'gi');
      const matches = htmlContent.match(regex) || [];
      score += matches.length * indicator.weight;
    });

    return {
      score,
      isLikely: score > 5,
      confidence: Math.min(100, Math.round((score / 10) * 100)),
    };
  }

  detectCustomFramework(htmlContent) {
    // Look for custom class naming patterns
    const bemPattern = (htmlContent.match(/class=["'][^"']*[a-zA-Z]+__[a-zA-Z]+[^"']*["']/g) || [])
      .length;
    const camelCasePattern = (
      htmlContent.match(/class=["'][^"']*[a-z][A-Z][a-zA-Z]*[^"']*["']/g) || []
    ).length;
    const customPrefixPattern = (htmlContent.match(/class=["'][^"']*styles_[^"']*["']/g) || [])
      .length;

    const score = bemPattern + camelCasePattern + customPrefixPattern;

    return {
      score,
      isLikely: score > 0,
      patterns: {
        bem: bemPattern,
        camelCase: camelCasePattern,
        customPrefix: customPrefixPattern,
      }
    };
  }

  analyzeColorScheme(htmlContent) {
    // Extract color-related classes
    const colorPatterns = [
      'text-(primary|secondary|success|danger|warning|info|light|dark|white|black)',
      'bg-(primary|secondary|success|danger|warning|info|light|dark|white|black)',
      'border-(primary|secondary|success|danger|warning|info|light|dark)',
    ];

    let themeColors = [];
    colorPatterns.forEach(pattern => {
      const regex = new RegExp(`class=["'][^"']*${pattern}[^"']*["']`, 'gi');
      const matches = htmlContent.match(regex) || [];
      themeColors = themeColors.concat(matches);
    });

    // Extract inline styles with colors
    const inlineColorStyles = (
      htmlContent.match(/style=["'][^"']*(color|background|border)[^"']*["']/gi) || []
    ).length;

    return {
      themeColorClasses: themeColors.length,
      inlineColorStyles,
      usesThemeSystem: themeColors.length > 5,
    };
  }

  analyzeTypography(htmlContent) {
    const typographyPatterns = [
      'font-(sans|serif|mono)',
      'text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl)',
      'font-(hairline|thin|light|normal|medium|semibold|bold|extrabold|black)',
      'leading-(none|tight|snug|normal|relaxed|loose)',
      'tracking-(tighter|tight|normal|wide|wider|widest)',
    ];

    let typographyClasses = [];
    typographyPatterns.forEach(pattern => {
      const regex = new RegExp(`class=["'][^"']*${pattern}[^"']*["']`, 'gi');
      const matches = htmlContent.match(regex) || [];
      typographyClasses = typographyClasses.concat(matches);
    });

    return {
      typographyClasses: typographyClasses.length,
      hasTypographySystem: typographyClasses.length > 3,
    };
  }

  analyzeSpacing(htmlContent) {
    const spacingPatterns = [
      'm[xyltpb]-(0|1|2|3|4|5|6|8|10|12|16|20|24|32|40|48|56|64)',
      'p[xyltpb]-(0|1|2|3|4|5|6|8|10|12|16|20|24|32|40|48|56|64)',
      'space-(x|y)-(-?\\d+)',
    ];

    let spacingClasses = [];
    spacingPatterns.forEach(pattern => {
      const regex = new RegExp(`class=["'][^"']*${pattern}[^"']*["']`, 'gi');
      const matches = htmlContent.match(regex) || [];
      spacingClasses = spacingClasses.concat(matches);
    });

    return {
      spacingClasses: spacingClasses.length,
      hasSpacingSystem: spacingClasses.length > 5,
    };
  }

  analyzeComponents(htmlContent) {
    const componentPatterns = [
      'navbar',
      'dropdown',
      'modal',
      'carousel',
      'accordion',
      'tab',
      'breadcrumb',
      'pagination',
      'card',
      'alert',
      'badge',
      'button',
    ];

    let components = [];
    componentPatterns.forEach(pattern => {
      const regex = new RegExp(`class=["'][^"']*\\b${pattern}[^"']*["']`, 'gi');
      const matches = htmlContent.match(regex) || [];
      components = components.concat(matches);
    });

    return {
      componentClasses: components.length,
      hasComponentSystem: components.length > 3,
    };
  }

  determineMigrationPaths() {
    const frameworks = this.analysis.frameworkDetection;

    // Determine most likely current framework
    let currentFramework = 'custom';
    let highestConfidence = 0;

    Object.keys(frameworks).forEach(framework => {
      if (frameworks[framework].isLikely && frameworks[framework].confidence > highestConfidence) {
        currentFramework = framework;
        highestConfidence = frameworks[framework].confidence;
      }
    });

    // Define migration paths
    const migrationPaths = {
      current: currentFramework,
      confidence: highestConfidence,
      options: [
        {
          name: 'Bootstrap 5',
          compatibility: this.calculateCompatibility('bootstrap'),
          effort: 'medium',
          benefits: ['Responsive grid', 'Pre-built components', 'Large community'],
        },
        {
          name: 'Tailwind CSS',
          compatibility: this.calculateCompatibility('tailwind'),
          effort: 'high',
          benefits: ['Utility-first', 'Customizable', 'Performance'],
        },
        {
          name: 'Bulma',
          compatibility: this.calculateCompatibility('bulma'),
          effort: 'low',
          benefits: ['Modern', 'Flexbox-based', 'No JavaScript'],
        },
        {
          name: 'Keep Custom',
          compatibility: 100,
          effort: 'low',
          benefits: ['No breaking changes', 'Preserve existing work'],
        }
      ],
    };

    return migrationPaths;
  }

  calculateCompatibility(targetFramework) {
    // Simplified compatibility calculation
    switch (targetFramework) {
    case 'bootstrap':
      return this.analysis.frameworkDetection.bootstrap.isLikely ? 90 : 60;
    case 'tailwind':
      return this.analysis.frameworkDetection.tailwind.isLikely ? 90 : 40;
    case 'bulma':
      return this.analysis.frameworkDetection.bulma.isLikely ? 80 : 50;
    default:
      return 70;
    }
  }

  generateMigrationReport() {
    const analysis = this.analysis;

    console.log('📊 FRAMEWORK ANALYSIS REPORT');
    console.log('===========================\n');

    console.log('🔍 Framework Detection:');
    Object.keys(analysis.frameworkDetection).forEach(framework => {
      const data = analysis.frameworkDetection[framework];
      if (data.isLikely) {
        console.log(`  ✅ ${framework}: ${data.confidence}% confidence (score: ${data.score})`);
      } else {
        console.log(`  ❌ ${framework}: Not detected (score: ${data.score})`);
      }
    });

    console.log('\n🎨 Theme Preservation:');
    console.log(
      `  🎨 Theme Colors: ${analysis.themePreservation.colors.themeColorClasses} classes`
    );
    console.log(
      `  🔤 Typography: ${analysis.themePreservation.typography.typographyClasses} classes`
    );
    console.log(`  📏 Spacing: ${analysis.themePreservation.spacing.spacingClasses} classes`);
    console.log(
      `  🧩 Components: ${analysis.themePreservation.components.componentClasses} classes`

    console.log('\n🛣️  Migration Paths:');
    console.log(
      `  Current framework: ${analysis.migrationPaths.current} (${analysis.migrationPaths.confidence}% confidence)`
    );
    console.log('  Available options:');
    analysis.migrationPaths.options.forEach(option => {
      console.log(
        `    - ${option.name}: ${option.compatibility}% compatible, ${option.effort} effort`
      );
      console.log(`      Benefits: ${option.benefits.join(', ')}`);
    });

    console.log('\n📋 RECOMMENDATIONS:');
    console.log('==================');

    if (analysis.migrationPaths.current === 'custom') {
      console.log('  1. Your project uses a custom CSS framework');
      console.log('  2. Consider whether migration is necessary');
      console.log('  3. If migrating, Bootstrap 5 offers the smoothest transition');
    } else {
      console.log(`  1. You appear to be using ${analysis.migrationPaths.current}`);
      const bestOption = analysis.migrationPaths.options
        .filter(opt => opt.name !== 'Keep Custom')
        .sort((a, b) => b.compatibility - a.compatibility)[0];
      console.log(
        `  2. For migration, ${bestOption.name} offers ${bestOption.compatibility}% compatibility`
      );
    }

    console.log('  3. Preserve your theme by:');
    console.log('     - Documenting current color scheme');
    console.log('     - Recording typography settings');
    console.log('     - Cataloging custom component styles');
    console.log('     - Creating CSS variables for theme values');
  }

  async run() {
    try {
      await this.analyzeCurrentFramework();
      this.generateMigrationReport();
    } catch (error) {
      console.error('Error during migration analysis:', error.message);
      process.exit(1);
    }
  }
}

// Run the migration helper
if (require.main === module) {
  const helper = new CSSMigrationHelper();
  helper.run();
}

module.exports = CSSMigrationHelper;
