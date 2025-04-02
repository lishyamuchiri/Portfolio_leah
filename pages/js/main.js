 // Mobile menu toggle
 function toggleMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');    
    // Close menu when clicking a link
    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.add('hidden');
        });
    });
}
// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const offset = 80; // Adjust based on your navbar height
        
        window.scrollTo({
            top: target.offsetTop - offset,
            behavior: 'smooth'
        });
        
        if (!this.classList.contains('nav-link')) toggleMenu();
    });
});


document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = e.target[0].value.trim();
    const email = e.target[1].value.trim();
    const message = e.target[2].value.trim();
    
    if (!name || !email || !message) {
        alert('Please fill in all fields');
        return;
    }
    
    if (!/^\S+@\S+\.\S+$/.test(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Here you would typically send the form data to a server
    alert('Message sent! (Demo only)');
    e.target.reset();
});








// Preloader
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.classList.add('hidden');
    }, 100); // Delay for effect; adjust as needed
});

// Initialize AOS
AOS.init({
    duration: 1000, // Animation duration in milliseconds
    once: true, // Animation happens only once on scroll
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

// Form submission (demo)
document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Message sent! (Demo only)');
});
