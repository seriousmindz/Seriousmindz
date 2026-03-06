// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.backdropFilter = 'blur(20px)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    }
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Add scroll animation class to elements
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll(
        '.service-card, .menu-category, .gallery-item, .contact-card, .about-content, .hero-content'
    );
    
    animateElements.forEach(el => {
        el.classList.add('scroll-animation');
        observer.observe(el);
    });
});

// Gallery lightbox functionality
const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('.gallery-img');
        const overlay = item.querySelector('.gallery-overlay');
        
        // Create lightbox
        const lightbox = document.createElement('div');
        lightbox.classList.add('lightbox');
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <span class="lightbox-close">&times;</span>
                <img src="${img.src}" alt="${img.alt}" class="lightbox-img">
                <div class="lightbox-caption">
                    <h3>${overlay.querySelector('h4').textContent}</h3>
                    <p>${overlay.querySelector('p').textContent}</p>
                </div>
            </div>
        `;
        
        document.body.appendChild(lightbox);
        
        // Close lightbox
        const closeBtn = lightbox.querySelector('.lightbox-close');
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(lightbox);
        });
        
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                document.body.removeChild(lightbox);
            }
        });
    });
});

// Add lightbox styles dynamically
const lightboxStyles = `
    .lightbox {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        animation: fadeIn 0.3s ease-out forwards;
    }
    
    .lightbox-content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
        background: white;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    }
    
    .lightbox-img {
        width: 100%;
        height: auto;
        display: block;
        max-height: 70vh;
        object-fit: contain;
    }
    
    .lightbox-close {
        position: absolute;
        top: 15px;
        right: 20px;
        font-size: 30px;
        color: white;
        background: rgba(0, 0, 0, 0.5);
        border: none;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        z-index: 1;
        transition: background 0.3s ease;
    }
    
    .lightbox-close:hover {
        background: rgba(0, 0, 0, 0.8);
    }
    
    .lightbox-caption {
        padding: 20px;
        text-align: center;
    }
    
    .lightbox-caption h3 {
        margin: 0 0 10px 0;
        color: #333;
    }
    
    .lightbox-caption p {
        margin: 0;
        color: #666;
    }
    
    @keyframes fadeIn {
        to { opacity: 1; }
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = lightboxStyles;
document.head.appendChild(styleSheet);

// Form handling (if needed for additional forms)
const handleFormSubmit = (formElement) => {
    formElement.addEventListener('submit', (e) => {
        e.preventDefault();
        // Add form submission logic here
        const formData = new FormData(formElement);
        
        // Show loading state
        const submitBtn = formElement.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.classList.add('loading');
            submitBtn.textContent = 'Sending...';
        }
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            if (submitBtn) {
                submitBtn.classList.remove('loading');
                submitBtn.textContent = 'Message Sent!';
                submitBtn.style.background = '#4A7C59';
            }
            
            // Reset form after 2 seconds
            setTimeout(() => {
                formElement.reset();
                if (submitBtn) {
                    submitBtn.textContent = 'Send Message';
                    submitBtn.style.background = '';
                }
            }, 2000);
        }, 1500);
    });
};

// Initialize any custom forms (the main form is handled by the iframe)
document.querySelectorAll('form:not([data-iframe])').forEach(handleFormSubmit);

// Active navigation highlight
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionHeight = section.clientHeight;
        if (sectionTop <= 100 && sectionTop + sectionHeight > 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add active nav styles
const activeNavStyles = `
    .nav-link.active {
        color: var(--primary-orange);
    }
    
    .nav-link.active::after {
        width: 100%;
    }
`;

const activeNavStyleSheet = document.createElement('style');
activeNavStyleSheet.textContent = activeNavStyles;
document.head.appendChild(activeNavStyleSheet);

// Loading screen (optional)
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Add any loading screen removal logic here
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
});

// Performance optimization: Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Accessibility improvements
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu if open
        if (navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
        
        // Close lightbox if open
        const lightbox = document.querySelector('.lightbox');
        if (lightbox) {
            document.body.removeChild(lightbox);
        }
    }
});

// Smooth reveal animations for content
const revealElements = document.querySelectorAll('.fade-in-up');
revealElements.forEach((el, index) => {
    el.style.animationDelay = `${index * 0.1}s`;
});

console.log('Taste with Taka website loaded successfully! 🍽️');