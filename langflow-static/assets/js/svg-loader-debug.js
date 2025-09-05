/**
 * Dynamic SVG Loader - Debug Version
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
            console.log('Loading SVG:', svgPath);
            
            // Check if already loaded
            if (loadedSvgs.has(svgPath)) {
                console.log('Using cached SVG:', svgPath);
                container.innerHTML = loadedSvgs.get(svgPath);
                return;
            }
            
            // Fetch the SVG content
            const response = await fetch(svgPath);
            console.log('Fetch response for', svgPath, ':', response.status, response.statusText);
            
            if (!response.ok) {
                throw new Error(`Failed to load SVG: ${svgPath} - Status: ${response.status}`);
            }
            
            const svgContent = await response.text();
            console.log('Loaded SVG content for', svgPath, '- Length:', svgContent.length);
            
            // Cache the content
            loadedSvgs.set(svgPath, svgContent);
            
            // Inject into container
            container.innerHTML = svgContent;
            
            // Add a class to indicate it's loaded
            container.classList.add('svg-loaded');
            console.log('Successfully loaded SVG:', svgPath);
        } catch (error) {
            console.error('Error loading SVG:', svgPath, error);
            container.innerHTML = '<span class="svg-error">Failed to load SVG: ' + svgPath + '</span>';
        }
    }
    
    /**
     * Initialize SVG containers that use data attributes
     */
    function initSvgContainers() {
        console.log('Initializing SVG containers');
        // Find all elements with data-svg attribute
        const svgElements = document.querySelectorAll('[data-svg]:not(.svg-loaded)');
        console.log('Found', svgElements.length, 'SVG elements');
        
        svgElements.forEach(element => {
            const svgName = element.getAttribute('data-svg');
            console.log('Processing element with data-svg:', svgName);
            if (svgName) {
                const svgPath = SVG_BASE_PATH + svgName;
                console.log('Constructed path:', svgPath);
                
                // Add container class
                element.classList.add(SVG_CONTAINER_CLASS);
                
                // Load the SVG
                loadSvg(svgPath, element);
            }
        });
    }
    
    /**
     * Public API
     */
    window.SvgLoader = {
        /**
         * Initialize all SVG containers on page
         */
        init: function() {
            console.log('Initializing SVG loader');
            // Initialize containers with data attributes
            initSvgContainers();
        }
    };
    
    // Auto-initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            console.log('DOM content loaded, initializing SVG loader');
            window.SvgLoader.init();
        });
    } else {
        console.log('Document already loaded, initializing SVG loader');
        window.SvgLoader.init();
    }
    
    // Also initialize on page load event for completeness
    window.addEventListener('load', () => {
        console.log('Window loaded, initializing SVG loader');
        window.SvgLoader.init();
    });
    
})();