/**
 * Dynamic SVG Loader
 * Loads SVG files and injects them into the DOM
 */

(function() {
    'use strict';
    
    // Configuration
    const SVG_BASE_PATH = 'assets/svgs/';
    const SVG_CONTAINER_CLASS = 'dynamic-svg-container';
    
    // Keep track of loaded SVGs to avoid duplicates
    const loadedSvgs = new Map();
    
    /**
     * Fetch and inject SVG content into container
     * @param {string} svgPath - Path to the SVG file
     * @param {HTMLElement} container - Container element to inject SVG into
     * @returns {Promise<void>}
     */
    async function loadSvg(svgPath, container) {
        try {
            // Check if already loaded
            if (loadedSvgs.has(svgPath)) {
                container.innerHTML = loadedSvgs.get(svgPath);
                return;
            }
            
            // Fetch the SVG content
            const response = await fetch(svgPath);
            if (!response.ok) {
                throw new Error(`Failed to load SVG: ${svgPath}`);
            }
            
            const svgContent = await response.text();
            
            // Cache the content
            loadedSvgs.set(svgPath, svgContent);
            
            // Inject into container
            container.innerHTML = svgContent;
            
            // Add a class to indicate it's loaded
            container.classList.add('svg-loaded');
        } catch (error) {
            console.error('Error loading SVG:', error);
            container.innerHTML = '<span class="svg-error">Failed to load SVG</span>';
        }
    }
    
    /**
     * Initialize SVG containers that use data attributes
     */
    function initSvgContainers() {
        // Find all elements with data-svg attribute
        const svgElements = document.querySelectorAll('[data-svg]:not(.svg-loaded)');
        
        svgElements.forEach(element => {
            const svgName = element.getAttribute('data-svg');
            if (svgName) {
                const svgPath = SVG_BASE_PATH + svgName;
                
                // Add container class
                element.classList.add(SVG_CONTAINER_CLASS);
                
                // Load the SVG
                loadSvg(svgPath, element);
            }
        });
    }
    
    /**
     * Load all SVGs referenced in img tags pointing to our assets
     */
    function loadImgReferencedSvgs() {
        // Find all img tags that reference SVGs in our assets directory
        const imgElements = document.querySelectorAll('img[src^="assets/svgs/"]:not(.processed), img[src^="/assets/svgs/"]:not(.processed)');
        
        imgElements.forEach(img => {
            const src = img.getAttribute('src');
            const alt = img.getAttribute('alt') || '';
            
            // Create a container for the SVG
            const svgContainer = document.createElement('div');
            svgContainer.className = 'img-svg-container';
            svgContainer.setAttribute('data-svg', src.split('/').pop());
            svgContainer.setAttribute('aria-label', alt);
            
            // Copy over any other attributes we might need
            const width = img.getAttribute('width');
            const height = img.getAttribute('height');
            if (width) svgContainer.style.width = width + 'px';
            if (height) svgContainer.style.height = height + 'px';
            
            // Mark as processed to avoid duplicate processing
            img.classList.add('processed');
            
            // Replace the img with our container
            img.parentNode.replaceChild(svgContainer, img);
            
            // Load the SVG
            const svgPath = SVG_BASE_PATH + src.split('/').pop();
            loadSvg(svgPath, svgContainer);
        });
    }
    
    /**
     * Public API
     */
    window.SvgLoader = {
        /**
         * Load a specific SVG by name
         * @param {string} svgName - Name of the SVG file (without path)
         * @param {string|HTMLElement} target - Target element ID or element
         * @returns {Promise<void>}
         */
        load: async function(svgName, target) {
            const svgPath = SVG_BASE_PATH + svgName;
            let container;
            
            if (typeof target === 'string') {
                container = document.getElementById(target);
            } else {
                container = target;
            }
            
            if (!container) {
                console.error('Target element not found');
                return;
            }
            
            await loadSvg(svgPath, container);
        },
        
        /**
         * Initialize all SVG containers on page
         */
        init: function() {
            // Initialize containers with data attributes
            initSvgContainers();
            
            // Load SVGs referenced in img tags
            loadImgReferencedSvgs();
        },
        
        /**
         * Manually initialize SVG loading for a specific container
         * @param {string} selector - CSS selector for SVG containers
         */
        initSelector: function(selector) {
            const containers = document.querySelectorAll(selector + ':not(.svg-loaded)');
            containers.forEach(container => {
                const svgName = container.getAttribute('data-svg');
                if (svgName) {
                    const svgPath = SVG_BASE_PATH + svgName;
                    loadSvg(svgPath, container);
                }
            });
        },
        
        /**
         * Reload all SVGs (useful for development)
         */
        reload: function() {
            // Clear the cache
            loadedSvgs.clear();
            
            // Remove the loaded class from all containers
            const loadedContainers = document.querySelectorAll('.svg-loaded');
            loadedContainers.forEach(container => {
                container.classList.remove('svg-loaded');
            });
            
            // Reinitialize
            this.init();
        }
    };
    
    // Auto-initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            window.SvgLoader.init();
        });
    } else {
        window.SvgLoader.init();
    }
    
    // Also initialize on page load event for completeness
    window.addEventListener('load', () => {
        window.SvgLoader.init();
    });
    
})();