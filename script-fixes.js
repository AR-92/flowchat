// JavaScript fixes and enhancements

// Error handling for the entire page
window.addEventListener('error', function(e) {
    console.log('Global error caught:', e.error);
});

// Polyfill for older browsers
if (!window.fetch) {
    console.warn('Fetch API not supported, SVG loading may not work properly');
}

// Enhanced image loading with error handling
document.addEventListener('DOMContentLoaded', function() {
    // Fix any broken image sources
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            // Replace broken images with a placeholder
            this.style.opacity = '0.5';
            this.alt = 'Image not found';
        });
        
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
    });
    
    // Fix placeholder links
    const placeholderLinks = document.querySelectorAll('a[href="#"]');
    placeholderLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Placeholder link clicked:', this.textContent.trim());
        });
    });
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Interactive elements enhancement
    const buttons = document.querySelectorAll('button, .styles_button__UViuC');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add click effect
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 100);
        });
    });
    
    // Form elements enhancement
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.outline = '2px solid #0066cc';
        });
        
        input.addEventListener('blur', function() {
            this.style.outline = '';
        });
    });
    
    // Slider functionality
    const sliders = document.querySelectorAll('input[type="range"]');
    sliders.forEach(slider => {
        const updateSlider = () => {
            const value = slider.value;
            const min = slider.min || 0;
            const max = slider.max || 1;
            const percentage = ((value - min) / (max - min)) * 100;
            
            // Update any associated display elements
            const tempDisplay = document.querySelector('.styles_temperature__NRi0z');
            if (tempDisplay && slider.title === 'Temperature') {
                tempDisplay.textContent = parseFloat(value).toFixed(1);
            }
            
            // Update track visual
            const track = slider.parentElement.querySelector('.styles_activeTrack__J_euN');
            if (track) {
                track.style.width = percentage + '%';
            }
        };
        
        slider.addEventListener('input', updateSlider);
        updateSlider(); // Initialize
    });
});

// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.querySelector('.styles_menuButton__rVWes');
    const nav = document.querySelector('.styles_nav__TOfG9');
    
    if (menuButton && nav) {
        menuButton.addEventListener('click', function() {
            nav.style.display = nav.style.display === 'block' ? 'none' : 'block';
            menuButton.classList.toggle('active');
        });
    }
});

// Performance optimization
document.addEventListener('DOMContentLoaded', function() {
    // Lazy load images that are not in viewport
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
});

console.log('Script fixes loaded successfully');