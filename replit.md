# Langflow Marketing Website

## Overview
This is a static marketing website for Langflow, a low-code AI builder for agentic and RAG applications. The project was imported from GitHub and appears to be an exported Next.js static site with pre-built HTML, CSS, and assets.

## Project Structure
- `index.html` - Main website landing page
- `server.py` - Python HTTP server for serving static files
- `assets/` - CSS and JavaScript assets
  - `css/inline-styles.css` - Extracted inline styles
  - `js/svg-loader.js` - Dynamic SVG loading script
  - `images/` - Image assets for the website
  - `svgs/` - SVG icon files
- `_next/` - Next.js build output with static CSS and media
- `images/` - Main image assets (logos, graphics, etc.)
- `svgs/` - Additional SVG files
- `blog/` - Contains RSS feed file

## Technical Setup
- **Frontend**: Static HTML/CSS/JavaScript (exported from Next.js)
- **Server**: Python 3.11 HTTP server with CORS support
- **Port**: 5000 (configured for Replit environment)
- **Assets**: Comprehensive SVG loader system for dynamic icon loading

## Development
The website is now configured to run in the Replit environment with:
- Static file server with proper CORS headers
- Cache-control headers to prevent caching issues in Replit's iframe
- Support for all static assets (CSS, JS, images, SVGs)

## Deployment
Configured for Replit autoscale deployment using the Python HTTP server.

## Recent Changes
- **2025-09-05**: Initial setup in Replit environment
  - Created Python HTTP server for static file serving
  - Configured workflow for port 5000
  - Set up deployment configuration
  - All assets and functionality working correctly