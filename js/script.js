// ===== Navbar scroll effect =====
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
        backToTop.classList.add('visible');
    } else {
        navbar.classList.remove('scrolled');
        backToTop.classList.remove('visible');
    }
    updateActiveNavLink();
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== Mobile menu =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
    });
});

// ===== Active nav link on scroll =====
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.scrollY + 100;

    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        const link = document.querySelector(`.nav-link[href="#${id}"]`);

        if (link) {
            if (scrollY >= top && scrollY < top + height) {
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        }
    });
}

// ===== Theme toggle =====
const themeToggle = document.getElementById('theme-toggle');
const icon = themeToggle.querySelector('i');

const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);
icon.className = savedTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';

themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    icon.className = next === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
});

// ===== Typed text effect =====
const typedEl = document.getElementById('typed-text');
const phrases = [
    'Software Developer',
    'CS Student',
    'Open Source Contributor',
    'Problem Solver',
];

let phraseIndex = 0;
let charIndex = 0;
let deleting = false;

function type() {
    const current = phrases[phraseIndex];

    if (deleting) {
        typedEl.textContent = current.slice(0, charIndex--);
    } else {
        typedEl.textContent = current.slice(0, charIndex++);
    }

    if (!deleting && charIndex > current.length) {
        deleting = true;
        setTimeout(type, 1800);
        return;
    }

    if (deleting && charIndex < 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(type, 400);
        return;
    }

    setTimeout(type, deleting ? 60 : 90);
}

type();

// ===== Fade-in on scroll =====
const fadeEls = document.querySelectorAll(
    '.section-title, .section-subtitle, .about-text, .about-cards, .info-card, .skill-category, .project-card, .contact-info, .contact-form'
);

fadeEls.forEach(el => el.classList.add('fade-in'));

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

fadeEls.forEach(el => observer.observe(el));

// ===== Animated stat counters =====
const statNumbers = document.querySelectorAll('.stat-number');

const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.target, 10);
        const duration = 1200;
        const start = performance.now();

        function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            el.textContent = Math.floor(progress * target);
            if (progress < 1) requestAnimationFrame(update);
            else el.textContent = target;
        }

        requestAnimationFrame(update);
        counterObserver.unobserve(el);
    });
}, { threshold: 0.5 });

statNumbers.forEach(el => counterObserver.observe(el));

// ===== Contact form =====
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');

form.addEventListener('submit', e => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
        status.textContent = 'Please fill in all fields.';
        status.className = 'form-status error';
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        status.textContent = 'Please enter a valid email address.';
        status.className = 'form-status error';
        return;
    }

    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Sending...';

    setTimeout(() => {
        status.textContent = 'Message sent! I\'ll get back to you soon.';
        status.className = 'form-status';
        form.reset();
        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        setTimeout(() => { status.textContent = ''; }, 5000);
    }, 1200);
});

// ===== Footer year =====
document.getElementById('year').textContent = new Date().getFullYear();
