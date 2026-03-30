/* ===================================================
   BookVerse - Main JavaScript
   =================================================== */

// -------------------- Books Data --------------------
const booksData = [
    {
        id: 1,
        title: "The Art of Deep Work",
        author: "Cal Newport",
        price: 29.99,
        originalPrice: 49.99,
        category: "productivity",
        rating: 4.9,
        reviews: 328,
        image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=600&fit=crop",
        description: "Master the ability to focus without distraction on cognitively demanding tasks. Learn why deep work is becoming increasingly rare and valuable in our economy.",
        isNew: true,
        isBestseller: true,
        pages: 296,
        whatYouLearn: [
            "Build a deep work routine that fits your schedule",
            "Eliminate distractions and focus intensely",
            "Produce high-quality work in less time",
            "Transform your career with rare valuable skills",
            "Balance deep work with shallow obligations"
        ],
        tableOfContents: [
            { title: "Introduction: The Deep Work Hypothesis", duration: "15 min" },
            { title: "Part 1: The Idea", duration: "45 min" },
            { title: "Deep Work Is Valuable", duration: "30 min" },
            { title: "Deep Work Is Rare", duration: "25 min" },
            { title: "Deep Work Is Meaningful", duration: "35 min" },
            { title: "Part 2: The Rules", duration: "60 min" },
            { title: "Work Deeply", duration: "40 min" },
            { title: "Embrace Boredom", duration: "30 min" },
            { title: "Quit Social Media", duration: "25 min" },
            { title: "Drain the Shallows", duration: "35 min" }
        ]
    },
    {
        id: 2,
        title: "Design Systems Handbook",
        author: "Marco Suarez",
        price: 34.99,
        originalPrice: 59.99,
        category: "design",
        rating: 4.8,
        reviews: 256,
        image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop",
        description: "A comprehensive guide to creating, documenting, and maintaining design systems. Perfect for designers and developers working on scalable products.",
        isNew: true,
        isBestseller: false,
        pages: 312,
        whatYouLearn: [
            "Understand design system fundamentals",
            "Create scalable component libraries",
            "Document design decisions effectively",
            "Implement design tokens",
            "Maintain and evolve your system"
        ],
        tableOfContents: [
            { title: "What is a Design System?", duration: "20 min" },
            { title: "Getting Started", duration: "30 min" },
            { title: "Design Tokens", duration: "45 min" },
            { title: "Component Architecture", duration: "50 min" },
            { title: "Documentation", duration: "35 min" },
            { title: "Governance", duration: "25 min" }
        ]
    },
    {
        id: 3,
        title: "Modern JavaScript Mastery",
        author: "Sarah Chen",
        price: 39.99,
        originalPrice: 69.99,
        category: "technology",
        rating: 4.9,
        reviews: 412,
        image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop",
        description: "From ES6 to the latest features, master modern JavaScript with practical examples and real-world projects. Level up your coding skills today.",
        isNew: false,
        isBestseller: true,
        pages: 458,
        whatYouLearn: [
            "Master ES6+ syntax and features",
            "Understand async programming patterns",
            "Build modern web applications",
            "Work with APIs and data fetching",
            "Implement best practices and patterns"
        ],
        tableOfContents: [
            { title: "Introduction to Modern JS", duration: "25 min" },
            { title: "Variables and Scoping", duration: "30 min" },
            { title: "Arrow Functions", duration: "35 min" },
            { title: "Destructuring", duration: "40 min" },
            { title: "Promises and Async/Await", duration: "55 min" },
            { title: "Modules", duration: "30 min" },
            { title: "Classes", duration: "45 min" },
            { title: "Advanced Patterns", duration: "60 min" }
        ]
    },
    {
        id: 4,
        title: "Startup Growth Playbook",
        author: "Michael Torres",
        price: 44.99,
        originalPrice: 79.99,
        category: "business",
        rating: 4.7,
        reviews: 189,
        image: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=600&fit=crop",
        description: "Learn proven strategies to scale your startup from zero to millions. Real case studies from successful founders and actionable frameworks.",
        isNew: false,
        isBestseller: false,
        pages: 342,
        whatYouLearn: [
            "Validate your business idea quickly",
            "Find product-market fit",
            "Build a growth engine",
            "Raise funding effectively",
            "Scale your team and operations"
        ],
        tableOfContents: [
            { title: "The Startup Mindset", duration: "30 min" },
            { title: "Idea Validation", duration: "45 min" },
            { title: "MVP Development", duration: "40 min" },
            { title: "Growth Strategies", duration: "55 min" },
            { title: "Fundraising", duration: "50 min" },
            { title: "Scaling Operations", duration: "45 min" }
        ]
    },
    {
        id: 5,
        title: "Mindful Leadership",
        author: "Emma Williams",
        price: 24.99,
        originalPrice: 44.99,
        category: "mindfulness",
        rating: 4.8,
        reviews: 276,
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
        description: "Combine mindfulness practices with leadership skills to become a more effective and compassionate leader. Transform your team and organization.",
        isNew: true,
        isBestseller: false,
        pages: 268,
        whatYouLearn: [
            "Practice mindful decision-making",
            "Lead with emotional intelligence",
            "Build resilient teams",
            "Handle stress effectively",
            "Create a mindful workplace culture"
        ],
        tableOfContents: [
            { title: "What is Mindful Leadership?", duration: "20 min" },
            { title: "Self-Awareness", duration: "35 min" },
            { title: "Emotional Intelligence", duration: "40 min" },
            { title: "Mindful Communication", duration: "45 min" },
            { title: "Building Team Trust", duration: "35 min" },
            { title: "Sustaining Practice", duration: "25 min" }
        ]
    },
    {
        id: 6,
        title: "Financial Freedom Blueprint",
        author: "Robert Kim",
        price: 32.99,
        originalPrice: 54.99,
        category: "finance",
        rating: 4.6,
        reviews: 198,
        image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=400&h=600&fit=crop",
        description: "Build lasting wealth with proven strategies for investing, saving, and creating passive income streams. Your roadmap to financial independence.",
        isNew: false,
        isBestseller: false,
        pages: 324,
        whatYouLearn: [
            "Create a bulletproof budget",
            "Invest wisely in any market",
            "Build multiple income streams",
            "Minimize taxes legally",
            "Plan for early retirement"
        ],
        tableOfContents: [
            { title: "Financial Foundations", duration: "30 min" },
            { title: "Budgeting Mastery", duration: "35 min" },
            { title: "Investing Basics", duration: "45 min" },
            { title: "Stock Market Strategies", duration: "55 min" },
            { title: "Real Estate Investing", duration: "50 min" },
            { title: "Passive Income", duration: "40 min" }
        ]
    },
    {
        id: 7,
        title: "UX Research Methods",
        author: "Lisa Park",
        price: 36.99,
        originalPrice: 64.99,
        category: "design",
        rating: 4.8,
        reviews: 167,
        image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=600&fit=crop",
        description: "Master user research techniques to create products people love. From interviews to usability testing, learn methods that drive product success.",
        isNew: false,
        isBestseller: true,
        pages: 298,
        whatYouLearn: [
            "Conduct effective user interviews",
            "Design and run usability tests",
            "Analyze qualitative data",
            "Create actionable insights",
            "Present findings to stakeholders"
        ],
        tableOfContents: [
            { title: "Introduction to UX Research", duration: "25 min" },
            { title: "Research Planning", duration: "35 min" },
            { title: "User Interviews", duration: "45 min" },
            { title: "Usability Testing", duration: "50 min" },
            { title: "Data Analysis", duration: "40 min" },
            { title: "Reporting Results", duration: "30 min" }
        ]
    },
    {
        id: 8,
        title: "AI & Machine Learning Fundamentals",
        author: "David Zhang",
        price: 49.99,
        originalPrice: 89.99,
        category: "technology",
        rating: 4.9,
        reviews: 384,
        image: "https://images.unsplash.com/photo-1485988412941-77a35537dae4?w=400&h=600&fit=crop",
        description: "Understand the foundations of AI and ML without a PhD. Practical knowledge for building intelligent applications and understanding the AI revolution.",
        isNew: true,
        isBestseller: true,
        pages: 412,
        whatYouLearn: [
            "Understand AI/ML core concepts",
            "Build your first ML models",
            "Work with neural networks",
            "Apply AI to real problems",
            "Navigate the AI landscape"
        ],
        tableOfContents: [
            { title: "What is AI?", duration: "30 min" },
            { title: "Machine Learning Basics", duration: "45 min" },
            { title: "Supervised Learning", duration: "55 min" },
            { title: "Neural Networks", duration: "60 min" },
            { title: "Deep Learning", duration: "65 min" },
            { title: "Practical Applications", duration: "50 min" }
        ]
    }
];

// -------------------- DOM Ready --------------------
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all modules
    initLoader();
    initNavbar();
    initScrollProgress();
    initScrollAnimations();
    initTypingEffect();
    initCounters();
    initFeaturedBooks();
    initTestimonials();
    initNewsletterForm();
    initMagneticButtons();
    initSoundEffects();
    initSearchOverlay();
    updateCartCount();
});

// -------------------- Loading Screen --------------------
function initLoader() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (!loadingScreen) return;
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            document.body.style.overflow = '';
        }, 1000);
    });
}

// -------------------- Navbar --------------------
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    // Scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close menu on link click
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
}

// -------------------- Scroll Progress --------------------
function initScrollProgress() {
    const scrollProgress = document.getElementById('scrollProgress');
    if (!scrollProgress) return;
    
    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = (scrollTop / scrollHeight) * 100;
        scrollProgress.style.width = progress + '%';
    });
}

// -------------------- Scroll Animations --------------------
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(el => observer.observe(el));
}

// -------------------- Typing Effect --------------------
function initTypingEffect() {
    const typingElement = document.getElementById('typingText');
    if (!typingElement) return;
    
    const words = ['Premium eBooks', 'Expert Knowledge', 'Digital Wisdom', 'Endless Learning'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;
    
    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typingElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500;
        }
        
        setTimeout(type, typeSpeed);
    }
    
    setTimeout(type, 1000);
}

// -------------------- Counter Animation --------------------
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseFloat(counter.dataset.count);
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;
                
                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        counter.textContent = target % 1 === 0 ? Math.floor(current) : current.toFixed(1);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target % 1 === 0 ? target : target.toFixed(1);
                    }
                };
                
                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

// -------------------- Featured Books --------------------
function initFeaturedBooks() {
    const container = document.getElementById('featuredBooks');
    if (!container) return;
    
    const featuredBooks = booksData.filter(book => book.isBestseller || book.isNew).slice(0, 4);
    
    featuredBooks.forEach((book, index) => {
        const card = createBookCard(book);
        card.classList.add('animate-on-scroll');
        card.style.transitionDelay = `${index * 100}ms`;
        container.appendChild(card);
    });
    
    // Re-init animations for new elements
    initScrollAnimations();
}

// -------------------- Create Book Card --------------------
function createBookCard(book) {
    const card = document.createElement('article');
    card.className = 'book-card';
    card.dataset.bookId = book.id;
    
    const discount = Math.round((1 - book.price / book.originalPrice) * 100);
    
    card.innerHTML = `
        <div class="book-card-image">
            <img src="${book.image}" alt="${book.title}" loading="lazy">
            ${book.isNew ? '<span class="book-card-badge">New</span>' : ''}
            ${book.isBestseller && !book.isNew ? '<span class="book-card-badge" style="background: var(--accent-amber)">Bestseller</span>' : ''}
            <div class="book-card-actions">
                <button class="book-card-action" onclick="quickView(${book.id})" title="Quick View">
                    <i class="ri-eye-line"></i>
                </button>
                <button class="book-card-action" onclick="addToWishlist(${book.id})" title="Add to Wishlist">
                    <i class="ri-heart-line"></i>
                </button>
            </div>
        </div>
        <div class="book-card-content">
            <span class="book-card-category">${book.category}</span>
            <h3 class="book-card-title">
                <a href="book-detail.html?id=${book.id}">${book.title}</a>
            </h3>
            <p class="book-card-author">by ${book.author}</p>
            <div class="book-card-rating">
                ${generateStars(book.rating)}
                <span>${book.rating} (${book.reviews})</span>
            </div>
            <div class="book-card-footer">
                <div class="book-card-price">
                    $${book.price.toFixed(2)}
                    <span class="original">$${book.originalPrice.toFixed(2)}</span>
                </div>
                <button class="book-card-btn" onclick="addToCart(${book.id})" title="Add to Cart">
                    <i class="ri-shopping-bag-3-line"></i>
                </button>
            </div>
        </div>
    `;
    
    return card;
}

// -------------------- Generate Star Rating --------------------
function generateStars(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="ri-star-fill"></i>';
    }
    
    if (hasHalfStar) {
        stars += '<i class="ri-star-half-fill"></i>';
    }
    
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="ri-star-line"></i>';
    }
    
    return stars;
}

// -------------------- Quick View --------------------
function quickView(bookId) {
    const book = booksData.find(b => b.id === bookId);
    if (!book) return;
    
    const modal = document.getElementById('quickViewModal');
    const content = document.getElementById('quickViewContent');
    
    content.innerHTML = `
        <div class="quick-view-layout">
            <div class="quick-view-image">
                <img src="${book.image}" alt="${book.title}">
            </div>
            <div class="quick-view-info">
                <span class="book-card-category">${book.category}</span>
                <h2>${book.title}</h2>
                <p class="book-author">by ${book.author}</p>
                <div class="book-card-rating">
                    ${generateStars(book.rating)}
                    <span>${book.rating} (${book.reviews} reviews)</span>
                </div>
                <p class="book-description">${book.description}</p>
                <div class="book-price-section">
                    <span class="book-price">$${book.price.toFixed(2)}</span>
                    <span class="book-original-price">$${book.originalPrice.toFixed(2)}</span>
                </div>
                <div class="quick-view-actions">
                    <button class="btn btn-primary" onclick="addToCart(${book.id}); closeModal();">
                        <i class="ri-shopping-bag-3-line"></i>
                        <span>Add to Cart</span>
                    </button>
                    <a href="book-detail.html?id=${book.id}" class="btn btn-secondary">
                        <span>View Details</span>
                    </a>
                </div>
            </div>
        </div>
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    playClickSound();
}

// -------------------- Close Modal --------------------
function closeModal() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.classList.remove('active');
    });
    document.body.style.overflow = '';
}

// Initialize modal close
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay') || e.target.classList.contains('modal-close')) {
        closeModal();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// -------------------- Add to Wishlist --------------------
function addToWishlist(bookId) {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    
    if (!wishlist.includes(bookId)) {
        wishlist.push(bookId);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        showToast('success', 'Added to Wishlist', 'Book has been added to your wishlist.');
    } else {
        showToast('info', 'Already in Wishlist', 'This book is already in your wishlist.');
    }
    
    playClickSound();
}

// -------------------- Testimonials Slider --------------------
function initTestimonials() {
    const slider = document.getElementById('testimonialsSlider');
    const prevBtn = document.getElementById('testimonialPrev');
    const nextBtn = document.getElementById('testimonialNext');
    const dotsContainer = document.getElementById('testimonialDots');
    
    if (!slider) return;
    
    const cards = slider.querySelectorAll('.testimonial-card');
    let currentIndex = 0;
    
    // Create dots
    cards.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = `dot ${index === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    const dots = dotsContainer.querySelectorAll('.dot');
    
    function goToSlide(index) {
        currentIndex = index;
        const scrollAmount = cards[0].offsetWidth + 32; // Card width + gap
        slider.scrollTo({
            left: scrollAmount * index,
            behavior: 'smooth'
        });
        updateDots();
    }
    
    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + cards.length) % cards.length;
            goToSlide(currentIndex);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % cards.length;
            goToSlide(currentIndex);
        });
    }
}

// -------------------- Newsletter Form --------------------
function initNewsletterForm() {
    const form = document.getElementById('newsletterForm');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = form.querySelector('input[type="email"]').value;
        
        // Simulate submission
        showToast('success', 'Subscribed!', 'Welcome to BookVerse! Check your email for 20% off.');
        form.reset();
        playClickSound();
    });
}

// -------------------- Magnetic Buttons --------------------
function initMagneticButtons() {
    const magneticElements = document.querySelectorAll('.magnetic');
    
    magneticElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });
        
        el.addEventListener('mouseleave', () => {
            el.style.transform = '';
        });
    });
}

// -------------------- Sound Effects --------------------
let soundEnabled = true;

function initSoundEffects() {
    // Add click sound to all buttons
    document.addEventListener('click', (e) => {
        if (e.target.closest('button, .btn, a')) {
            playClickSound();
        }
    });
}

function playClickSound() {
    if (!soundEnabled) return;
    
    // Create a simple click sound using Web Audio API
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    } catch (e) {
        // Audio not supported
    }
}

// -------------------- Search Overlay --------------------
function initSearchOverlay() {
    const searchToggle = document.getElementById('searchToggle');
    const searchOverlay = document.getElementById('searchOverlay');
    const searchClose = document.getElementById('searchClose');
    const searchInput = document.getElementById('globalSearch');
    const searchResults = document.getElementById('globalSearchResults');
    
    if (!searchToggle || !searchOverlay) return;
    
    searchToggle.addEventListener('click', () => {
        searchOverlay.classList.add('active');
        searchInput.focus();
        document.body.style.overflow = 'hidden';
    });
    
    searchClose.addEventListener('click', () => {
        searchOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        
        if (query.length < 2) {
            searchResults.innerHTML = '';
            return;
        }
        
        const results = booksData.filter(book =>
            book.title.toLowerCase().includes(query) ||
            book.author.toLowerCase().includes(query) ||
            book.category.toLowerCase().includes(query)
        );
        
        if (results.length > 0) {
            searchResults.innerHTML = results.map(book => `
                <a href="book-detail.html?id=${book.id}" class="search-result-item">
                    <img src="${book.image}" alt="${book.title}">
                    <div class="search-result-info">
                        <h4>${book.title}</h4>
                        <span>by ${book.author} • $${book.price.toFixed(2)}</span>
                    </div>
                </a>
            `).join('');
        } else {
            searchResults.innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: 20px;">No books found</p>';
        }
    });
}

// -------------------- Toast Notifications --------------------
function showToast(type, title, message) {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icons = {
        success: 'ri-check-line',
        error: 'ri-close-line',
        info: 'ri-information-line',
        warning: 'ri-alert-line'
    };
    
    toast.innerHTML = `
        <div class="toast-icon">
            <i class="${icons[type]}"></i>
        </div>
        <div class="toast-message">
            <h4>${title}</h4>
            <p>${message}</p>
        </div>
        <button class="toast-close" onclick="this.parentElement.remove()">
            <i class="ri-close-line"></i>
        </button>
    `;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('removing');
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

// -------------------- Cart Count --------------------
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const countElements = document.querySelectorAll('#cartCount, .cart-count');
    
    countElements.forEach(el => {
        el.textContent = cart.length;
        el.style.display = cart.length > 0 ? 'flex' : 'none';
    });
}

// Make booksData globally accessible
window.booksData = booksData;
window.showToast = showToast;
window.updateCartCount = updateCartCount;
window.quickView = quickView;
window.addToWishlist = addToWishlist;
window.closeModal = closeModal;
