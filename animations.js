/* ===================================================
   BookVerse - Animation Utilities
   =================================================== */

// -------------------- Intersection Observer for Animations --------------------
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                // Optional: unobserve after animation
                // observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(el => observer.observe(el));
}

// -------------------- Parallax Effect --------------------
function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    if (parallaxElements.length === 0) return;
    
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        
        parallaxElements.forEach(el => {
            const speed = parseFloat(el.dataset.parallax) || 0.5;
            el.style.transform = `translateY(${scrollY * speed}px)`;
        });
    });
}

// -------------------- Smooth Scroll --------------------
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// -------------------- Cursor Trail Effect (Optional) --------------------
function initCursorTrail() {
    const trail = [];
    const trailLength = 20;
    
    for (let i = 0; i < trailLength; i++) {
        const dot = document.createElement('div');
        dot.className = 'cursor-trail';
        dot.style.cssText = `
            position: fixed;
            width: ${10 - (i * 0.4)}px;
            height: ${10 - (i * 0.4)}px;
            background: var(--gradient-primary);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            opacity: ${1 - (i / trailLength)};
            transition: transform 0.1s ease;
        `;
        document.body.appendChild(dot);
        trail.push({ el: dot, x: 0, y: 0 });
    }
    
    document.addEventListener('mousemove', (e) => {
        trail[0].x = e.clientX;
        trail[0].y = e.clientY;
    });
    
    function animateTrail() {
        for (let i = trail.length - 1; i > 0; i--) {
            trail[i].x = trail[i - 1].x;
            trail[i].y = trail[i - 1].y;
        }
        
        trail.forEach((dot, i) => {
            dot.el.style.left = dot.x - 5 + 'px';
            dot.el.style.top = dot.y - 5 + 'px';
        });
        
        requestAnimationFrame(animateTrail);
    }
    
    animateTrail();
}

// -------------------- Text Reveal Animation --------------------
function initTextReveal() {
    const textElements = document.querySelectorAll('[data-text-reveal]');
    
    textElements.forEach(el => {
        const text = el.textContent;
        el.textContent = '';
        
        text.split('').forEach((char, i) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.opacity = '0';
            span.style.transform = 'translateY(20px)';
            span.style.display = 'inline-block';
            span.style.transition = `opacity 0.3s ease ${i * 0.03}s, transform 0.3s ease ${i * 0.03}s`;
            el.appendChild(span);
        });
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    el.querySelectorAll('span').forEach(span => {
                        span.style.opacity = '1';
                        span.style.transform = 'translateY(0)';
                    });
                }
            });
        });
        
        observer.observe(el);
    });
}

// -------------------- Initialize All Animations --------------------
document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initParallax();
    initSmoothScroll();
    // initCursorTrail(); // Uncomment to enable cursor trail
    // initTextReveal(); // Uncomment to enable text reveal
});

// Make scroll animations globally available
window.initScrollAnimations = initScrollAnimations;
