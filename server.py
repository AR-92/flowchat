#!/usr/bin/env python3
"""
Simple HTTP server for serving static files with proper CORS and caching headers.
Designed to work with the Replit proxy environment.
"""

import http.server
import socketserver
import os
import mimetypes
from urllib.parse import unquote

class StaticFileHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=os.getcwd(), **kwargs)
    
    def end_headers(self):
        # Add CORS headers for Replit proxy
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', '*')
        # Disable caching to prevent issues in Replit's iframe environment
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()
    
    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()
    
    def do_GET(self):
        # Handle root path
        if self.path == '/':
            self.path = '/index.html'
        
        # Remove query parameters for file serving
        path = self.path.split('?')[0]
        
        # Serve the file
        super().do_GET()
    
    def guess_type(self, path):
        """Guess the type of a file."""
        base, ext = os.path.splitext(path)
        if ext in self.extensions_map:
            return self.extensions_map[ext]
        ext = ext.lower()
        if ext in self.extensions_map:
            return self.extensions_map[ext]
        return self.extensions_map.get('.html', 'text/html')

# Set up proper MIME types
mimetypes.add_type('application/javascript', '.js')
mimetypes.add_type('text/css', '.css')
mimetypes.add_type('image/svg+xml', '.svg')

if __name__ == "__main__":
    PORT = 5000
    HOST = "0.0.0.0"  # Required for Replit environment
    
    print(f"Starting server on {HOST}:{PORT}")
    print(f"Serving directory: {os.getcwd()}")
    
    with socketserver.TCPServer((HOST, PORT), StaticFileHandler) as httpd:
        print(f"Server running at http://{HOST}:{PORT}/")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped.")