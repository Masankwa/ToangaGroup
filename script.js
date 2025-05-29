document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll-to-top button
  const scrollBtn = document.getElementById('scrollTop');
  window.addEventListener('scroll', () => {
    scrollBtn.classList.toggle('visible', window.scrollY > 400);
  });
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Scroll-triggered fade-ins
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  // Active nav link on scroll
  const sections = document.querySelectorAll('header, section');
  const navLinks = document.querySelectorAll('.nav-links a');

  function highlightActiveLink() {
    const scrollY = window.scrollY;
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop - 100 && scrollY < sectionTop + sectionHeight - 100) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightActiveLink);
  highlightActiveLink(); // Run on load in case user is not at the top

  // Mobile menu toggle
  const menuToggle = document.getElementById('menu-toggle');
  const navLinksContainer = document.querySelector('.nav-links');

  menuToggle.addEventListener('click', () => {
    navLinksContainer.classList.toggle('open');
    menuToggle.classList.toggle('open');
  });

  // Close mobile nav when clicking outside
  document.addEventListener('click', (e) => {
    if (
      navLinksContainer.classList.contains('open') &&
      !navLinksContainer.contains(e.target) &&
      !menuToggle.contains(e.target)
    ) {
      navLinksContainer.classList.remove('open');
      menuToggle.classList.remove('open');
    }
  });

  // Close mobile nav on link click (optional)
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navLinksContainer.classList.remove('open');
      menuToggle.classList.remove('open');
    });
  });
});






document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.slide');
  const dots   = document.querySelectorAll('.dot');
  let current  = 0, timer;

  // Show a given slide
  function goToSlide(index) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }

  // Auto‑rotate every 5s
  function startTimer() {
    timer = setInterval(() => goToSlide(current + 1), 5000);
  }
  function stopTimer() {
    clearInterval(timer);
  }

  // Dot controls
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      stopTimer();
      goToSlide(parseInt(dot.dataset.index));
      startTimer();
    });
  });

  // Kick off
  goToSlide(0);
  startTimer();

  // Parallax on desktop
  if (window.innerWidth >= 481) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY * 0.4;
      document.getElementById('hero').style.backgroundPosition = `center ${y}px`;
    });
  }
});

// Smooth scroll helper
function scrollToSection(id) {
  document.getElementById(id)
    .scrollIntoView({ behavior: 'smooth' });
}

// Fade-in on scroll
  const fadeSections = document.querySelectorAll('.fade-in-section');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1
  });

  fadeSections.forEach(section => {
    observer.observe(section);
  });

  // Mobile click to flip
  document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        card.classList.toggle('active');
      }
    });
  });
  
  const scrollContainer = document.getElementById('scrollContainer');
const leftBtn = document.querySelector('.scroll-btn.left');
const rightBtn = document.querySelector('.scroll-btn.right');

leftBtn.addEventListener('click', () => {
  scrollContainer.scrollBy({
    left: -300,
    behavior: 'smooth'
  });
});

rightBtn.addEventListener('click', () => {
  scrollContainer.scrollBy({
    left: 300,
    behavior: 'smooth'
  });
});

// === Gallery Lightbox & Fade-In (scoped) ===
(function() {
  const gallery = document.getElementById('gallery');
  if (!gallery) return;

  // Fade-In Observer for #gallery
  const ban = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        gallery.classList.add('visible');
        ban.unobserve(gallery);
      }
    });
  }, { threshold: 0.15 });
  ban.observe(gallery);

  // Lightbox elements
  const items = gallery.querySelectorAll('.gallery-grid .item');
  const lightbox = gallery.querySelector('#lightbox');
  const imgEl = lightbox.querySelector('#lightbox-img');
  const closeBtn = lightbox.querySelector('.close');
  const prevBtn  = lightbox.querySelector('.prev');
  const nextBtn  = lightbox.querySelector('.next');

  let idx = 0;
  const srcs = Array.from(items).map(i => i.querySelector('img').src);

  // Set data-label and click handler
  items.forEach((it, i) => {
    const alt = it.querySelector('img').alt;
    it.dataset.label = alt || '';
    it.addEventListener('click', () => {
      idx = i;
      imgEl.src = srcs[idx];
      lightbox.classList.remove('hidden');
    });
  });

  closeBtn.addEventListener('click', () => {
    lightbox.classList.add('hidden');
  });
  nextBtn.addEventListener('click', () => {
    idx = (idx + 1) % srcs.length;
    imgEl.src = srcs[idx];
  });
  prevBtn.addEventListener('click', () => {
    idx = (idx - 1 + srcs.length) % srcs.length;
    imgEl.src = srcs[idx];
  });

  // Touch swipe
  let startX = 0;
  lightbox.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
  });
  lightbox.addEventListener('touchend', e => {
    const diff = e.changedTouches[0].clientX - startX;
    if (diff > 50) prevBtn.click();
    if (diff < -50) nextBtn.click();
  });
})();

// Fade-in observer for Contact
const contactSection = document.getElementById('contact');
if (contactSection) {
  const contactObserver = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      contactSection.classList.add('visible');
      contactObserver.unobserve(contactSection);
    }
  }, { threshold: 0.1 });
  contactObserver.observe(contactSection);
}

document.addEventListener('DOMContentLoaded', () => {
  const scrollBtn = document.getElementById('scrollTop');

  // Show/hide button on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      scrollBtn.classList.add('visible');
    } else {
      scrollBtn.classList.remove('visible');
    }
  });

  // Smooth scroll to top on click
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});


document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});

