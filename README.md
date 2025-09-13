# FlowChat Website

This is the official website for FlowChat, an AI automation solutions company.

## Project Structure

```
.
├── index.html                 # Main landing page
├── 404.html                   # Error page
├── sitemap.xml                # SEO sitemap
├── robots.txt                 # Search engine crawler instructions
├── README.md                  # This file
├── package.json               # Node.js dependencies and scripts
├── tailwind.config.js         # Tailwind CSS configuration
├── postcss.config.js          # PostCSS configuration
├── vite.config.js             # Vite configuration
├── dev-server.js              # Simple Express server
├── assets/                    # Static assets
│   ├── css/                   # Stylesheets
│   │   ├── input.css          # Tailwind CSS input file
│   │   └── output.css         # Generated Tailwind CSS file
│   ├── js/                    # JavaScript files
│   ├── images/                # Image assets
│   └── fonts/                 # Web fonts
├── pages/                     # Additional pages
│   ├── about.html             # Company information
│   ├── services.html          # Services overview
│   ├── workflow-automation.html # Workflow Automation details
│   ├── ai-assistant.html      # AI Assistant details
│   ├── sales-marketing-automation.html # Sales & Marketing Automation details
│   ├── custom-ai-projects.html # Custom AI Projects details
│   ├── pricing.html           # Pricing information
│   ├── resources.html         # Resources and guides
│   ├── contact.html           # Contact page
│   ├── careers.html           # Careers page
│   └── blog/                  # Blog section
│       ├── index.html         # Blog listing
│       └── post.html          # Blog post template
└── components/                # Reusable HTML components
    ├── header.html            # Background elements
    ├── footer.html            # Footer with company info
    ├── nav.html               # Navigation bar
    ├── simple-nav.html        # Simple navigation bar
    ├── scripts.html           # Common JavaScript code
    ├── hero.html              # Hero section
    ├── services.html          # Services section
    ├── process.html           # Process section
    ├── testimonials.html      # Testimonials section
    ├── benefits.html          # Benefits section
    ├── pricing.html           # Pricing section
    ├── faq.html               # FAQ section
    ├── cta.html               # Call to action section
    ├── blog-hero.html         # Blog hero section
    ├── blog-posts.html        # Blog posts listing
    └── README.md              # Components documentation
```

## Pages

1. **Home** (`index.html`) - Main landing page showcasing FlowChat's AI automation solutions
2. **About** (`pages/about.html`) - Company story, mission, values, and team
3. **Services** (`pages/services.html`) - Detailed overview of AI automation services
4. **Workflow Automation** (`pages/workflow-automation.html`) - Detailed information about workflow automation
5. **AI Assistant** (`pages/ai-assistant.html`) - Detailed information about AI assistants
6. **Sales & Marketing Automation** (`pages/sales-marketing-automation.html`) - Detailed information about sales automation
7. **Custom AI Projects** (`pages/custom-ai-projects.html`) - Detailed information about custom AI solutions
8. **Pricing** (`pages/pricing.html`) - Pricing plans and FAQ
9. **Resources** (`pages/resources.html`) - Collection of guides and resources
10. **Contact** (`pages/contact.html`) - Contact form and company information
11. **Careers** (`pages/careers.html`) - Career opportunities and company culture
12. **Blog** (`pages/blog/index.html`) - Blog listing page
13. **Blog Post** (`pages/blog/post.html`) - Sample blog post
14. **404** (`404.html`) - Error page for missing content

## Features

- Responsive design that works on all device sizes
- Dark theme aesthetic with glass-morphism UI elements
- Animated background elements for visual interest
- Consistent navigation across all pages
- SEO-optimized with sitemap and meta tags
- Mobile-friendly navigation with hamburger menu
- HTMX integration for dynamic interactions
- Partials system for consistent design and reduced code duplication
- Tailwind CSS for styling

## Technologies Used

- HTML5
- CSS3 with Tailwind CSS
- JavaScript
- HTMX for dynamic interactions
- Font Awesome icons
- Google Fonts
- Vite for development server
- Express.js for production server

## Development Setup

1. Install dependencies:
```bash
npm install
```

2. Build the Tailwind CSS:
```bash
npm run tailwind
```

3. Start the development server:
```bash
npm run dev
```

This will start a development server at `http://localhost:3000` with hot reloading.

## Alternative Development Setup

You can also use the simple Express server:

1. Install dependencies:
```bash
npm install
```

2. Build the Tailwind CSS:
```bash
npm run tailwind
```

3. Start the Express server:
```bash
npm run server
```

This will start a server at `http://localhost:3000`.

## Production Build

To create a production build:
```bash
npm run build
```

This will generate optimized files in the `dist/` directory.

To preview the production build:
```bash
npm run preview
```

## Components System

This project uses a components system to ensure consistency across all pages and reduce code duplication. The components are located in the `components/` directory and include:

- **header.html** - Background elements
- **footer.html** - Footer with company information, links, and copyright
- **nav.html** - Navigation bar
- **simple-nav.html** - Simple navigation bar
- **scripts.html** - Common JavaScript code used across all pages
- **hero.html** - Hero section
- **services.html** - Services section
- **process.html** - Process section
- **testimonials.html** - Testimonials section
- **benefits.html** - Benefits section
- **pricing.html** - Pricing section with comparison chart
- **faq.html** - FAQ section
- **cta.html** - Call to action section
- **blog-hero.html** - Blog hero section
- **blog-posts.html** - Blog posts listing organized by content clusters

Each page includes these components to maintain a consistent look and feel throughout the site.

## HTMX Integration

All pages include the HTMX library for dynamic interactions without writing custom JavaScript. This enables features like form submissions, content loading, and UI updates with minimal code.

## SEO Optimization

The site includes proper meta tags, a sitemap.xml file, and a robots.txt file to help search engines index the content effectively.

## Content Organization

Blog posts are organized into content clusters:
- Automation Cluster
- Business Growth Cluster
- Case Studies Cluster
- Future Trends Cluster

This organization helps users find relevant content more easily and improves SEO.

## Accessibility Features

The site includes several accessibility features:
- Skip to content links
- Proper ARIA labels
- Keyboard navigation support
- Sufficient color contrast
- Minimum touch target sizes for mobile devices

## Mobile Responsiveness

The site is optimized for mobile devices with:
- Responsive design that works on all device sizes
- Mobile-specific CSS improvements
- Properly sized touch targets
- Optimized font sizes for mobile screens

## Tailwind CSS

This project uses Tailwind CSS for styling. The configuration is in `tailwind.config.js` and the input file is `assets/css/input.css`. The output file `assets/css/output.css` is generated by Tailwind and included in all HTML files.