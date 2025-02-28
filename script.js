document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navMenu = document.querySelector('nav ul');
    
    mobileNavToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Toggle icon between bars and x
        const icon = this.querySelector('i');
        if (icon.classList.contains('fa-bars')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Close mobile menu when a nav item is clicked
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            const icon = mobileNavToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
    
    // Active navigation based on scroll position
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('nav a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').substring(1) === current) {
                item.classList.add('active');
            }
        });
    });
    
    // Book data
    const books = [
        {
            title: "The Silent Echo",
            author: "Eliza Montgomery",
            cover: "purple-gradient",
            description: "A haunting tale of memory and loss set in a small coastal town where echoes of the past refuse to be silenced."
        },
        {
            title: "Midnight Gardens",
            author: "Thomas Reynolds",
            cover: "blue-gradient",
            description: "In a garden that only blooms at night, a botanist discovers plants with impossible properties that challenge everything she knows about science."
        },
        {
            title: "The Algorithm",
            author: "Sophia Chen",
            cover: "teal-gradient",
            description: "When an AI designed to predict human behavior starts making impossible predictions that come true, its creator must find out how before it's too late."
        },
        {
            title: "Lost Horizons",
            author: "James Harper",
            cover: "green-gradient",
            description: "An archaeologist's journey to the remote mountains of Tibet leads to the discovery of an ancient civilization with technology beyond our understanding."
        },
        {
            title: "The Observer",
            author: "Nora Williams",
            cover: "pink-gradient",
            description: "A psychological thriller about a woman who believes she's being watched, only to discover something far more disturbing than a stalker."
        },
        {
            title: "Quantum Dreams",
            author: "Daniel Foster",
            cover: "orange-gradient",
            description: "When a physicist finds her dreams are affecting quantum experiments in her lab, she begins to question the nature of reality itself."
        }
    ];
    
    // Generate book cards
    const bookGrid = document.querySelector('.book-grid');
    
    if (bookGrid) {
        books.forEach(book => {
            const bookCard = document.createElement('div');
            bookCard.className = 'book-card fade-in';
            
            bookCard.innerHTML = `
                <div class="book-cover" style="background: linear-gradient(135deg, var(--primary-bg), var(--primary-light));">
                    <svg width="100%" height="100%" viewBox="0 0 200 300">
                        <rect width="200" height="300" fill="url(#${book.cover})"/>
                        <defs>
                            <linearGradient id="purple-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stop-color="#c4b5fd" />
                                <stop offset="100%" stop-color="#7c3aed" />
                            </linearGradient>
                            <linearGradient id="blue-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stop-color="#93c5fd" />
                                <stop offset="100%" stop-color="#3b82f6" />
                            </linearGradient>
                            <linearGradient id="teal-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stop-color="#5eead4" />
                                <stop offset="100%" stop-color="#0d9488" />
                            </linearGradient>
                            <linearGradient id="green-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stop-color="#86efac" />
                                <stop offset="100%" stop-color="#16a34a" />
                            </linearGradient>
                            <linearGradient id="pink-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stop-color="#f9a8d4" />
                                <stop offset="100%" stop-color="#db2777" />
                            </linearGradient>
                            <linearGradient id="orange-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stop-color="#fdba74" />
                                <stop offset="100%" stop-color="#ea580c" />
                            </linearGradient>
                        </defs>
                        <text x="100" y="150" font-family="Arial" font-size="14" fill="white" text-anchor="middle">${book.title}</text>
                    </svg>
                </div>
                <div class="book-info">
                    <div class="book-title">${book.title}</div>
                    <div class="book-author">by ${book.author}</div>
                </div>
                <div class="book-description">
                    <h4>${book.title}</h4>
                    <p>${book.description}</p>
                    <a href="#" class="view-button">View Details</a>
                </div>
            `;
            
            bookGrid.appendChild(bookCard);
        });
    }

    // Simple animation for collection cards
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.collection-card, .service-item, .book-card').forEach(item => {
        observer.observe(item);
        item.classList.add('fade-in');
    });
    
    // Smooth scroll to anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Search bar functionality
    const searchBar = document.querySelector('.search-bar');
    const searchBtn = document.querySelector('.search-btn');
    
    searchBtn.addEventListener('click', function() {
        if(searchBar.value.trim() !== '') {
            alert(`Searching for: ${searchBar.value}`);
            // In a real implementation, this would redirect to search results
        }
    });
    
    searchBar.addEventListener('keypress', function(e) {
        if(e.key === 'Enter' && this.value.trim() !== '') {
            alert(`Searching for: ${this.value}`);
            // In a real implementation, this would redirect to search results
        }
    });
});

// Add fade-in animation with CSS
document.head.insertAdjacentHTML('beforeend', `
<style>
.fade-in {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
}

.fade-in.animate {
    opacity: 1;
    transform: translateY(0);
}
</style>
`);