// DOM Elements
const cursorDot = document.querySelector(".cursor-dot");
const cursorOutline = document.querySelector(".cursor-outline");
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

// Mouse Follower Effect
window.addEventListener("mousemove", (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    // Dot follows immediately
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    // Outline follows with slight delay (handled by CSS transition usually, but let's animate for smoothness)
    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});

// Add hover effect to interactive elements to enlarge cursor
const interactiveElements = document.querySelectorAll("a, button, input, textarea");
interactiveElements.forEach(el => {
    el.addEventListener("mouseenter", () => {
        cursorOutline.style.transform = "translate(-50%, -50%) scale(1.5)";
        cursorOutline.style.backgroundColor = "rgba(129, 140, 248, 0.1)";
        cursorDot.style.transform = "translate(-50%, -50%) scale(0)"; // Hide dot
    });
    el.addEventListener("mouseleave", () => {
        cursorOutline.style.transform = "translate(-50%, -50%) scale(1)";
        cursorOutline.style.backgroundColor = "transparent";
        cursorDot.style.transform = "translate(-50%, -50%) scale(1)"; // Show dot
    });
});


// Sticky Navbar
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links li a');

// Toggle Mobile Menu
if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Close Mobile Menu on Link Click
navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(3, 7, 18, 0.9)';
        navbar.style.padding = '0.5rem 0';
    } else {
        navbar.style.background = 'rgba(3, 7, 18, 0.5)';
        navbar.style.padding = '1rem 0';
    }
});


// Scroll Animations (Intersection Observer)
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Optional: unobserve after showing
            // observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in, .timeline-item, .project-card, .glass-card').forEach(el => {
    el.classList.add('fade-in'); // Ensure base class is there
    observer.observe(el);
});


// Initialize Data Fetching
document.addEventListener('DOMContentLoaded', () => {
    // Initialize GitHub Integration (from github.js)
    if (typeof fetchGitHubRepos === 'function') {
        fetchGitHubRepos();
    }


});

// Smooth Scrolling for Anchors
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Contact Form Obfuscation
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        // This placeholder will be replaced by GitHub Actions during deployment
        contactForm.setAttribute('action', '__FORMSPREE_URL__');
    }
});
