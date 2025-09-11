// assets/js/index-orbs.js - JavaScript for random orb movement on index page

console.log('Index orbs script loaded');

// Wrap everything in a try/catch to catch any early errors
try {
    // Function to initialize when DOM is ready
    function initWhenReady() {
        console.log('Init when ready called');
        if (document.readyState === 'loading') {
            console.log('Document still loading, waiting for DOMContentLoaded');
            document.addEventListener('DOMContentLoaded', function() {
                console.log('DOM Content Loaded');
                initIndexOrbAnimations();
            });
        } else {
            console.log('Document already loaded, initializing immediately');
            // Document is already loaded, initialize immediately
            initIndexOrbAnimations();
        }
    }

    // Initialize on DOM ready
    initWhenReady();

    document.addEventListener('htmx:load', function() {
        console.log('HTMX Load Event');
        // Small delay to ensure DOM is fully updated
        setTimeout(function() {
            initIndexOrbAnimations();
        }, 100);
    });

    /**\n     * Initialize orb animations only for the index page\n     */
    function initIndexOrbAnimations() {
        console.log('Init Index Orb Animations called');
        console.log('Current path:', window.location.pathname);
        
        // Only run on index page
        if (window.location.pathname !== '/' && window.location.pathname !== '/index.html') {
            console.log('Not on index page, exiting');
            return;
        }
        
        console.log('On index page, continuing');
        
        // Get all orbs on the page (both section-orb and hero-orb)
        const sectionOrbs = document.querySelectorAll('.section-orb');
        const heroOrbs = document.querySelectorAll('.hero-orb');
        const allOrbs = [...sectionOrbs, ...heroOrbs];
        
        console.log('Found orbs:', allOrbs.length);
        
        // If no orbs found, try again in a bit (in case they're still loading)
        if (allOrbs.length === 0) {
            console.log('No orbs found, trying again in 500ms');
            setTimeout(initIndexOrbAnimations, 500);
            return;
        }
        
        // Randomize number of orbs (between 50% and 100% of existing orbs, with minimum of 50)
        const maxOrbs = Math.max(50, Math.floor(allOrbs.length * (0.5 + Math.random() * 0.5)));
        
        // Determine how many orbs will follow the cursor (10-20% of total orbs)
        const cursorFollowerCount = Math.max(3, Math.floor(maxOrbs * (0.1 + Math.random() * 0.1)));
        
        // Clear any existing animations to prevent duplicates
        allOrbs.forEach((orb, index) => {
            // Hide orbs that are beyond our random count
            if (index >= maxOrbs) {
                orb.style.display = 'none';
                return;
            }
            
            orb.style.animation = 'none';
            // Remove CSS positioning classes that might conflict
            orb.classList.remove('top-1/2', 'left-2/5', 'top-1/3', 'right-1/4', 'top-1/4', 'right-10', 'left-1/3', 'top-20');
            // Remove transform classes that might conflict
            orb.classList.remove('transform', '-translate-x-1/2', '-translate-y-1/2');
            // Remove any existing animation data
            delete orb.animationData;
        });
        
        // Initialize animation for each visible orb
        for (let i = 0; i < maxOrbs; i++) {
            const orb = allOrbs[i];
            
            // Skip orbs that already have animation data
            if (orb.animationData) continue;
            
            // Decide if this orb will follow the cursor
            const isCursorFollower = i < cursorFollowerCount;
            
            // Store animation data directly on the element
            orb.animationData = {
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                vx: (Math.random() - 0.5) * 4, // Random velocity between -2 and 2 (8x faster)
                vy: (Math.random() - 0.5) * 4,
                scale: 0.5 + Math.random() * 1.5, // Random initial scale between 0.5 and 2
                scaleDirection: Math.random() > 0.5 ? 1 : -1, // Growing or shrinking
                scaleSpeed: 0.01 + Math.random() * 0.02, // Random scale speed
                isCursorFollower: isCursorFollower, // Whether this orb follows the cursor
                maxX: window.innerWidth,
                maxY: document.body.scrollHeight // Use full document height
            };
            
            // Make sure the orb is absolutely positioned
            orb.style.position = 'absolute';
            orb.style.left = orb.animationData.x + 'px';
            orb.style.top = orb.animationData.y + 'px';
            
            // Remove any CSS that might interfere with positioning
            orb.style.transform = 'none';
            orb.style.removeProperty('top');
            orb.style.removeProperty('left');
            orb.style.removeProperty('right');
            orb.style.removeProperty('bottom');
            
            // Set initial position and scale
            orb.style.left = orb.animationData.x + 'px';
            orb.style.top = orb.animationData.y + 'px';
            orb.style.transform = `scale(${orb.animationData.scale})`;
            
            console.log('Initialized orb at:', orb.animationData.x, orb.animationData.y);
            
            // Start animation
            if (isCursorFollower) {
                animateCursorFollowerOrb(orb);
            } else {
                animateOrb(orb);
            }
        }
        
        // Add mouse move listener for cursor-following orbs
        document.addEventListener('mousemove', function(e) {
            window.mouseX = e.clientX;
            window.mouseY = e.clientY;
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
        
        // Update scale
        data.scale += data.scaleDirection * data.scaleSpeed;
        
        // Reverse scale direction at limits
        if (data.scale <= 0.3 || data.scale >= 3) {
            data.scaleDirection = -data.scaleDirection;
        }
        
        // Boundary checks - bounce off edges
        if (data.x <= 0 || data.x >= data.maxX - orb.offsetWidth) {
            data.vx = -data.vx;
            data.x = Math.max(0, Math.min(data.x, data.maxX - orb.offsetWidth));
        }
        
        if (data.y <= 0 || data.y >= data.maxY - orb.offsetHeight) {
            data.vy = -data.vy;
            data.y = Math.max(0, Math.min(data.y, data.maxY - orb.offsetHeight));
        }
        
        // Apply new position and scale
        orb.style.left = `${data.x}px`;
        orb.style.top = `${data.y}px`;
        orb.style.transform = `scale(${data.scale})`;
        
        // Randomly adjust velocity occasionally for more natural movement
        if (Math.random() < 0.02) {
            data.vx += (Math.random() - 0.5) * 0.8;
            data.vy += (Math.random() - 0.5) * 0.8;
            
            // Keep velocities within reasonable bounds
            data.vx = Math.max(-8, Math.min(8, data.vx));
            data.vy = Math.max(-8, Math.min(8, data.vy));
        }
        
        // Continue animation
        requestAnimationFrame(() => animateOrb(orb));
    }
    
    /**
     * Animate a single orb that follows the cursor
     * @param {HTMLElement} orb - The orb element to animate
     */
    function animateCursorFollowerOrb(orb) {
        if (!orb.animationData) return;
        
        const data = orb.animationData;
        
        // If we have mouse coordinates, move toward them
        if (window.mouseX !== undefined && window.mouseY !== undefined) {
            // Calculate direction to cursor
            const dx = window.mouseX - data.x;
            const dy = window.mouseY - data.y;
            
            // Move a percentage of the way to the cursor (creates a following effect)
            data.x += dx * 0.05;
            data.y += dy * 0.05;
        }
        
        // Update scale
        data.scale += data.scaleDirection * data.scaleSpeed;
        
        // Reverse scale direction at limits
        if (data.scale <= 0.3 || data.scale >= 3) {
            data.scaleDirection = -data.scaleDirection;
        }
        
        // Apply new position and scale
        orb.style.left = `${data.x}px`;
        orb.style.top = `${data.y}px`;
        orb.style.transform = `scale(${data.scale})`;
        
        // Continue animation
        requestAnimationFrame(() => animateCursorFollowerOrb(orb));
    }
} catch (error) {
    console.error('Error in index-orbs.js:', error);
}