/* ===================================================
   BookVerse - Book Detail Page
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {
    if (!document.getElementById('bookDetail')) return;
    
    const urlParams = new URLSearchParams(window.location.search);
    const bookId = parseInt(urlParams.get('id'));
    
    if (bookId) {
        loadBookDetail(bookId);
    } else {
        window.location.href = 'store.html';
    }
});

function loadBookDetail(bookId) {
    const book = window.booksData.find(b => b.id === bookId);
    
    if (!book) {
        window.location.href = 'store.html';
        return;
    }
    
    // Update page title
    document.title = `${book.title} | BookVerse`;
    
    // Update breadcrumb
    document.getElementById('bookBreadcrumb').textContent = book.title;
    
    // Update cover
    document.getElementById('bookCoverImg').src = book.image;
    document.getElementById('bookCoverImg').alt = book.title;
    
    // Update badges
    if (book.isNew) {
        document.getElementById('badgeNew').style.display = 'inline-block';
    }
    if (book.isBestseller) {
        document.getElementById('badgeBestseller').style.display = 'inline-block';
    }
    
    // Update info
    document.getElementById('bookTitle').textContent = book.title;
    document.getElementById('bookAuthor').textContent = `By ${book.author}`;
    document.getElementById('bookCategory').textContent = book.category;
    document.getElementById('bookPrice').textContent = `$${book.price.toFixed(2)}`;
    document.getElementById('bookOriginalPrice').textContent = `$${book.originalPrice.toFixed(2)}`;
    document.getElementById('bookDescription').textContent = book.description;
    document.getElementById('bookPages').textContent = `${book.pages} Pages`;
    
    // Calculate and display discount
    const discount = Math.round((1 - book.price / book.originalPrice) * 100);
    document.getElementById('bookDiscount').textContent = `${discount}% OFF`;
    
    // Update rating
    const ratingContainer = document.getElementById('bookRating');
    ratingContainer.innerHTML = `
        <div class="stars">
            ${generateStars(book.rating)}
        </div>
        <span class="rating-value">${book.rating}</span>
        <span class="rating-count">(${book.reviews} reviews)</span>
    `;
    
    // Render what you'll learn
    const learnGrid = document.getElementById('learnGrid');
    if (learnGrid && book.whatYouLearn) {
        learnGrid.innerHTML = book.whatYouLearn.map(item => `
            <div class="learn-item animate-on-scroll">
                <i class="ri-check-double-line"></i>
                <p>${item}</p>
            </div>
        `).join('');
    }
    
    // Render table of contents
    const tocList = document.getElementById('tocList');
    if (tocList && book.tableOfContents) {
        tocList.innerHTML = book.tableOfContents.map((item, index) => `
            <div class="toc-item animate-on-scroll">
                <span class="toc-number">${index + 1}</span>
                <span class="toc-title">${item.title}</span>
                <span class="toc-duration">${item.duration}</span>
            </div>
        `).join('');
    }
    
    // Render related books
    const relatedBooks = document.getElementById('relatedBooks');
    if (relatedBooks) {
        const related = window.booksData
            .filter(b => b.category === book.category && b.id !== book.id)
            .slice(0, 4);
        
        related.forEach(b => {
            const card = createBookCard(b);
            card.classList.add('animate-on-scroll');
            relatedBooks.appendChild(card);
        });
    }
    
    // Add to cart button
    document.getElementById('addToCartBtn').addEventListener('click', () => {
        addToCart(book.id);
    });
    
    // Buy now button
    document.getElementById('buyNowBtn').addEventListener('click', () => {
        addToCart(book.id);
        window.location.href = 'cart.html';
    });
    
    // Preview button
    document.getElementById('previewBtn')?.addEventListener('click', () => {
        showToast('info', 'Preview', 'Preview feature coming soon!');
    });
    
    // Re-init scroll animations
    initScrollAnimations();
}

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

function createBookCard(book) {
    const card = document.createElement('article');
    card.className = 'book-card';
    
    card.innerHTML = `
        <div class="book-card-image">
            <img src="${book.image}" alt="${book.title}" loading="lazy">
            ${book.isNew ? '<span class="book-card-badge">New</span>' : ''}
        </div>
        <div class="book-card-content">
            <span class="book-card-category">${book.category}</span>
            <h3 class="book-card-title">
                <a href="book-detail.html?id=${book.id}">${book.title}</a>
            </h3>
            <p class="book-card-author">by ${book.author}</p>
            <div class="book-card-footer">
                <div class="book-card-price">$${book.price.toFixed(2)}</div>
                <button class="book-card-btn" onclick="addToCart(${book.id})">
                    <i class="ri-shopping-bag-3-line"></i>
                </button>
            </div>
        </div>
    `;
    
    return card;
}

function initScrollAnimations() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(el => observer.observe(el));
}
