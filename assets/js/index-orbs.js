// assets/js/index-orbs.js - JavaScript for random orb movement on index page

// Initialize when DOM is ready
function initWhenReady() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initIndexOrbAnimations();
    });
  } else {
    // Document is already loaded, initialize immediately
    initIndexOrbAnimations();
  }
}

// Initialize on DOM ready
initWhenReady();

document.addEventListener('htmx:load', function () {
  // Small delay to ensure DOM is fully updated
  setTimeout(function () {
    initIndexOrbAnimations();
  }, 100);
});

/**
 * Initialize orb animations only for the index page
 */
function initIndexOrbAnimations() {
  // Only run on index page
  if (
    window.location.pathname !== '/' &&
    window.location.pathname !== '/index.html'
  ) {
    return;
  }

  // Get all orbs on the page (both section-orb and hero-orb)
  const sectionOrbs = document.querySelectorAll('.section-orb');
  const heroOrbs = document.querySelectorAll('.hero-orb');
  const allOrbs = [...sectionOrbs, ...heroOrbs];

  // If no orbs found, try again in a bit (in case they're still loading)
  if (allOrbs.length === 0) {
    setTimeout(initIndexOrbAnimations, 500);
    return;
  }

  // Limit orbs on mobile devices for performance
  const maxOrbs =
    window.innerWidth < 768 ? Math.min(3, allOrbs.length) : Math.min(10, allOrbs.length);

  // Clear any existing animations to prevent duplicates
  allOrbs.forEach(orb => {
    // Remove any existing animation data
    delete orb.animationData;
  });

  // Initialize animation for each orb (limited for performance)
  for (let i = 0; i < maxOrbs; i++) {
    const orb = allOrbs[i];
    // Skip orbs that already have animation data
    if (orb.animationData) continue;

    // Store animation data directly on the element
    orb.animationData = {
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 2, // Random velocity between -1 and 1
      vy: (Math.random() - 0.5) * 2,
      scale: 0.8 + Math.random() * 0.4, // Random initial scale between 0.8 and 1.2
      scaleDirection: Math.random() > 0.5 ? 1 : -1, // Growing or shrinking
      scaleSpeed: 0.005 + Math.random() * 0.01, // Random scale speed
      maxX: window.innerWidth,
      maxY: document.body.scrollHeight, // Use full document height
    };

    // Make sure the orb is absolutely positioned
    orb.style.position = 'absolute';

    // Remove CSS animations that might conflict with JS animations
    orb.style.animation = 'none';

    // Set initial position and scale
    orb.style.left = orb.animationData.x + 'px';
    orb.style.top = orb.animationData.y + 'px';
    orb.style.transform = `scale(${orb.animationData.scale})`;

    // Start animation
    animateOrb(orb);
  }

  // Add mouse move listener for cursor-following orbs
  document.addEventListener('mousemove', function (e) {
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
  const now = performance.now();

  // Throttle animation to 30fps (33.33ms) for better performance
  if (now - data.lastUpdate < 33.33) {
    requestAnimationFrame(() => animateOrb(orb));
    return;
  }

  data.lastUpdate = now;

  // Update position
  data.x += data.vx;
  data.y += data.vy;

  // Update scale
  data.scale += data.scaleDirection * data.scaleSpeed;

  // Reverse scale direction at limits
  if (data.scale <= 0.5 || data.scale >= 1.5) {
    data.scaleDirection = -data.scaleDirection;
  }

  // Pre-calculate boundary values to avoid repeated DOM access
  const maxX = data.maxX - orb.offsetWidth;
  const maxY = data.maxY - orb.offsetHeight;

  // Boundary checks - bounce off edges
  if (data.x <= 0 || data.x >= maxX) {
    data.vx = -data.vx;
    data.x = Math.max(0, Math.min(data.x, maxX));
  }

  if (data.y <= 0 || data.y >= maxY) {
    data.vy = -data.vy;
    data.y = Math.max(0, Math.min(data.y, maxY));
  }

  // Apply new position and scale
  orb.style.left = `${data.x}px`;
  orb.style.top = `${data.y}px`;
  orb.style.transform = `scale(${data.scale})`;

  // Randomly adjust velocity occasionally for more natural movement
  if (Math.random() < 0.01) {
    data.vx += (Math.random() - 0.5) * 0.5;
    data.vy += (Math.random() - 0.5) * 0.5;

    // Keep velocities within reasonable bounds
    data.vx = Math.max(-2, Math.min(2, data.vx));
    data.vy = Math.max(-2, Math.min(2, data.vy));
  }

  // Continue animation
  requestAnimationFrame(() => animateOrb(orb));
}
