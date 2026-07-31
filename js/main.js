/* ==========================================================================
   CARPINTARIA PORTUGAL — MASTER JAVASCRIPT & CINEMATIC EFFECTS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initCursorGlow();
  initMobileMenu();
  initTiltCards();
  initKineticMarquee();
  initOdometers();
  initAccordionSlider();
  initFAQ();
  initMagneticButtons();
  initScrollAnimations();
  initVideoModal();
});

/* --------------------------------------------------------------------------
   1. Header Glassmorphism on Scroll
   -------------------------------------------------------------------------- */
function initHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* --------------------------------------------------------------------------
   2. Cursor Glow Effect
   -------------------------------------------------------------------------- */
function initCursorGlow() {
  const glow = document.getElementById('glow');
  if (!glow) return;

  let mouseX = 0, mouseY = 0;
  let glowX = 0, glowY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function renderGlow() {
    glowX += (mouseX - glowX) * 0.1;
    glowY += (mouseY - glowY) * 0.1;
    glow.style.left = `${glowX}px`;
    glow.style.top = `${glowY}px`;
    requestAnimationFrame(renderGlow);
  }
  renderGlow();
}

/* --------------------------------------------------------------------------
   3. Mobile Navigation Menu
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const toggle = document.querySelector('.mobile-toggle');
  const nav = document.querySelector('.nav-menu');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    toggle.classList.toggle('active');
  });

  // Close on link click
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.classList.remove('active');
    });
  });
}

/* --------------------------------------------------------------------------
   4. 3D Tilt Cards with Spotlight Border
   -------------------------------------------------------------------------- */
function initTiltCards() {
  const cards = document.querySelectorAll('.tilt-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      card.style.transform = `perspective(1000px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateY(-4px)`;

      // Spotlight tracking
      let spotlight = card.querySelector('.card-spotlight');
      if (!spotlight) {
        spotlight = document.createElement('div');
        spotlight.className = 'card-spotlight';
        card.appendChild(spotlight);
      }
      const spotX = e.clientX - rect.left;
      const spotY = e.clientY - rect.top;
      spotlight.style.background = `radial-gradient(circle at ${spotX}px ${spotY}px, rgba(200, 149, 108, 0.15) 0%, transparent 60%)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(0)';
    });
  });
}

/* --------------------------------------------------------------------------
   5. Kinetic Marquee (Infinite Scroll Track)
   -------------------------------------------------------------------------- */
function initKineticMarquee() {
  const marqueeRows = document.querySelectorAll('.marquee-track');
  if (!marqueeRows.length) return;

  marqueeRows.forEach(row => {
    // Clone children for infinite loop
    const content = row.innerHTML;
    row.innerHTML = content + content + content;

    let x = 0;
    const speed = 0.8;

    function marqueeLoop() {
      x -= speed;
      if (Math.abs(x) >= row.scrollWidth / 3) {
        x = 0;
      }
      row.style.transform = `translateX(${x}px)`;
      requestAnimationFrame(marqueeLoop);
    }
    marqueeLoop();
  });
}

/* --------------------------------------------------------------------------
   6. Odometer Stat Counters
   -------------------------------------------------------------------------- */
function initOdometers() {
  const stats = document.querySelectorAll('.stat-number[data-count]');
  if (!stats.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count'), 10);
        const prefix = el.getAttribute('data-prefix') || '';
        const suffix = el.getAttribute('data-suffix') || '';

        let count = 0;
        const duration = 2000;
        const stepTime = 20;
        const increment = target / (duration / stepTime);

        const timer = setInterval(() => {
          count += increment;
          if (count >= target) {
            el.innerText = `${prefix}${target.toLocaleString('pt-PT')}${suffix}`;
            clearInterval(timer);
          } else {
            el.innerText = `${prefix}${Math.floor(count).toLocaleString('pt-PT')}${suffix}`;
          }
        }, stepTime);

        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  stats.forEach(stat => observer.observe(stat));
}

/* --------------------------------------------------------------------------
   7. Accordion Slider (Portfolio)
   -------------------------------------------------------------------------- */
function initAccordionSlider() {
  const panels = document.querySelectorAll('.accordion-panel');
  if (!panels.length) return;

  panels.forEach(panel => {
    panel.addEventListener('mouseenter', () => {
      panels.forEach(p => p.classList.remove('active'));
      panel.classList.add('active');
    });
  });
}

/* --------------------------------------------------------------------------
   8. FAQ Accordion Toggle
   -------------------------------------------------------------------------- */
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all
      faqItems.forEach(i => i.classList.remove('active'));

      // Toggle current
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   9. Magnetic Buttons Effect
   -------------------------------------------------------------------------- */
function initMagneticButtons() {
  const magBtns = document.querySelectorAll('.btn-primary, .magnetic-btn');

  magBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * 0.25;
      const dy = (e.clientY - cy) * 0.25;

      btn.style.transform = `translate(${dx}px, ${dy}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0px, 0px)';
    });
  });
}

/* --------------------------------------------------------------------------
   10. Intersection Observer Scroll Fade Animations
   -------------------------------------------------------------------------- */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.fade-up');
  if (!animatedElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15 });

  animatedElements.forEach(el => observer.observe(el));
}

/* --------------------------------------------------------------------------
   11. Video Modal for Trabalhos Executados
   -------------------------------------------------------------------------- */
function initVideoModal() {
  const modal = document.getElementById('videoModal');
  const modalVideo = document.getElementById('modalVideo');
  const modalClose = modal ? modal.querySelector('.video-modal-close') : null;
  const modalBackdrop = modal ? modal.querySelector('.video-modal-backdrop') : null;
  const cards = document.querySelectorAll('.trabalho-card');

  if (!modal || !modalVideo || !cards.length) return;

  function openModal(videoSrc) {
    const source = modalVideo.querySelector('source');
    source.src = videoSrc;
    modalVideo.load();
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    modalVideo.play().catch(() => {
      // Autoplay may be blocked, user can use controls
    });
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    modalVideo.pause();
    modalVideo.currentTime = 0;
  }

  cards.forEach(card => {
    card.addEventListener('click', (e) => {
      const videoSrc = card.getAttribute('data-video');
      if (videoSrc) {
        openModal(videoSrc);
      }
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', (e) => {
      e.stopPropagation();
      closeModal();
    });
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', closeModal);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}
