// Wait for DOM to fully load before executing
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== Element References =====
    const themeToggle = document.getElementById('theme-toggle');
    const greeting = document.getElementById('greeting');
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');
    const themeIcon = document.querySelector('.theme-icon');
    
    // ===== Dark Mode Toggle =====
    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    if (currentTheme === 'dark') {
        document.body.classList.add('dark');
        themeIcon.textContent = '☀️';
    }
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark');
        
        // Update icon and save preference
        if (document.body.classList.contains('dark')) {
            themeIcon.textContent = '☀️';
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.textContent = '🌙';
            localStorage.setItem('theme', 'light');
        }
        
        // Add animation to button
        themeToggle.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            themeToggle.style.transform = 'rotate(0deg)';
        }, 300);
    });
    
    // ===== Dynamic Greeting Based on Time =====
    function setGreeting() {
        const hour = new Date().getHours();
        let message;
        let emoji;
        
        if (hour < 12) {
            message = 'Good Morning';
            emoji = '☀️';
        } else if (hour < 17) {
            message = 'Good Afternoon';
            emoji = '🌤️';
        } else {
            message = 'Good Evening';
            emoji = '🌙';
        }
        
        greeting.textContent = `${message} ${emoji} Welcome to my portfolio!`;
    }
    
    setGreeting();
    
    // ===== Smooth Scrolling Enhancement =====
    // Add active state to navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');
    
    // Highlight active section in navigation
    function highlightActiveSection() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightActiveSection);
    
    // ===== Form Validation & Submission =====
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Validate form fields
        if (!name || !email || !message) {
            showMessage('Please fill in all required fields.', 'error');
            return;
        }
        
        // Validate email format
        if (!isValidEmail(email)) {
            showMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        // Validate message length
        if (message.length < 10) {
            showMessage('Please enter a message with at least 10 characters.', 'error');
            return;
        }
        
        // Simulate form submission (in real app, this would send to server)
        submitForm(name, email, message);
    });
    
    // Email validation helper
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Form submission handler
    function submitForm(name, email, message) {
        // Disable submit button during "submission"
        const submitBtn = contactForm.querySelector('.btn-submit');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        
        // Simulate API call delay
        setTimeout(() => {
            showMessage(`Thanks ${name}! Your message has been received. I'll get back to you soon! 🎉`, 'success');
            contactForm.reset();
            
            // Re-enable button
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
            
            // Log to console (for demo purposes)
            console.log('Form submitted:', { name, email, message });
        }, 1500);
    }
    
    // Show form message helper
    function showMessage(text, type) {
        formMessage.textContent = text;
        formMessage.className = `form-message ${type}`;
        
        // Auto-hide message after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }
    
    // ===== Scroll Animation for Elements =====
    // Fade in elements when they come into viewport
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe skill cards and project cards for animation
    document.querySelectorAll('.skill-card, .project-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // ===== Project Card Hover Effect Enhancement =====
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // ===== Keyboard Navigation Enhancement =====
    // Add keyboard support for theme toggle
    themeToggle.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
        }
    });
    
    // ===== Console Welcome Message =====
    console.log('%c👋 Welcome to my Portfolio!', 'color: #3498db; font-size: 20px; font-weight: bold;');
    console.log('%cInterested in the code? Check out my GitHub!', 'color: #2ecc71; font-size: 14px;');
    
    // ===== Performance Monitoring (Optional) =====
    // Log page load time
    window.addEventListener('load', function() {
        const loadTime = performance.now();
        console.log(`✨ Page loaded in ${loadTime.toFixed(2)}ms`);
    });
    // ===== Project Filter =====
const filterButtons = document.querySelectorAll('.filter-btn');
const allProjectCards = document.querySelectorAll('.project-card');
const projectCount = document.getElementById('project-count');

function updateCount(count) {
    projectCount.textContent = count + ' project' + (count === 1 ? '' : 's') + ' shown';
}

function filterProjects(filter) {
    let visible = 0;
    allProjectCards.forEach(card => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.classList.toggle('hidden', !match);
        if (match) visible++;
    });

    const existing = document.getElementById('no-projects-msg');
    if (existing) existing.remove();

    if (visible === 0) {
        const msg = document.createElement('p');
        msg.id = 'no-projects-msg';
        msg.className = 'no-projects-msg';
        msg.textContent = ' No projects found in this category.';
        document.querySelector('.projects-grid').after(msg);
    }

    updateCount(visible);
}

filterButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        filterButtons.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        filterProjects(this.dataset.filter);
    });
});

filterProjects('all');

// ===== Expand/Collapse Skills =====
document.querySelectorAll('.skill-toggle').forEach(btn => {
    btn.addEventListener('click', function() {
        const extra = this.previousElementSibling;
        extra.classList.toggle('open');
        this.textContent = extra.classList.contains('open') ? 'Show less ▲' : 'Show more ▼';
    });
});
});

// ===== Additional Utility Functions =====

// Debounce function for scroll events (performance optimization)
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}


// ===== Music Search API =====
const musicInput = document.getElementById('music-input');
const musicSearchBtn = document.getElementById('music-search-btn');
const musicResults = document.getElementById('music-results');
const musicError = document.getElementById('music-error');

function searchMusic() {
    const query = musicInput.value.trim();
    if (!query) {
        musicError.textContent = '⚠️ Please enter an artist or song name.';
        return;
    }

    musicError.textContent = '';
    musicResults.innerHTML = '<p style="text-align:center;color:var(--text-light)">Searching...</p>';
    musicSearchBtn.disabled = true;

    fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(query)}&media=music&limit=8`)
        .then(response => {
            if (!response.ok) throw new Error('Failed');
            return response.json();
        })
        .then(data => {
            musicSearchBtn.disabled = false;
            if (data.results.length === 0) {
                musicResults.innerHTML = '';
                musicError.textContent = '⚠️ No results found. Try a different search.';
                return;
            }
            musicResults.innerHTML = data.results.map((track, index) => `
    <div class="music-card">
        <img src="${track.artworkUrl100}" alt="${track.trackName}">
        <h4>${track.trackName}</h4>
        <p>${track.artistName}</p>
        ${track.previewUrl ? `
            <audio id="audio-${index}" src="${track.previewUrl}"></audio>
            <button class="play-btn" data-index="${index}">▶ Play Preview</button>
        ` : '<p class="no-preview">No preview available</p>'}
    </div>
`).join('');

document.querySelectorAll('.play-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const index = this.dataset.index;
        const audio = document.getElementById('audio-' + index);

        // Stop all other playing audios
        document.querySelectorAll('.music-results audio').forEach(a => {
            if (a.id !== 'audio-' + index) {
                a.pause();
                a.currentTime = 0;
            }
        });
        document.querySelectorAll('.play-btn').forEach(b => b.textContent = '▶ Play Preview');

        if (audio.paused) {
            audio.play();
            this.textContent = '⏸ Pause';
        } else {
            audio.pause();
            this.textContent = '▶ Play Preview';
        }

        // Reset button when audio ends
        audio.onended = () => {
            this.textContent = '▶ Play Preview';
        };
    });
});
        })
        .catch(() => {
            musicSearchBtn.disabled = false;
            musicResults.innerHTML = '';
            musicError.textContent = '⚠️ Could not load results. Please check your connection.';
        });
}

musicSearchBtn.addEventListener('click', searchMusic);

musicInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') searchMusic();
});