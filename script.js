(() => {
  console.log('🚀 Script navigation simple chargé');

  // === MENU MOBILE SIMPLE ===
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');
  const overlay = document.querySelector('.menu-overlay');

  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.contains('open');
      
      if (isOpen) {
        // Fermer
        mobileMenu.classList.remove('open');
        mobileBtn.classList.remove('open');
        if (overlay) overlay.classList.remove('open');
        if (menuIcon) menuIcon.textContent = '☰';
        document.body.style.overflow = '';
      } else {
        // Ouvrir
        mobileMenu.classList.add('open');
        mobileBtn.classList.add('open');
        if (overlay) overlay.classList.add('open');
        if (menuIcon) menuIcon.textContent = '✕';
        document.body.style.overflow = 'hidden';
      }
    });

    // Fermer avec overlay
    if (overlay) {
      overlay.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        mobileBtn.classList.remove('open');
        overlay.classList.remove('open');
        if (menuIcon) menuIcon.textContent = '☰';
        document.body.style.overflow = '';
      });
    }

    // Fermer avec Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
        mobileMenu.classList.remove('open');
        mobileBtn.classList.remove('open');
        if (overlay) overlay.classList.remove('open');
        if (menuIcon) menuIcon.textContent = '☰';
        document.body.style.overflow = '';
      }
    });
  }

  // === NAVIGATION ULTRA-SIMPLE ===
  // Pour les liens qui commencent par # (scroll sur la même page)
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      
      if (target) {
        console.log('📍 Scroll vers:', link.getAttribute('href'));
        
        // Fermer le menu mobile
        if (mobileMenu && mobileMenu.classList.contains('open')) {
          mobileMenu.classList.remove('open');
          mobileBtn.classList.remove('open');
          if (overlay) overlay.classList.remove('open');
          if (menuIcon) menuIcon.textContent = '☰';
          document.body.style.overflow = '';
        }
        
        // Scroll simple
        const yOffset = -80;
        const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
        
        window.scrollTo({
          top: y,
          behavior: 'smooth'
        });
      }
    });
  });

  // === PROGRESS BAR SIMPLE ===
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.offsetHeight - window.innerHeight;
    const scrollPercent = Math.min((scrollTop / docHeight) * 100, 100);
    
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
      progressBar.style.width = scrollPercent + '%';
    }
  });

  // === FADE-IN SIMPLE ===
  const observerOptions = { threshold: 0.1 };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
  });

  // === BOUTONS ACTIFS SELON LA SECTION VISIBLE ===
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-item');
  const menuItems = document.querySelectorAll('.menu-item');

  if (sections.length > 0) { // Seulement sur l'index
    const sectionObserver = new IntersectionObserver((entries) => {
      let currentSection = '';
      
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          currentSection = entry.target.id;
        }
      });
      
      if (currentSection) {
        console.log('📍 Section visible:', currentSection);
        
        // Enlever active de tous les boutons
        navItems.forEach(item => item.classList.remove('active'));
        menuItems.forEach(item => item.classList.remove('active'));
        
        // Ajouter active au bon bouton
        navItems.forEach(item => {
          const link = item.querySelector('a');
          if (link && link.getAttribute('href') === `#${currentSection}`) {
            item.classList.add('active');
            console.log('✅ Bouton activé:', link.textContent.trim());
          }
        });
        
        menuItems.forEach(item => {
          if (item.getAttribute('href') === `#${currentSection}`) {
            item.classList.add('active');
          }
        });
      }
    }, { 
      threshold: 0.1, // Section doit être 10% visible (plus sensible)
      rootMargin: '-20% 0px -60% 0px' // Zone de détection ajustée
    });

    sections.forEach(section => {
      sectionObserver.observe(section);
    });

    // Detection manuelle au scroll pour plus de précision
    window.addEventListener('scroll', () => {
      let current = '';
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset;
      
      // Si on est en bas de page (dans les derniers 200px), forcer Contact
      if (scrollTop + windowHeight >= documentHeight - 200) {
        current = 'contact';
      } else {
        // Sinon, détecter normalement
        sections.forEach(section => {
          const rect = section.getBoundingClientRect();
          const sectionTop = rect.top;
          const sectionHeight = rect.height;
          
          // Zone de détection spéciale pour Contact (plus large)
          if (section.id === 'contact') {
            if (sectionTop <= 200 && sectionTop + sectionHeight > -100) {
              current = section.id;
            }
          } else {
            // Détection normale pour les autres sections
            if (sectionTop <= 100 && sectionTop + sectionHeight > 100) {
              current = section.id;
            }
          }
        });
      }
      
      if (current) {
        console.log('🎯 Section active:', current);
        
        // Mettre à jour les boutons
        navItems.forEach(item => item.classList.remove('active'));
        menuItems.forEach(item => item.classList.remove('active'));
        
        navItems.forEach(item => {
          const link = item.querySelector('a');
          if (link && link.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
          }
        });
        
        menuItems.forEach(item => {
          if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
          }
        });
      }
    });
  }

  // === PARTICLES & TYPED (SEULEMENT SUR INDEX) ===
  window.addEventListener('load', () => {
    // Vérifier si on est sur l'index (pas de classe detail sur body)
    const isIndex = !document.body.className.includes('-detail');
    
    if (isIndex) {
      // Particles pour Hero
      if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
        particlesJS('particles-js', {
          particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: ["#ffffff", "#e5e7eb", "#3b82f6"] },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: true, anim: { enable: true, speed: 1, opacity_min: 0.1 } },
            size: { value: 3, random: true, anim: { enable: true, speed: 4, size_min: 0.3 } },
            line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.3, width: 1 },
            move: { enable: true, speed: 2, direction: "none", out_mode: "out" }
          },
          interactivity: {
            detect_on: "canvas",
            events: { onhover: { enable: true, mode: "repulse" }, onclick: { enable: true, mode: "push" }, resize: true }
          },
          retina_detect: true
        });
      }

      // Particles pour Contact
      if (typeof particlesJS !== 'undefined' && document.getElementById('particles-contact')) {
        particlesJS('particles-contact', {
          particles: {
            number: { value: 85, density: { enable: true, value_area: 700 } },
            color: { value: ["#ffffff", "#e5e7eb", "#a5b4fc"] },
            shape: { type: "circle" },
            opacity: { value: 0.6, random: true, anim: { enable: true, speed: 1, opacity_min: 0.2 } },
            size: { value: 3.5, random: true, anim: { enable: true, speed: 4, size_min: 0.5 } },
            line_linked: { enable: true, distance: 140, color: "#ffffff", opacity: 0.35, width: 1.2 },
            move: { enable: true, speed: 2, direction: "none", out_mode: "out" }
          },
          interactivity: {
            detect_on: "canvas",
            events: { onhover: { enable: true, mode: "repulse" }, onclick: { enable: true, mode: "push" }, resize: true }
          },
          retina_detect: true
        });
      }

      // Typed.js pour le sous-titre
      if (typeof Typed !== 'undefined' && document.querySelector('.hero-subtitle')) {
        new Typed('.hero-subtitle', {
          strings: ['Data Analyst', 'Développeur Python', 'Expert IoT', 'Spécialiste ESRI', 'Analyste de Données'],
          typeSpeed: 80,
          backSpeed: 50,
          backDelay: 2000,
          startDelay: 1000,
          loop: true,
          showCursor: true,
          cursorChar: '|'
        });
      }

      // Animation des icônes projets
      document.querySelectorAll('.project-icon').forEach(icon => {
        icon.addEventListener('mouseenter', () => {
          icon.style.transform = 'scale(1.1) rotateZ(5deg)';
        });
        icon.addEventListener('mouseleave', () => {
          icon.style.transform = 'scale(1) rotateZ(0deg)';
        });
      });

      // Parallax léger
      window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const avatar = document.querySelector('.hero-avatar');
        const particles = document.getElementById('particles-js');
        const particlesContact = document.getElementById('particles-contact');
        
        if (avatar) avatar.style.transform = `translateY(${scrolled * 0.1}px)`;
        if (particles) particles.style.transform = `translateY(${scrolled * 0.3}px)`;
        if (particlesContact) particlesContact.style.transform = `translateY(${(scrolled - window.innerHeight) * 0.2}px)`;
      });
    }
  });

  console.log('✅ Navigation simple prête - Tout devrait marcher !');
})();

// === CARROUSEL WAZE SIMPLE ===
let wazeCurrentSlide = 0;
const wazeCaptions = [
  "Dashboard temps réel des accidents et bouchons Waze fait sur ArcGIS dashboard.",
  "Vue alternative du tableau de bord avec analytics avancés et métriques détaillées."
];

function wazeUpdateCarousel() {
  const slides = document.querySelectorAll('.waze-slide');
  const dots = document.querySelectorAll('.waze-dot');
  const caption = document.getElementById('waze-caption');
  
  // Cacher tous les slides
  slides.forEach(slide => slide.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));
  
  // Afficher le slide actuel
  if (slides[wazeCurrentSlide]) {
    slides[wazeCurrentSlide].classList.add('active');
  }
  if (dots[wazeCurrentSlide]) {
    dots[wazeCurrentSlide].classList.add('active');
  }
  if (caption && wazeCaptions[wazeCurrentSlide]) {
    caption.textContent = wazeCaptions[wazeCurrentSlide];
  }
}

function wazeChangeSlide(direction) {
  const totalSlides = document.querySelectorAll('.waze-slide').length;
  
  wazeCurrentSlide += direction;
  
  if (wazeCurrentSlide >= totalSlides) {
    wazeCurrentSlide = 0;
  } else if (wazeCurrentSlide < 0) {
    wazeCurrentSlide = totalSlides - 1;
  }
  
  wazeUpdateCarousel();
}

function wazeGoToSlide(slideIndex) {
  wazeCurrentSlide = slideIndex;
  wazeUpdateCarousel();
}

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
  if (document.querySelector('.waze-carousel')) {
    wazeUpdateCarousel();
    
    // Support clavier
    document.addEventListener('keydown', function(e) {
      if (document.querySelector('.waze-carousel')) {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          wazeChangeSlide(-1);
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          wazeChangeSlide(1);
        }
      }
    });
  }
});
