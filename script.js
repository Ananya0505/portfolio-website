// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navigation bar scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.backgroundColor = 'rgba(9, 0, 0, 0.95)';
        header.style.boxShadow = '0 2px 5px rgba(10, 0, 0, 0.1)';
    } else {
        header.style.backgroundColor = '#fff';
        header.style.boxShadow = 'none';
    }
});

// Skills animation
const skills = document.querySelectorAll('.skills li');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.5 });

skills.forEach(skill => {
    skill.style.opacity = '0';
    skill.style.transform = 'translateY(20px)';
    skill.style.transition = 'all 0.5s ease';
    observer.observe(skill);
});

// Project card hover effect
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
        card.style.transition = 'transform 0.3s ease';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Mobile menu toggle
const createMobileMenu = () => {
    const nav = document.querySelector('nav ul');
    const menuButton = document.createElement('button');
    menuButton.className = 'mobile-menu-btn';
    menuButton.innerHTML = '<i class="fas fa-bars"></i>';
    
    document.querySelector('header').prepend(menuButton);
    
    menuButton.addEventListener('click', () => {
        nav.classList.toggle('show');
    });
};

// Mobile menu styles
const addMobileMenuStyles = () => {
    const style = document.createElement('style');
    style.textContent = `
        .mobile-menu-btn {
            display: none;
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0.5rem;
        }
        
        @media (max-width: 768px) {
            .mobile-menu-btn {
                display: block;
                position: absolute;
                right: 1rem;
                top: 1rem;
            }
            
            nav ul {
                display: none;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: #fff;
                padding: 1rem;
                box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            }
            
            nav ul.show {
                display: flex;
                flex-direction: column;
                align-items: center;
            }
        }
    `;
    document.head.appendChild(style);
};

// Timeline Animation
const timelineItems = document.querySelectorAll('.timeline-item');
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
});

timelineItems.forEach(item => {
    timelineObserver.observe(item);
});

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    createMobileMenu();
    addMobileMenuStyles();
});

document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const submitButton = this.querySelector('button[type="submit"]');
    const popupMessage = document.getElementById('popupMessage');
    
    // Disable submit button and show loading state
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    
    fetch(this.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            // Show success popup
            popupMessage.classList.add('active');
            // Reset form
            this.reset();
            // Hide popup after 3 seconds
            setTimeout(() => {
                popupMessage.classList.remove('active');
            }, 3000);
        } else {
            throw new Error('Network response was not ok');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('There was a problem sending your message. Please try again.');
    })
    .finally(() => {
        // Re-enable submit button
        submitButton.disabled = false;
        submitButton.textContent = 'Send Message';
    });
}); 