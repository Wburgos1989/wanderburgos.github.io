/* ==========================================================================
   Wander Burgos - JavaScript Interactions
   Theme: Alien / Space Coding Universe (Blue & Green Scales)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------------------------
    // 1. Mobile Menu Toggle
    // ----------------------------------------------------------------------
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const mobileDropdown = document.getElementById('mobile-menu-dropdown');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    const toggleMenu = () => {
        mobileToggle.classList.toggle('open');
        mobileDropdown.classList.toggle('open');
        document.body.classList.toggle('overflow-hidden'); // Disable scrolling when open
    };

    if (mobileToggle) {
        mobileToggle.addEventListener('click', toggleMenu);
    }

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileDropdown.classList.contains('open')) {
                toggleMenu();
            }
        });
    });

    // ----------------------------------------------------------------------
    // 2. Sticky Header scroll effect
    // ----------------------------------------------------------------------
    const header = document.querySelector('.main-header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ----------------------------------------------------------------------
    // 3. Scroll Active Link Highlighting
    // ----------------------------------------------------------------------
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobLinks = document.querySelectorAll('.mobile-link');

    const highlightActiveNav = () => {
        let scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 150;
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                // Desktop nav link update
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
                // Mobile nav link update
                mobLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', highlightActiveNav);

    // ----------------------------------------------------------------------
    // 4. Typewriter Animation for Specialties
    // ----------------------------------------------------------------------
    const typewriterElement = document.getElementById('typewriter-text');
    const specialties = [
        'Desarrollo Web Fullstack',
        'Desarrollo de Apps Móviles',
        'Arquitectura de Software',
        'Soluciones Multiplataforma',
        'Código Limpio y Optimizado'
    ];
    
    let loopIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    const handleTypewriter = () => {
        const currentText = specialties[loopIndex % specialties.length];
        
        if (isDeleting) {
            typewriterElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Deletes faster
        } else {
            typewriterElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 120; // Types slower
        }

        if (!isDeleting && charIndex === currentText.length) {
            typingSpeed = 1800; // Pause at the end of the word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            loopIndex++;
            typingSpeed = 500; // Pause before typing next word
        }

        setTimeout(handleTypewriter, typingSpeed);
    };

    if (typewriterElement) {
        setTimeout(handleTypewriter, 1000);
    }

    // ----------------------------------------------------------------------
    // 5. Interactive Glassmorphic Skill Card Glow Tracker
    // ----------------------------------------------------------------------
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // ----------------------------------------------------------------------
    // 6. Interactive Cosmic Programming Universe (Canvas)
    // ----------------------------------------------------------------------
    const canvas = document.getElementById('space-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        
        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        const stars = [];
        const mouse = { x: null, y: null, radius: 150 };

        // Configuration
        const STAR_COUNT = Math.min(Math.floor((width * height) / 10000), 120); // Scale based on screen size
        const CONNECTION_DIST = 110;
        const ALIEN_GREEN_RGB = '0, 255, 135';
        const ALIEN_BLUE_RGB = '0, 210, 255';

        // Listen for mousemove
        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

        window.addEventListener('mouseleave', () => {
            mouse.x = null;
            mouse.y = null;
        });

        // Resize Canvas dynamically
        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        // Star Object Class
        class Star {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.35; // Slow drift velocity
                this.vy = (Math.random() - 0.5) * 0.35;
                this.radius = Math.random() * 2 + 1;
                
                // Color variation (alien blue or green)
                this.color = Math.random() > 0.5 
                    ? `rgba(${ALIEN_GREEN_RGB}, ${Math.random() * 0.6 + 0.3})`
                    : `rgba(${ALIEN_BLUE_RGB}, ${Math.random() * 0.6 + 0.3})`;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
            }

            update() {
                // Drift bounds checking
                if (this.x < 0 || this.x > width) this.vx = -this.vx;
                if (this.y < 0 || this.y > height) this.vy = -this.vy;

                this.x += this.vx;
                this.y += this.vy;

                // Mouse interaction (gravity-like attraction/push)
                if (mouse.x !== null && mouse.y !== null) {
                    const dx = mouse.x - this.x;
                    const dy = mouse.y - this.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    
                    if (dist < mouse.radius) {
                        const force = (mouse.radius - dist) / mouse.radius;
                        // Slowly slide towards mouse
                        this.x += (dx / dist) * force * 0.5;
                        this.y += (dy / dist) * force * 0.5;
                    }
                }
            }
        }

        // Initialize Stars
        for (let i = 0; i < STAR_COUNT; i++) {
            stars.push(new Star());
        }

        // Animation Loop
        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            // Draw and update stars
            stars.forEach((star) => {
                star.update();
                star.draw();
            });

            // Draw connection lines representing constelations (nodes/networks)
            for (let i = 0; i < stars.length; i++) {
                for (let j = i + 1; j < stars.length; j++) {
                    const s1 = stars[i];
                    const s2 = stars[j];
                    
                    const dx = s1.x - s2.x;
                    const dy = s1.y - s2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < CONNECTION_DIST) {
                        const alpha = (1 - dist / CONNECTION_DIST) * 0.15;
                        
                        // Alternate line colors based on stars
                        ctx.beginPath();
                        ctx.moveTo(s1.x, s1.y);
                        ctx.lineTo(s2.x, s2.y);
                        
                        // Neon gradient connections
                        const grad = ctx.createLinearGradient(s1.x, s1.y, s2.x, s2.y);
                        grad.addColorStop(0, `rgba(${ALIEN_BLUE_RGB}, ${alpha})`);
                        grad.addColorStop(1, `rgba(${ALIEN_GREEN_RGB}, ${alpha})`);
                        
                        ctx.strokeStyle = grad;
                        ctx.lineWidth = 0.8;
                        ctx.stroke();
                    }
                }
            }

            requestAnimationFrame(animate);
        };

        animate();
    }
});
