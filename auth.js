/* ===================================================
   BookVerse - Authentication
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initAuthTabs();
    initPasswordToggle();
    initPasswordStrength();
    initAuthForms();
});

function initAuthTabs() {
    const tabs = document.querySelectorAll('.auth-tab');
    const forms = document.querySelectorAll('.auth-form');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetForm = tab.dataset.tab;
            
            tabs.forEach(t => t.classList.remove('active'));
            forms.forEach(f => f.classList.remove('active'));
            
            tab.classList.add('active');
            document.querySelector(`[data-form="${targetForm}"]`)?.classList.add('active');
        });
    });
}

function initPasswordToggle() {
    const toggleBtns = document.querySelectorAll('.toggle-password');
    
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const input = btn.parentElement.querySelector('input');
            const icon = btn.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.replace('ri-eye-line', 'ri-eye-off-line');
            } else {
                input.type = 'password';
                icon.classList.replace('ri-eye-off-line', 'ri-eye-line');
            }
        });
    });
}

function initPasswordStrength() {
    const passwordInputs = document.querySelectorAll('#signupForm input[type="password"]');
    const strengthIndicator = document.getElementById('passwordStrength');
    
    if (!passwordInputs.length || !strengthIndicator) return;
    
    passwordInputs[0]?.addEventListener('input', (e) => {
        const password = e.target.value;
        const strength = calculatePasswordStrength(password);
        
        strengthIndicator.className = 'password-strength';
        
        if (password.length === 0) {
            strengthIndicator.querySelector('.strength-text').textContent = 'Password strength';
        } else if (strength < 3) {
            strengthIndicator.classList.add('weak');
            strengthIndicator.querySelector('.strength-text').textContent = 'Weak password';
        } else if (strength < 5) {
            strengthIndicator.classList.add('medium');
            strengthIndicator.querySelector('.strength-text').textContent = 'Medium password';
        } else {
            strengthIndicator.classList.add('strong');
            strengthIndicator.querySelector('.strength-text').textContent = 'Strong password';
        }
    });
}

function calculatePasswordStrength(password) {
    let strength = 0;
    
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;
    
    return strength;
}

function initAuthForms() {
    const signinForm = document.getElementById('signinForm');
    const signupForm = document.getElementById('signupForm');
    
    if (signinForm) {
        signinForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simulate sign in
            const btn = signinForm.querySelector('button[type="submit"]');
            btn.innerHTML = '<i class="ri-loader-4-line" style="animation: rotate 1s linear infinite;"></i> Signing in...';
            btn.disabled = true;
            
            setTimeout(() => {
                // Store user session
                localStorage.setItem('user', JSON.stringify({
                    email: signinForm.querySelector('input[type="email"]').value,
                    name: 'User'
                }));
                
                showToast('success', 'Welcome back!', 'You have been signed in successfully.');
                
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1000);
            }, 1500);
        });
    }
    
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const btn = signupForm.querySelector('button[type="submit"]');
            btn.innerHTML = '<i class="ri-loader-4-line" style="animation: rotate 1s linear infinite;"></i> Creating account...';
            btn.disabled = true;
            
            setTimeout(() => {
                localStorage.setItem('user', JSON.stringify({
                    email: signupForm.querySelector('input[type="email"]').value,
                    name: signupForm.querySelectorAll('input[type="text"]')[0].value
                }));
                
                showToast('success', 'Account created!', 'Welcome to BookVerse!');
                
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1000);
            }, 1500);
        });
    }
}

// Toast function for auth page
function showToast(type, title, message) {
    // Create toast container if not exists
    let container = document.getElementById('toastContainer');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toastContainer';
        container.className = 'toast-container';
        document.body.appendChild(container);
    }
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icons = {
        success: 'ri-check-line',
        error: 'ri-close-line',
        info: 'ri-information-line'
    };
    
    toast.innerHTML = `
        <div class="toast-icon">
            <i class="${icons[type]}"></i>
        </div>
        <div class="toast-message">
            <h4>${title}</h4>
            <p>${message}</p>
        </div>
    `;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('removing');
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}
