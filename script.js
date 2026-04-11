// A-FUTMs Main Interactive JavaScript
// Smooth scroll, active nav update, form handling, package interactions

(function() {
    'use strict';

    // ---------------------- SMOOTH SCROLL & ACTIVE NAVIGATION ----------------------
    const navLinks = document.querySelectorAll('.nav-link-custom');
    const sections = document.querySelectorAll('section[id]');
    
    function updateActiveNav() {
        let scrollPos = window.scrollY + 180; // offset for better highlight
        let currentId = '';
        
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.clientHeight;
            if (scrollPos >= top && scrollPos < top + height) {
                currentId = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href && href.includes(currentId) && currentId !== '') {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);
    window.addEventListener('load', updateActiveNav);
    
    // Smooth scroll for all anchor links with hash
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const hash = this.getAttribute('href');
            if (hash === "#" || hash === "") return;
            const target = document.querySelector(hash);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                // Close mobile menu after click (if navbar collapse is open)
                const bsCollapse = document.querySelector('.navbar-collapse.show');
                if (bsCollapse && typeof bootstrap !== 'undefined') {
                    new bootstrap.Collapse(bsCollapse).hide();
                }
                // Optional: update URL hash without jumping
                history.pushState(null, null, hash);
            }
        });
    });
    
    // ---------------------- FORM HANDLING (Contact / Quote) ----------------------
    const form = document.getElementById('quoteFormBs');
    const feedbackSpan = document.getElementById('formFeedbackBs');
    
    if (form && feedbackSpan) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const nameInput = document.getElementById('nameBs');
            const emailInput = document.getElementById('emailBs');
            const messageInput = document.getElementById('msgBs');
            const phoneInput = document.getElementById('phoneBs');
            
            const name = nameInput ? nameInput.value.trim() : '';
            const email = emailInput ? emailInput.value.trim() : '';
            const message = messageInput ? messageInput.value.trim() : '';
            const phone = phoneInput ? phoneInput.value.trim() : '';
            
            // Validation
            if (!name || !email || !message) {
                feedbackSpan.innerHTML = '<span class="text-danger"><i class="bi bi-exclamation-triangle-fill me-1"></i> Please fill in all required fields (Name, Email, Message).</span>';
                return;
            }
            
            const emailPattern = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
            if (!emailPattern.test(email)) {
                feedbackSpan.innerHTML = '<span class="text-danger"><i class="bi bi-envelope-exclamation-fill me-1"></i> Please enter a valid email address.</span>';
                return;
            }
            
            // Success simulation (no actual backend yet)
            const escapeHtml = (str) => {
                return str.replace(/[&<>]/g, function(m) {
                    if (m === '&') return '&amp;';
                    if (m === '<') return '&lt;';
                    if (m === '>') return '&gt;';
                    return m;
                });
            };
            
            feedbackSpan.innerHTML = `<span class="text-success"><i class="bi bi-check-circle-fill me-1"></i> Thanks ${escapeHtml(name)}! We've received your message and will get back to you at ${escapeHtml(email)} within 24 hours.</span>`;
            
            // Reset form fields
            if (nameInput) nameInput.value = '';
            if (emailInput) emailInput.value = '';
            if (messageInput) messageInput.value = '';
            if (phoneInput) phoneInput.value = '';
            
            // Clear feedback after 6 seconds
            setTimeout(() => {
                if (feedbackSpan) feedbackSpan.innerHTML = '';
            }, 6000);
        });
    }
    
    // ---------------------- ENHANCEMENT: Package Hover Effects & Tooltips (Optional) ----------------------
    // Add interactive class to package cards to enhance 'present state' and dynamic style
    const packageCards = document.querySelectorAll('.package-card');
    if (packageCards.length) {
        packageCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px)';
                this.style.transition = 'transform 0.3s cubic-bezier(0.2, 0.9, 0.4, 1.1), box-shadow 0.3s ease';
                this.style.boxShadow = '0 25px 35px -12px rgba(249,115,22,0.2)';
            });
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '0 1rem 2rem rgba(0,0,0,0.05)';
            });
        });
    }
    
    // ---------------------- ANIMATE STATS ON SCROLL (enhanced present state) ----------------------
    const statNumbers = document.querySelectorAll('.stat-number');
    let animated = false;
    
    function animateStats() {
        if (animated) return;
        const statsSection = document.querySelector('#home .row .col-lg-6 .row');
        if (!statsSection) return;
        const rect = statsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            statNumbers.forEach(stat => {
                let finalText = stat.innerText;
                let finalNumber = parseInt(finalText.replace(/\D/g, ''));
                if (isNaN(finalNumber)) return;
                let current = 0;
                const increment = Math.ceil(finalNumber / 50);
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= finalNumber) {
                        stat.innerText = finalText.replace(/\d+/, finalNumber);
                        clearInterval(timer);
                    } else {
                        stat.innerText = finalText.replace(/\d+/, current);
                    }
                }, 20);
            });
            animated = true;
        }
    }
    
    window.addEventListener('scroll', animateStats);
    window.addEventListener('load', animateStats);
    
    // ---------------------- ADDITIONAL: Bootstrap dropdown/tooltip initializers if any future ----------------------
    // Initialize any Bootstrap tooltips (if needed later)
    if (typeof bootstrap !== 'undefined' && bootstrap.Tooltip) {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }
    
    // ---------------------- TABLE RESPONSIVE & COMPARISON HIGHLIGHT ----------------------
    // Add subtle row hover effect on comparison table (already done via bootstrap table-hover)
    // Additionally, make sure that the package badges reflect correct state.
    const packageLinks = document.querySelectorAll('.package-card .btn');
    packageLinks.forEach(btn => {
        btn.addEventListener('click', function(e) {
            const targetSection = document.querySelector('#contact');
            if (targetSection && this.getAttribute('href') === '#contact') {
                e.preventDefault();
                targetSection.scrollIntoView({ behavior: 'smooth' });
                // Optionally prefill package info? not needed for MVP
            }
        });
    });
    
    // small console greeting (professional)
    console.log('A-FUTMs | Next-Gen Digital Innovation Agency — fully interactive');
    
    // enhance present state: add active class on navbar when scrolled (sticky elegance)
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.style.boxShadow = '0 8px 20px rgba(0,0,0,0.05)';
                navbar.style.background = 'rgba(255,255,255,0.98)';
            } else {
                navbar.style.boxShadow = '0 1px 2px rgba(0,0,0,0.03)';
                navbar.style.background = 'rgba(255,255,255,0.92)';
            }
        });
    }
    
    // fix for any missing external hyperlinks dynamic behavior
    const allExternalLinks = document.querySelectorAll('a[href^="http"]');
    allExternalLinks.forEach(link => {
        link.setAttribute('rel', 'noopener noreferrer');
        link.setAttribute('target', '_blank');
    });
    
    // For comparison table - enhance readability on mobile (already responsive)
    // Additional UX: display toast if needed on package selection (bonus)
    const packageSelectBtns = document.querySelectorAll('.package-card .btn-orange, .package-card .btn-outline-orange');
    packageSelectBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            const cardTitle = this.closest('.package-card')?.querySelector('h3')?.innerText;
            if (cardTitle && this.getAttribute('href') === '#contact') {
                const messageField = document.getElementById('msgBs');
                if (messageField && !messageField.value.trim()) {
                    messageField.value = `I am interested in the ${cardTitle} package. Please provide more details.`;
                }
            }
        });
    });
    
})();