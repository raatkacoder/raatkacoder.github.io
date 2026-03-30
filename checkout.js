/* ===================================================
   BookVerse - Checkout System
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initCheckout();
});

function initCheckout() {
    const checkoutBtn = document.getElementById('checkoutBtn');
    const checkoutModal = document.getElementById('checkoutModal');
    const checkoutModalClose = document.getElementById('checkoutModalClose');
    
    if (!checkoutBtn || !checkoutModal) return;
    
    // Open checkout modal
    checkoutBtn.addEventListener('click', () => {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        if (cart.length === 0) {
            showToast('error', 'Cart Empty', 'Please add items to your cart first.');
            return;
        }
        
        checkoutModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        showStep(1);
    });
    
    // Close modal
    checkoutModalClose?.addEventListener('click', () => {
        checkoutModal.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Step 1: Info form
    const infoForm = document.getElementById('infoForm');
    if (infoForm) {
        infoForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showStep(2);
        });
    }
    
    // Step 2: Payment form
    const paymentForm = document.getElementById('paymentForm');
    if (paymentForm) {
        paymentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            processPayment();
        });
    }
    
    // Payment method toggle
    const paymentOptions = document.querySelectorAll('.payment-option input');
    const cardDetails = document.getElementById('cardDetails');
    
    paymentOptions.forEach(option => {
        option.addEventListener('change', () => {
            if (option.value === 'card') {
                cardDetails.style.display = 'block';
            } else {
                cardDetails.style.display = 'none';
            }
        });
    });
}

function showStep(stepNumber) {
    const steps = document.querySelectorAll('.checkout-step');
    steps.forEach(step => {
        step.classList.remove('active');
        if (parseInt(step.dataset.step) === stepNumber) {
            step.classList.add('active');
        }
    });
}

function processPayment() {
    // Show loading state
    const btn = document.querySelector('#paymentForm button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="ri-loader-4-line" style="animation: rotate 1s linear infinite;"></i> Processing...';
    btn.disabled = true;
    
    // Simulate payment processing
    setTimeout(() => {
        // Show success
        showStep(3);
        
        // Populate downloads
        populateDownloads();
        
        // Clear cart
        clearCart();
        
        btn.innerHTML = originalText;
        btn.disabled = false;
    }, 2000);
}

function populateDownloads() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const downloadList = document.getElementById('downloadList');
    
    if (!downloadList) return;
    
    downloadList.innerHTML = cart.map(item => `
        <div class="download-item">
            <div class="download-item-info">
                <i class="ri-file-pdf-line"></i>
                <span>${item.title}</span>
            </div>
            <button class="download-btn" onclick="downloadBook('${item.title}')">
                <i class="ri-download-line"></i>
                Download
            </button>
        </div>
    `).join('');
}

function downloadBook(title) {
    // Simulate download
    showToast('success', 'Download Started', `Downloading "${title}"...`);
    
    // In a real app, this would trigger actual file download
    setTimeout(() => {
        showToast('success', 'Download Complete', `"${title}" has been downloaded.`);
    }, 1500);
}

window.downloadBook = downloadBook;
