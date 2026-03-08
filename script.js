document.addEventListener('DOMContentLoaded', () => {

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth Scrolling for Links
    document.querySelectorAll('.nav-links a, .btn-primary').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#home') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Account for fixed navbar height
                const navHeight = navbar.offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll Animations (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once visible if you want the animation to happen only once
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Select all elements that need animation
    const animatedElements = document.querySelectorAll('.fade-in-up, .slide-in-left, .slide-in-right');
    
    // Initialize hero animation immediately to avoid delay
    const heroElements = document.querySelectorAll('.hero .fade-in-up');
    heroElements.forEach(el => {
        setTimeout(() => el.classList.add('visible'), 100);
    });

    // Observe remaining elements
    animatedElements.forEach(el => {
        if(!el.closest('.hero')) {
             observer.observe(el);
        }
    });

    // Buy Button Interaction
    const buyButtons = document.querySelectorAll('.btn-buy');
    buyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const originalText = this.innerText;
            this.innerText = 'Added to Cart ✓';
            this.style.backgroundColor = 'var(--gold)';
            this.style.color = 'var(--black)';
            
            setTimeout(() => {
                this.innerText = originalText;
                this.style.backgroundColor = '';
                this.style.color = '';
            }, 2000);
        });
    });
});
