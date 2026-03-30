/* ===================================================
   BookVerse - Cart System
   =================================================== */

// -------------------- Add to Cart --------------------
function addToCart(bookId) {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const book = window.booksData.find(b => b.id === bookId);
    
    if (!book) return;
    
    // Check if already in cart
    if (cart.find(item => item.id === bookId)) {
        showToast('info', 'Already in Cart', 'This book is already in your cart.');
        return;
    }
    
    cart.push({
        id: book.id,
        title: book.title,
        author: book.author,
        price: book.price,
        image: book.image
    });
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    showToast('success', 'Added to Cart', `${book.title} has been added to your cart.`);
    
    // Play sound
    if (typeof playClickSound === 'function') {
        playClickSound();
    }
}

// -------------------- Remove from Cart --------------------
function removeFromCart(bookId) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart = cart.filter(item => item.id !== bookId);
    localStorage.setItem('cart', JSON.stringify(cart));
    
    updateCartCount();
    renderCartItems();
    updateCartSummary();
    
    showToast('success', 'Removed', 'Item has been removed from your cart.');
}

// -------------------- Render Cart Items --------------------
function renderCartItems() {
    const cartList = document.getElementById('cartList');
    const emptyCart = document.getElementById('emptyCart');
    const cartSummary = document.getElementById('cartSummary');
    
    if (!cartList) return;
    
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    if (cart.length === 0) {
        cartList.innerHTML = '';
        if (emptyCart) emptyCart.style.display = 'block';
        if (cartSummary) cartSummary.style.display = 'none';
        return;
    }
    
    if (emptyCart) emptyCart.style.display = 'none';
    if (cartSummary) cartSummary.style.display = 'block';
    
    cartList.innerHTML = cart.map(item => `
        <div class="cart-item animate-on-scroll animated" data-id="${item.id}">
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.title}">
            </div>
            <div class="cart-item-details">
                <h3 class="cart-item-title">${item.title}</h3>
                <p class="cart-item-author">by ${item.author}</p>
                <span class="cart-item-price">$${item.price.toFixed(2)}</span>
            </div>
            <div class="cart-item-actions">
                <button class="cart-item-remove" onclick="removeFromCart(${item.id})">
                    <i class="ri-delete-bin-line"></i>
                </button>
            </div>
        </div>
    `).join('');
    
    // Update items count
    const countEl = document.getElementById('cartItemsCount');
    if (countEl) {
        countEl.textContent = `${cart.length} item${cart.length !== 1 ? 's' : ''}`;
    }
}

// -------------------- Update Cart Summary --------------------
function updateCartSummary() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
    const discount = 0; // Can be calculated based on promo codes
    const total = subtotal - discount;
    
    const subtotalEl = document.getElementById('subtotal');
    const discountEl = document.getElementById('discount');
    const totalEl = document.getElementById('total');
    
    if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    if (discountEl) discountEl.textContent = `-$${discount.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;
}

// -------------------- Apply Promo Code --------------------
function initPromoCode() {
    const promoInput = document.getElementById('promoInput');
    const applyBtn = document.getElementById('applyPromo');
    
    if (!promoInput || !applyBtn) return;
    
    applyBtn.addEventListener('click', () => {
        const code = promoInput.value.trim().toUpperCase();
        
        const promoCodes = {
            'WELCOME20': 0.2,
            'SAVE10': 0.1,
            'BOOKWORM': 0.15
        };
        
        if (promoCodes[code]) {
            const cart = JSON.parse(localStorage.getItem('cart') || '[]');
            const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
            const discount = subtotal * promoCodes[code];
            
            document.getElementById('discount').textContent = `-$${discount.toFixed(2)}`;
            document.getElementById('total').textContent = `$${(subtotal - discount).toFixed(2)}`;
            
            showToast('success', 'Promo Applied!', `You saved $${discount.toFixed(2)}`);
            promoInput.disabled = true;
            applyBtn.disabled = true;
            applyBtn.textContent = 'Applied';
        } else {
            showToast('error', 'Invalid Code', 'Please enter a valid promo code.');
        }
    });
}

// -------------------- Clear Cart --------------------
function clearCart() {
    localStorage.removeItem('cart');
    updateCartCount();
    renderCartItems();
    updateCartSummary();
}

// -------------------- Initialize Cart Page --------------------
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('cartList')) {
        renderCartItems();
        updateCartSummary();
        initPromoCode();
    }
});

// Make functions global
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.clearCart = clearCart;
