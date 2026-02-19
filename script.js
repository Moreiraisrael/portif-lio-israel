// Mobile Navigation Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
}

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// Smooth Scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Offset for fixed header
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for Fade-in Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.about-card, .project-card, .section-header, .contact-wrapper').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// Add 'visible' class styles dynamically
const style = document.createElement('style');
style.innerHTML = `
    .visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// Dynamic Typing Effect for Sub-headline
const subHeadline = document.querySelector('.sub-headline');
const originalText = subHeadline.textContent;
subHeadline.textContent = '';

function typeWriter(text, i) {
    if (i < text.length) {
        subHeadline.textContent += text.charAt(i);
        setTimeout(() => typeWriter(text, i + 1), 50);
    }
}

// Start typing effect after page load
window.addEventListener('load', () => {
    setTimeout(() => {
        typeWriter(originalText, 0);
    }, 500);
});

// Console Signature
// Hero Slideshow
const slides = document.querySelectorAll('.hero-slide');
let currentSlide = 0;

if (slides.length > 0) {
    setInterval(() => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }, 4000); // Change every 4 seconds

}

// Spotlight Effect for Problem Cards
document.querySelectorAll('.problem-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 77, 77, 0.15), rgba(255, 255, 255, 0.03) 60%)`;
        card.style.borderColor = `rgba(255, 77, 77, 0.5)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.background = 'rgba(255, 255, 255, 0.03)';
        card.style.borderColor = 'rgba(255, 77, 77, 0.2)';
    });
});

// Metrics CountUp Animation
const metricsSection = document.querySelector('.metrics');
let started = false;

if (metricsSection) {
    window.addEventListener('scroll', () => {
        if (window.scrollY + window.innerHeight > metricsSection.offsetTop + 100 && !started) {
            document.querySelectorAll('.metric-item strong').forEach(el => {
                const target = +el.getAttribute('data-count');
                const suffix = el.innerText.replace(/[0-9]/g, '');
                let count = 0;
                const inc = target / 100;
                const updateCount = () => {
                    count += inc;
                    if (count < target) {
                        el.innerText = Math.ceil(count) + suffix;
                        requestAnimationFrame(updateCount);
                    } else {
                        el.innerText = target + suffix;
                    }
                };
                updateCount();
            });
            started = true;
        }
    });
}

// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(item => {
    item.addEventListener('click', () => {
        const parent = item.parentElement;
        parent.classList.toggle('active');
    });
});


