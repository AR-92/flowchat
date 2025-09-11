// assets/js/main.js - Central JavaScript file for the FlowChat website

// Initialize all components when HTMX finishes loading
document.addEventListener('htmx:afterOnLoad', function() {
    // Initialize common components
    setTimeout(function() {
        initFAQAccordions();
        initSmoothScrolling();
        initScrollAnimations();
        initIconColors(); // Initialize icon color fixes
        // Only initialize orb animations on the index page
        if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
            initOrbAnimations();
        }
    }, 100); // Small delay to ensure DOM is fully updated
});

// Also initialize on DOMContentLoaded for initial page load
document.addEventListener('DOMContentLoaded', function() {
    // For elements that might already be on the page
    initFAQAccordions();
    initSmoothScrolling();
    initScrollAnimations();
    initIconColors(); // Initialize icon color fixes
    // Only initialize orb animations on the index page
    if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
        initOrbAnimations();
    }
});

// Initialize components when HTMX loads new content
document.addEventListener('htmx:load', function() {
    // Initialize common components for newly loaded content
    setTimeout(function() {
        initFAQAccordions();
        initSmoothScrolling();
        initScrollAnimations();
        initIconColors(); // Initialize icon color fixes
        // Only initialize orb animations on the index page
        if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
            initOrbAnimations();
        }
    }, 100); // Small delay to ensure DOM is fully updated
});

// If the DOM is already loaded, initialize immediately
if (document.readyState === 'loading') {
    // Document is still loading, use event listener
    document.addEventListener('DOMContentLoaded', initAllComponents);
} else {
    // Document is already loaded, initialize immediately
    initAllComponents();
}

// Enhanced initialization that can be called manually
function initAllComponents() {
    initFAQAccordions();
    initSmoothScrolling();
    initScrollAnimations();
    initIconColors(); // Initialize icon color fixes
    // Only initialize orb animations on the index page
    if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
        initOrbAnimations();
    }
}

/** 
 * Initialize FAQ accordion functionality
 * This function is safe to call multiple times
 */
function initFAQAccordions() {
    const faqButtons = document.querySelectorAll('.faq-item button');
    faqButtons.forEach(button => {
        // Remove any existing event listeners to prevent duplicates
        button.removeEventListener('click', handleFAQButtonClick);
        button.addEventListener('click', handleFAQButtonClick);
    });
}

function handleFAQButtonClick() {
    const content = this.nextElementSibling;
    const icon = this.querySelector('i');

    if (content && icon) {
        if (content.classList.contains('hidden')) {
            content.classList.remove('hidden');
            icon.classList.remove('fa-chevron-down');
            icon.classList.add('fa-chevron-up');
        } else {
            content.classList.add('hidden');
            icon.classList.remove('fa-chevron-up');
            icon.classList.add('fa-chevron-down');
        }
    }
}

/** 
 * Initialize smooth scrolling for anchor links
 * This function is safe to call multiple times
 */
function initSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(anchor => {
        // Remove any existing event listeners to prevent duplicates
        anchor.removeEventListener('click', handleAnchorClick);
        anchor.addEventListener('click', handleAnchorClick);
    });
}

function handleAnchorClick(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const target = document.querySelector(targetId);
    
    if (target) {
        window.scrollTo({
            top: target.offsetTop - 80,
            behavior: 'smooth'
        });
    }
}

/** 
 * Initialize scroll animations for elements
 * This function is safe to call multiple times
 */
function initScrollAnimations() {
    // Clean up existing observers to prevent duplicates
    if (window.scrollObservers) {
        window.scrollObservers.forEach(observer => observer.disconnect());
    }
    window.scrollObservers = [];

    // Observer for animate-on-scroll elements
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    window.scrollObservers.push(observer);

    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Observer for feature cards, process steps, and pricing cards
    const featureObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, { threshold: 0.1 });
    
    window.scrollObservers.push(featureObserver);

    const featureElements = document.querySelectorAll('.feature-card, .process-step, .pricing-card');
    featureElements.forEach(el => {
        featureObserver.observe(el);
    });
}

/**
 * Initialize orb animations
 * This function creates random movement for all orbs on the page
 */
function initOrbAnimations() {
    // Get all orbs on the page
    const orbs = document.querySelectorAll('.section-orb');
    
    // Clear any existing animations to prevent duplicates
    orbs.forEach(orb => {
        orb.style.animation = 'none';
        // Remove any existing animation data
        delete orb.animationData;
    });
    
    // Initialize animation for each orb
    orbs.forEach(orb => {
        // Store animation data directly on the element
        orb.animationData = {
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            vx: (Math.random() - 0.5) * 0.5, // Random velocity between -0.25 and 0.25
            vy: (Math.random() - 0.5) * 0.5,
            maxX: window.innerWidth,
            maxY: document.body.scrollHeight // Use full document height
        };
        
        // Start animation
        animateOrb(orb);
    });
}

/**
 * Animate a single orb with random movement
 * @param {HTMLElement} orb - The orb element to animate
 */
function animateOrb(orb) {
    if (!orb.animationData) return;
    
    const data = orb.animationData;
    
    // Update position
    data.x += data.vx;
    data.y += data.vy;
    
    // Boundary checks - bounce off edges
    if (data.x <= 0 || data.x >= data.maxX - orb.offsetWidth) {
        data.vx = -data.vx;
        data.x = Math.max(0, Math.min(data.x, data.maxX - orb.offsetWidth));
    }
    
    if (data.y <= 0 || data.y >= data.maxY - orb.offsetHeight) {
        data.vy = -data.vy;
        data.y = Math.max(0, Math.min(data.y, data.maxY - orb.offsetHeight));
    }
    
    // Apply new position
    orb.style.left = `${data.x}px`;
    orb.style.top = `${data.y}px`;
    
    // Randomly adjust velocity occasionally for more natural movement
    if (Math.random() < 0.02) {
        data.vx += (Math.random() - 0.5) * 0.1;
        data.vy += (Math.random() - 0.5) * 0.1;
        
        // Keep velocities within reasonable bounds
        data.vx = Math.max(-1, Math.min(1, data.vx));
        data.vy = Math.max(-1, Math.min(1, data.vy));
    }
    
    // Continue animation
    requestAnimationFrame(() => animateOrb(orb));
}

/**
 * Utility function to check if an element exists in the DOM
 * @param {string} selector - CSS selector to check
 * @returns {boolean} - True if element exists, false otherwise
 */
function elementExists(selector) {
    return document.querySelector(selector) !== null;
}

/**
 * Utility function to get all elements matching a selector
 * @param {string} selector - CSS selector
 * @returns {NodeList} - NodeList of matching elements
 */
function getElements(selector) {
    return document.querySelectorAll(selector);
}

/**
 * Fix icon colors that might be appearing black
 * This ensures icons with text-accent-500 class display correctly
 */
function initIconColors() {
    // Fix icons with text-accent-500 class
    const accentIcons = document.querySelectorAll('i[class*="fa-"].text-accent-500');
    accentIcons.forEach(icon => {
        icon.style.color = '#9b5cff'; // accent-500 color
    });
    
    // Fix icons in black backgrounds specifically
    const blackBgIcons = document.querySelectorAll('.bg-black i[class*="fa-"], div.bg-black i[class*="fa-"]');
    blackBgIcons.forEach(icon => {
        // If the icon has text-accent-500, make sure it's the right color
        if (icon.classList.contains('text-accent-500')) {
            icon.style.color = '#9b5cff';
        }
    });
}

// Export functions for potential use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initFAQAccordions,
        initSmoothScrolling,
        initScrollAnimations,
        initOrbAnimations,
        initIconColors, // Export the new function
        elementExists,
        getElements
    };
}