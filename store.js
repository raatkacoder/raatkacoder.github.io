/* ===================================================
   BookVerse - Store Page
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {
    if (!document.getElementById('storeBooks')) return;
    
    initStoreFilters();
    renderStoreBooks();
    initViewToggle();
    initMobileFilters();
});

let currentFilters = {
    search: '',
    categories: ['all'],
    maxPrice: 100,
    rating: 'all',
    sort: 'featured'
};

// -------------------- Initialize Filters --------------------
function initStoreFilters() {
    // Search
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', debounce((e) => {
            currentFilters.search = e.target.value.toLowerCase();
            renderStoreBooks();
        }, 300));
    }
    
    // Categories
    const categoryFilters = document.getElementById('categoryFilters');
    if (categoryFilters) {
        categoryFilters.addEventListener('change', (e) => {
            if (e.target.type === 'checkbox') {
                const value = e.target.value;
                
                if (value === 'all') {
                    currentFilters.categories = ['all'];
                    categoryFilters.querySelectorAll('input:not([value="all"])').forEach(cb => cb.checked = false);
                } else {
                    const allCheckbox = categoryFilters.querySelector('input[value="all"]');
                    allCheckbox.checked = false;
                    
                    const index = currentFilters.categories.indexOf('all');
                    if (index > -1) currentFilters.categories.splice(index, 1);
                    
                    if (e.target.checked) {
                        currentFilters.categories.push(value);
                    } else {
                        const catIndex = currentFilters.categories.indexOf(value);
                        if (catIndex > -1) currentFilters.categories.splice(catIndex, 1);
                    }
                    
                    if (currentFilters.categories.length === 0) {
                        currentFilters.categories = ['all'];
                        allCheckbox.checked = true;
                    }
                }
                
                renderStoreBooks();
            }
        });
    }
    
    // Price Range
    const priceRange = document.getElementById('priceRange');
    const priceValue = document.getElementById('priceValue');
    if (priceRange && priceValue) {
        priceRange.addEventListener('input', (e) => {
            currentFilters.maxPrice = parseInt(e.target.value);
            priceValue.textContent = `$${e.target.value}`;
            renderStoreBooks();
        });
    }
    
    // Rating
    const ratingFilters = document.getElementById('ratingFilters');
    if (ratingFilters) {
        ratingFilters.addEventListener('change', (e) => {
            if (e.target.type === 'radio') {
                currentFilters.rating = e.target.value;
                renderStoreBooks();
            }
        });
    }
    
    // Sort
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            currentFilters.sort = e.target.value;
            renderStoreBooks();
        });
    }
    
    // Clear Filters
    const clearFilters = document.getElementById('clearFilters');
    if (clearFilters) {
        clearFilters.addEventListener('click', () => {
            currentFilters = {
                search: '',
                categories: ['all'],
                maxPrice: 100,
                rating: 'all',
                sort: 'featured'
            };
            
            // Reset UI
            if (searchInput) searchInput.value = '';
            if (priceRange) priceRange.value = 100;
            if (priceValue) priceValue.textContent = '$100';
            if (sortSelect) sortSelect.value = 'featured';
            
            document.querySelectorAll('.filter-option input').forEach(input => {
                if (input.value === 'all') input.checked = true;
                else input.checked = false;
            });
            
            renderStoreBooks();
        });
    }
    
    // Check URL for category filter
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    if (categoryParam) {
        currentFilters.categories = [categoryParam];
        const checkbox = categoryFilters?.querySelector(`input[value="${categoryParam}"]`);
        if (checkbox) {
            checkbox.checked = true;
            categoryFilters.querySelector('input[value="all"]').checked = false;
        }
    }
}

// -------------------- Render Store Books --------------------
function renderStoreBooks() {
    const container = document.getElementById('storeBooks');
    const resultsCount = document.getElementById('resultsCount');
    
    if (!container) return;
    
    let filteredBooks = [...window.booksData];
    
    // Apply search filter
    if (currentFilters.search) {
        filteredBooks = filteredBooks.filter(book =>
            book.title.toLowerCase().includes(currentFilters.search) ||
            book.author.toLowerCase().includes(currentFilters.search) ||
            book.category.toLowerCase().includes(currentFilters.search)
        );
    }
    
    // Apply category filter
    if (!currentFilters.categories.includes('all')) {
        filteredBooks = filteredBooks.filter(book =>
            currentFilters.categories.includes(book.category)
        );
    }
    
    // Apply price filter
    filteredBooks = filteredBooks.filter(book => book.price <= currentFilters.maxPrice);
    
    // Apply rating filter
    if (currentFilters.rating !== 'all') {
        const minRating = parseFloat(currentFilters.rating);
        filteredBooks = filteredBooks.filter(book => book.rating >= minRating);
    }
    
    // Apply sorting
    switch (currentFilters.sort) {
        case 'newest':
            filteredBooks.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
            break;
        case 'price-low':
            filteredBooks.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredBooks.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            filteredBooks.sort((a, b) => b.rating - a.rating);
            break;
        default: // featured
            filteredBooks.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));
    }
    
    // Update results count
    if (resultsCount) {
        resultsCount.textContent = filteredBooks.length;
    }
    
    // Render books
    container.innerHTML = '';
    
    if (filteredBooks.length === 0) {
        container.innerHTML = `
            <div class="no-results" style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
                <i class="ri-search-line" style="font-size: 3rem; color: var(--gray-300);"></i>
                <h3 style="margin: 20px 0 10px;">No books found</h3>
                <p style="color: var(--text-secondary);">Try adjusting your filters or search term.</p>
            </div>
        `;
        return;
    }
    
    filteredBooks.forEach((book, index) => {
        const card = createBookCard(book);
        card.classList.add('animate-on-scroll');
        card.style.animationDelay = `${index * 50}ms`;
        container.appendChild(card);
    });
    
    // Re-init scroll animations
    if (typeof initScrollAnimations === 'function') {
        initScrollAnimations();
    }
}

// -------------------- Create Book Card --------------------
function createBookCard(book) {
    const card = document.createElement('article');
    card.className = 'book-card';
    card.dataset.bookId = book.id;
    
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

// -------------------- Generate Stars --------------------
function generateStars(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="ri-star-fill"></i>';
    }
    if (hasHalfStar) stars += '<i class="ri-star-half-fill"></i>';
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="ri-star-line"></i>';
    }
    
    return stars;
}

// -------------------- View Toggle --------------------
function initViewToggle() {
    const viewBtns = document.querySelectorAll('.view-btn');
    const booksGrid = document.getElementById('storeBooks');
    
    viewBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            viewBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const view = btn.dataset.view;
            if (view === 'list') {
                booksGrid.style.gridTemplateColumns = '1fr';
                booksGrid.classList.add('list-view');
            } else {
                booksGrid.style.gridTemplateColumns = '';
                booksGrid.classList.remove('list-view');
            }
        });
    });
}

// -------------------- Mobile Filters --------------------
function initMobileFilters() {
    const filterToggle = document.getElementById('filterToggle');
    const sidebar = document.getElementById('storeSidebar');
    
    if (!filterToggle || !sidebar) return;
    
    filterToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
        document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close on outside click
    document.addEventListener('click', (e) => {
        if (sidebar.classList.contains('active') &&
            !sidebar.contains(e.target) &&
            !filterToggle.contains(e.target)) {
            sidebar.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// -------------------- Debounce Utility --------------------
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
