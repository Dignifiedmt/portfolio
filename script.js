// script.js - with visible overlay, theme toggle, unicode validation

// ---------- TYPEWRITER FUNCTION ----------
function typeWriter(element, text, speed, callback) {
    let i = 0;
    element.textContent = '';
    function typing() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(typing, speed);
        } else if (callback) {
            callback();
        }
    }
    typing();
}

// ---------- LOADING OVERLAY (visible, 5 sec) ----------
window.addEventListener('load', () => {
    const overlay = document.getElementById('loading-overlay');
    const mainLine = document.getElementById('typewriter-main');
    const quoteLine = document.getElementById('typewriter-quote');

    const mainText = 'npm run dev  # Dignified Khadija M. Tasiu';
    const quoteText = '// "A lady who writes code writes the future"';

    typeWriter(mainLine, mainText, 70, () => {
        setTimeout(() => {
            typeWriter(quoteLine, quoteText, 50, () => {});
        }, 300);
    });

    // Ensure overlay hides after 5 seconds
    setTimeout(() => {
        overlay.style.opacity = '0';
        overlay.style.visibility = 'hidden';
    }, 5000);
});

// ---------- THEME TOGGLE (sun/moon icons) ----------
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const themeIcon = themeToggle.querySelector('i');

// Check saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    body.classList.add('light-mode');
    themeIcon.className = 'fas fa-moon';  // moon for light mode (to switch to dark)
} else {
    themeIcon.className = 'fas fa-sun';   // sun for dark mode (to switch to light)
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    if (body.classList.contains('light-mode')) {
        themeIcon.className = 'fas fa-moon';
        localStorage.setItem('theme', 'light');
    } else {
        themeIcon.className = 'fas fa-sun';
        localStorage.setItem('theme', 'dark');
    }
});

// ---------- MOBILE HAMBURGER + ACTIVE NAV ----------
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Active link highlight on scroll
const sections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ---------- SMOOTH SCROLL ----------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ---------- SCROLL REVEAL ----------
const fadeElements = document.querySelectorAll('.skill-card, .project-card, .about-content, .contact-info, .contact-form');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

fadeElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ---------- FORM VALIDATION (Unicode symbols) ----------
const contactForm = document.getElementById('contactForm');
const formFeedback = document.getElementById('formFeedback');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    formFeedback.textContent = '';
    let isValid = true;

    if (!nameInput.value.trim()) {
        isValid = false;
        formFeedback.textContent = '✗ Name is required.';
    } else if (!emailInput.value.match(/^\S+@\S+\.\S+$/)) {
        isValid = false;
        formFeedback.textContent = '✗ Enter a valid email.';
    } else if (!messageInput.value.trim()) {
        isValid = false;
        formFeedback.textContent = '✗ Message cannot be empty.';
    }

    if (isValid) {
        formFeedback.innerHTML = '✓ Message ready! Opening your email client...';
        formFeedback.style.color = 'var(--success)';
        setTimeout(() => {
            contactForm.submit();
        }, 800);
    } else {
        formFeedback.style.color = 'var(--error)';
    }
});

// ---------- DYNAMIC YEAR ----------
document.getElementById('year').textContent = new Date().getFullYear();

// ---------- SCROLL TO TOP BUTTON ----------
const scrollBtn = document.getElementById('scrollTopBtn');
window.addEventListener('scroll', () => {
    if (window.scrollY > 600) {
        scrollBtn.classList.add('visible');
    } else {
        scrollBtn.classList.remove('visible');
    }
});
scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ---------- BUTTON RIPPLE ----------
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        let ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.background = 'rgba(255,255,255,0.4)';
        ripple.style.borderRadius = '50%';
        ripple.style.transform = 'scale(0)';
        ripple.style.width = ripple.style.height = '100px';
        ripple.style.left = e.clientX - this.offsetLeft + 'px';
        ripple.style.top = e.clientY - this.offsetTop + 'px';
        ripple.style.pointerEvents = 'none';
        ripple.style.transition = 'transform 0.5s, opacity 0.5s';
        this.style.position = 'relative';
        this.appendChild(ripple);
        setTimeout(() => {
            ripple.style.transform = 'scale(4)';
            ripple.style.opacity = '0';
        }, 20);
        setTimeout(() => ripple.remove(), 500);
    });
});

// Iframe fallback (optional)
document.querySelectorAll('.iframe-preview iframe').forEach(iframe => {
    iframe.addEventListener('error', function() {
        this.style.display = 'none';
        const fallback = document.createElement('div');
        fallback.className = 'preview-fallback';
        fallback.textContent = 'Preview unavailable';
        this.parentNode.appendChild(fallback);
}); });
});
}););
});