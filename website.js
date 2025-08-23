// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initSmoothScrolling();
    initAnimations();
    initTypingEffect();
    initScrollEffects();
});

// Navigation functionality
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navbar = document.querySelector('.navbar');

    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (hamburger.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });

    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
}

// Smooth scrolling functionality
function initSmoothScrolling() {
    // Smooth scroll to section
    window.scrollToSection = function(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            const offsetTop = section.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    };

    // Add smooth scrolling to all internal links
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
}

// Animation initialization
function initAnimations() {
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all feature cards and other elements
    const animatedElements = document.querySelectorAll('.feature-card, .about-content, .download-options, .instruction-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Typing effect for demo text
function initTypingEffect() {
    const demoText = document.querySelector('.demo-text');
    if (demoText) {
        const messages = [
            "Hello! I'm Sarah...",
            "How are you today?",
            "I'm here to help!",
            "Let's chat! 💕"
        ];
        
        let messageIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        function typeWriter() {
            const currentMessage = messages[messageIndex];
            
            if (isDeleting) {
                demoText.textContent = currentMessage.substring(0, charIndex - 1);
                charIndex--;
            } else {
                demoText.textContent = currentMessage.substring(0, charIndex + 1);
                charIndex++;
            }
            
            if (!isDeleting && charIndex === currentMessage.length) {
                setTimeout(() => { isDeleting = true; }, 2000);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                messageIndex = (messageIndex + 1) % messages.length;
            }
            
            const speed = isDeleting ? 100 : 150;
            setTimeout(typeWriter, speed);
        }
        
        // Start typing effect after a delay
        setTimeout(typeWriter, 1000);
    }
}

// Scroll effects
function initScrollEffects() {
    // Parallax effect for floating hearts
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const floatingHearts = document.querySelector('.floating-hearts');
        
        if (floatingHearts) {
            floatingHearts.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Animate companion face on scroll
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const companionFace = document.querySelector('.companion-face');
        
        if (companionFace) {
            const rotation = scrolled * 0.1;
            companionFace.style.transform = `rotate(${rotation}deg)`;
        }
    });
}

// Add some interactive hover effects
document.addEventListener('DOMContentLoaded', function() {
    // Feature card hover effects
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Download card hover effects
    const downloadCards = document.querySelectorAll('.download-card');
    downloadCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add some fun interactive elements
function addInteractiveElements() {
    // Heart click effect
    const hearts = document.querySelectorAll('.fas.fa-heart');
    hearts.forEach(heart => {
        heart.addEventListener('click', function() {
            this.style.transform = 'scale(1.3)';
            this.style.color = '#ff1493';
            
            setTimeout(() => {
                this.style.transform = 'scale(1)';
                this.style.color = '';
            }, 300);
        });
    });

    // Button click effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Initialize interactive elements
document.addEventListener('DOMContentLoaded', addInteractiveElements);

// Add some CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Add some fun easter eggs
document.addEventListener('keydown', function(e) {
    // Press 'S' key to make Sarah wave
    if (e.key.toLowerCase() === 's') {
        const companionFace = document.querySelector('.companion-face');
        if (companionFace) {
            companionFace.style.transform = 'rotate(10deg)';
            setTimeout(() => {
                companionFace.style.transform = 'rotate(-10deg)';
                setTimeout(() => {
                    companionFace.style.transform = 'rotate(0deg)';
                }, 200);
            }, 200);
        }
    }
    
    // Press 'H' key to make hearts bigger
    if (e.key.toLowerCase() === 'h') {
        const hearts = document.querySelectorAll('.floating-hearts i');
        hearts.forEach(heart => {
            heart.style.transform = 'scale(2)';
            heart.style.color = '#ff1493';
            setTimeout(() => {
                heart.style.transform = 'scale(1)';
                heart.style.color = '';
            }, 1000);
        });
    }
});

// Add some performance optimizations
function optimizePerformance() {
    // Use requestAnimationFrame for smooth animations
    let ticking = false;
    
    function updateOnScroll() {
        if (!ticking) {
            requestAnimationFrame(function() {
                // Update scroll-based animations here
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', updateOnScroll);
}

// Initialize performance optimizations
document.addEventListener('DOMContentLoaded', optimizePerformance);

// Add some accessibility features
function addAccessibility() {
    // Add focus indicators
    const focusableElements = document.querySelectorAll('a, button, input, textarea, select');
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--primary-color)';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
}

// Initialize accessibility features
document.addEventListener('DOMContentLoaded', addAccessibility);

// Download functionality for Evomate
function downloadEvomate() {
    const downloadLinks = [
        'https://github.com/nk88-coder/evomate_installer/releases/download/v1.0.0/evomate_installer-1.bin',
        'https://github.com/nk88-coder/evomate_installer/releases/download/v1.0.0/evomate_installer-2.bin',
        'https://github.com/nk88-coder/evomate_installer/releases/download/v1.0.0/evomate_installer-3.bin',
        'https://github.com/nk88-coder/evomate_installer/releases/download/v1.0.0/evomate_installer.exe'
    ];
    
    // Show download started message
    showDownloadMessage('Starting download...');
    
    // Download each file with a delay between downloads
    downloadLinks.forEach((link, index) => {
        setTimeout(() => {
            const a = document.createElement('a');
            a.href = link;
            a.download = link.split('/').pop(); // Extract filename from URL
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            
            // Show progress message
            showDownloadMessage(`Downloading file ${index + 1} of ${downloadLinks.length}...`);
            
            // Show completion message after last file
            if (index === downloadLinks.length - 1) {
                setTimeout(() => {
                    showDownloadMessage('All files downloaded successfully! 🎉');
                }, 1000);
            }
        }, index === 0 ? 0 : index === 1 ? 10000 : index === 2 ? 20000 : 50000); // 0s, 10s, 20s, 50s delays
    });
}

// Show download status messages
function showDownloadMessage(message) {
    // Remove existing message if any
    const existingMessage = document.querySelector('.download-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message element
    const messageDiv = document.createElement('div');
    messageDiv.className = 'download-message';
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #ff6b9d 0%, #c44569 50%, #f8b5d3 100%);
        color: white;
        padding: 15px 25px;
        border-radius: 20px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        font-weight: 500;
        animation: slideIn 0.3s ease-out;
    `;
    messageDiv.textContent = message;
    
    // Add animation keyframes if not already added
    if (!document.querySelector('#download-animations')) {
        const style = document.createElement('style');
        style.id = 'download-animations';
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(messageDiv);
    
    // Auto-remove message after 4 seconds
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => {
                if (messageDiv.parentNode) {
                    messageDiv.remove();
                }
            }, 300);
        }
    }, 4000);
}

// Add some fun loading messages
const loadingMessages = [
    "Preparing Sarah's personality...",
    "Loading emotional intelligence...",
    "Initializing heart emojis...",
    "Setting up romantic vibes...",
    "Almost ready to meet Sarah! 💕"
];

let messageIndex = 0;
function showLoadingMessage() {
    const loadingElement = document.querySelector('.loading-message');
    if (loadingElement) {
        loadingElement.textContent = loadingMessages[messageIndex];
        messageIndex = (messageIndex + 1) % loadingMessages.length;
    }
}

// Show loading messages every 2 seconds
setInterval(showLoadingMessage, 2000);

// Add some fun hover effects for the companion
function addCompanionHoverEffects() {
    const companionFace = document.querySelector('.companion-face');
    if (companionFace) {
        companionFace.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
            this.style.boxShadow = '0 20px 40px rgba(255, 107, 157, 0.3)';
        });
        
        companionFace.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.boxShadow = 'none';
        });
    }
}

// Initialize companion hover effects
document.addEventListener('DOMContentLoaded', addCompanionHoverEffects);









