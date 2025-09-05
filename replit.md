# Langflow Website - Replit Setup

## Project Overview
This is a static website for Langflow (langflow.org) that was exported from a Next.js application. The project contains the complete marketing website with HTML, CSS, JavaScript, and media assets.

## Project Structure
- `index.html` - Main website homepage
- `_next/` - Next.js exported static assets (CSS files)
- `assets/` - Custom assets including CSS, JavaScript, and images
- `images/` - Website images and graphics
- `svgs/` - SVG icons and graphics
- `server.py` - Python HTTP server configured for Replit environment

## Setup Completed
1. **Language Installation**: Python 3.11 installed
2. **Static Server**: Created Python HTTP server with proper MIME types for CSS/JS files
3. **Workflow Configuration**: Set up "Static Server" workflow running on port 5000
4. **Deployment Configuration**: Configured for autoscale deployment
5. **Asset Management**: Fixed missing images by copying from `_next/static/media/`
6. **CORS & Caching**: Configured server for Replit proxy environment with proper headers

## Current Status
- ✅ Server running successfully on port 5000
- ✅ CSS files loading with correct MIME types (`text/css`)
- ✅ All major assets loading (images, SVGs, stylesheets)
- ✅ Deployment configuration ready
- ✅ Website fully functional

## Technical Details
- **Server**: Python HTTP server with custom handler for proper MIME types
- **Port**: 5000 (configured for Replit environment)
- **Host**: 0.0.0.0 (allows external access through Replit proxy)
- **Caching**: Disabled to prevent Replit iframe caching issues
- **CORS**: Enabled for cross-origin requests

## Recent Changes
- Fixed CSS MIME type issue that was preventing proper styling
- Copied missing images from `_next/static/media/` to `images/` directory
- Ensured proper server configuration for Replit's proxy environment

The website is now running correctly and ready for use in the Replit environment.