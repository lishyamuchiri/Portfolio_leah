// Mobile menu toggle - improved version
function toggleMenu() {
    const menu = document.getElementById('mobile-menu');
    const body = document.body;
    
    // Use classList.toggle for simpler code
    menu.classList.toggle('hidden');
    body.classList.toggle('menu-open');
}

// Single event listener for mobile menu links
document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('mobile-menu').classList.add('hidden');
        document.body.classList.remove('menu-open');
    });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const offset = 80;
        
        window.scrollTo({
            top: target.offsetTop - offset,
            behavior: 'smooth'
        });
        
        if (!this.classList.contains('nav-link')) toggleMenu();
    });
});

// Preloader
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.classList.add('hidden');
    }, 100);
});

// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
});

// Update active link on scroll
function updateActiveLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
            const id = section.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveLink);
window.addEventListener('load', updateActiveLink);

// Form submission - MAIN IMPLEMENTATION
document.getElementById('contact-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const form = e.target;
    const name = form.elements.name.value.trim();
    const email = form.elements.email.value.trim();
    const message = form.elements.message.value.trim();
    
    // Reset error states
    document.querySelectorAll('[id$="-error"]').forEach(el => {
        el.classList.add('hidden');
    });
    
    // Validate inputs
    let isValid = true;
    
    if (!name) {
        document.getElementById('name-error').textContent = 'Name is required';
        document.getElementById('name-error').classList.remove('hidden');
        isValid = false;
    }
    
    if (!email) {
        document.getElementById('email-error').textContent = 'Email is required';
        document.getElementById('email-error').classList.remove('hidden');
        isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
        document.getElementById('email-error').textContent = 'Please enter a valid email address';
        document.getElementById('email-error').classList.remove('hidden');
        isValid = false;
    }
    
    if (!message) {
        document.getElementById('message-error').textContent = 'Message is required';
        document.getElementById('message-error').classList.remove('hidden');
        isValid = false;
    }
    
    if (!isValid) return;
    
    // Show loading state
    document.getElementById('submit-text').classList.add('hidden');
    document.getElementById('spinner').classList.remove('hidden');
    form.querySelector('button').disabled = true;
    
    try {
        // Using FormSubmit.co - FIXED EMAIL (removed duplicate .com)
        const response = await fetch('https://formsubmit.co/ajax/lishyamuchiri@gmail.com', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                message: message,
                _subject: 'New message from your portfolio site'
            })
        });
        
        const result = await response.json();
        
        if (response.ok) {
            document.getElementById('form-success').classList.remove('hidden');
            form.reset();
        } else {
            throw new Error(result.message || 'Failed to send message');
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('form-error').textContent = error.message;
        document.getElementById('form-error').classList.remove('hidden');
    } finally {
        document.getElementById('submit-text').classList.remove('hidden');
        document.getElementById('spinner').classList.add('hidden');
        form.querySelector('button').disabled = false;
    }
});

// Animate content on scroll
function handleScroll() {
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8 && !el.classList.contains('visible')) {
            el.classList.add('visible');
            const bars = el.querySelectorAll('.skill-progress');
            bars.forEach(bar => {
                bar.style.width = bar.getAttribute('data-width');
            });
            
        }
    });
}

window.addEventListener('scroll', handleScroll);
window.addEventListener('load', handleScroll);

document.getElementById('explore-work-btn').addEventListener('click', function(e) {
    e.preventDefault();
    const portfolio = document.getElementById('portfolio');
    if (portfolio) {
        window.scrollTo({
            top: portfolio.offsetTop - 5,
            behavior: 'smooth'
        });
    }
});