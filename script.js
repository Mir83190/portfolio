(() => {
  // Sélecteurs
  const navItems    = document.querySelectorAll('.nav-item');
  const sections    = document.querySelectorAll('section[id]');
  const fadeEls     = document.querySelectorAll('.fade-in');
  const mobileBtn   = document.querySelector('.mobile-menu-btn');
  const mobileMenu  = document.getElementById('mobile-menu');
  const menuIcon    = document.getElementById('menu-icon');

  // Observer pour fade-in
  const fadeObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  fadeEls.forEach(el => fadeObserver.observe(el));

  // Observer pour nav active
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const id = e.target.id;
        navItems.forEach(item => {
          item.classList.toggle('active', item.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { rootMargin: '-50% 0px -50% 0px' });

  sections.forEach(sec => navObserver.observe(sec));

  // Smooth scroll + fermeture mobile
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const tgt = document.querySelector(a.getAttribute('href'));
      tgt?.scrollIntoView({ behavior: 'smooth' });
      mobileMenu.classList.remove('open');
      menuIcon.textContent = '☰';
      
      // Remonter le bouton Me contacter
      const mobileContactBtn = document.querySelector('.mobile-contact-btn');
      if (mobileContactBtn) {
        mobileContactBtn.style.display = 'block';
      }
    });
  });

  // Toggle mobile menu moderne - VERSION SLIDE
  mobileBtn.addEventListener('click', () => {
    const overlay = document.querySelector('.menu-overlay');
    const icon = document.getElementById('menu-icon');
    
    const open = mobileMenu.classList.toggle('open');
    
    // Animation du bouton burger
    mobileBtn.classList.toggle('open', open);
    icon.textContent = open ? '✕' : '☰';
    
    // Gestion overlay
    if (overlay) {
      overlay.classList.toggle('open', open);
    }
    
    // Empêcher le scroll du body quand le menu est ouvert
    document.body.style.overflow = open ? 'hidden' : '';
  });

  // Fermer le menu en cliquant sur l'overlay
  document.addEventListener('click', (e) => {
    const overlay = document.querySelector('.menu-overlay');
    if (e.target === overlay) {
      mobileMenu.classList.remove('open');
      mobileBtn.classList.remove('open');
      const icon = document.getElementById('menu-icon');
      icon.textContent = '☰';
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

  // Fermer le menu avec Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
      mobileMenu.classList.remove('open');
      mobileBtn.classList.remove('open');
      const icon = document.getElementById('menu-icon');
      icon.textContent = '☰';
      const overlay = document.querySelector('.menu-overlay');
      if (overlay) overlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

  // Gestion des clics sur les items du menu
  document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', (e) => {
      // Retirer active de tous
      document.querySelectorAll('.menu-item').forEach(menuItem => {
        menuItem.classList.remove('active');
      });
      
      // Ajouter active au cliqué
      item.classList.add('active');
      
      // Fermer le menu après sélection
      setTimeout(() => {
        mobileMenu.classList.remove('open');
        mobileBtn.classList.remove('open');
        const icon = document.getElementById('menu-icon');
        icon.textContent = '☰';
        const overlay = document.querySelector('.menu-overlay');
        if (overlay) overlay.classList.remove('open');
        document.body.style.overflow = '';
      }, 300);
    });
  });

  // === NOUVELLES ANIMATIONS AJOUTÉES ===

  // === PROGRESS BAR ===
  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.offsetHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
      progressBar.style.width = scrollPercent + '%';
    }
  });

  // === ATTENDRE LE CHARGEMENT COMPLET POUR PARTICLES & TYPED ===
  window.addEventListener('load', function() {
    
    // === PARTICLES.JS CONFIGURATION POUR HERO ===
    if (typeof particlesJS !== 'undefined') {
      // Particles pour le Hero
      particlesJS('particles-js', {
        "particles": {
          "number": {
            "value": 80,
            "density": { "enable": true, "value_area": 800 }
          },
          "color": { "value": ["#ffffff", "#e5e7eb", "#3b82f6"] },
          "shape": {
            "type": "circle",
            "stroke": { "width": 0, "color": "#000000" }
          },
          "opacity": {
            "value": 0.5,
            "random": true,
            "anim": { "enable": true, "speed": 1, "opacity_min": 0.1 }
          },
          "size": {
            "value": 3,
            "random": true,
            "anim": { "enable": true, "speed": 4, "size_min": 0.3 }
          },
          "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#ffffff",
            "opacity": 0.3,
            "width": 1
          },
          "move": {
            "enable": true,
            "speed": 2,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "bounce": false
          }
        },
        "interactivity": {
          "detect_on": "canvas",
          "events": {
            "onhover": { "enable": true, "mode": "repulse" },
            "onclick": { "enable": true, "mode": "push" },
            "resize": true
          }
        },
        "retina_detect": true
      });

      // Particles pour le Contact (visibilité augmentée)
      particlesJS('particles-contact', {
        "particles": {
          "number": {
            "value": 85,
            "density": { "enable": true, "value_area": 700 }
          },
          "color": { "value": ["#ffffff", "#e5e7eb", "#a5b4fc"] },
          "shape": {
            "type": "circle",
            "stroke": { "width": 0, "color": "#000000" }
          },
          "opacity": {
            "value": 0.6,
            "random": true,
            "anim": { "enable": true, "speed": 1, "opacity_min": 0.2 }
          },
          "size": {
            "value": 3.5,
            "random": true,
            "anim": { "enable": true, "speed": 4, "size_min": 0.5 }
          },
          "line_linked": {
            "enable": true,
            "distance": 140,
            "color": "#ffffff",
            "opacity": 0.35,
            "width": 1.2
          },
          "move": {
            "enable": true,
            "speed": 2,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "bounce": false
          }
        },
        "interactivity": {
          "detect_on": "canvas",
          "events": {
            "onhover": { "enable": true, "mode": "repulse" },
            "onclick": { "enable": true, "mode": "push" },
            "resize": true
          }
        },
        "retina_detect": true
      });
    }
    
    // === TYPED.JS ANIMATION ===
    if (typeof Typed !== 'undefined') {
      const typedElement = document.getElementById('typed-text');
      if (typedElement) {
        var typed = new Typed('#typed-text', {
          strings: [
            'Data Analyst',
            'Développeur Python', 
            'Expert IoT',
            'Spécialiste ESRI',
            'Analyste de Données'
          ],
          typeSpeed: 80,
          backSpeed: 50,
          backDelay: 2000,
          startDelay: 1000,
          loop: true,
          showCursor: true,
          cursorChar: '|'
        });
      }
    } else {
      // Fallback si Typed.js ne charge pas
      const typedElement = document.getElementById('typed-text');
      if (typedElement) {
        typedElement.textContent = 'Data Analyst';
      }
    }
  });

  // === ANIMATION ICÔNES SEULEMENT (pas les cartes entières) ===
  document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.project-icon').forEach(icon => {
      icon.addEventListener('mouseenter', function() {
        icon.style.transform = 'scale(1.1) rotateZ(5deg)';
      });
      
      icon.addEventListener('mouseleave', function() {
        icon.style.transform = 'scale(1) rotateZ(0deg)';
      });
    });
  });

  // === PARALLAX LÉGER SUR HERO ET CONTACT ===
  window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const avatar = document.querySelector('.hero-avatar');
    const particles = document.getElementById('particles-js');
    const particlesContact = document.getElementById('particles-contact');
    
    if (avatar) {
      avatar.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
    
    if (particles) {
      particles.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
    
    if (particlesContact) {
      particlesContact.style.transform = `translateY(${(scrolled - window.innerHeight) * 0.2}px)`;
    }
  });

  console.log('🎯 Portfolio avec animations Hero + Contact chargé avec succès !');
})();