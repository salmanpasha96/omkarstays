// animations.js — GSAP micro animations and global scroll reveal
const addRevealEffects = () => {
  const elements = document.querySelectorAll('.page-hero, .section-title, .lead-soft, .feature-card, .stat-box, .info-card, .content-panel, .mini-card, .contact-panel, .test-card, .gallery-item, .gallery-thumb, .btn-accent, .tag, .hero-title, .hero-sub, .hero-ctas, .navbar-brand, .nav-link');

  elements.forEach((el, index) => {
    el.classList.add('reveal');
    const delayClass = ['reveal-delay-1', 'reveal-delay-2', 'reveal-delay-3', 'reveal-delay-4', 'reveal-delay-5'][index % 5];
    el.classList.add(delayClass);
  });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -30px 0px' });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
  }
};

document.addEventListener('DOMContentLoaded', () => {
  addRevealEffects();

  const pageHero = document.querySelector('.page-hero, .hero-section');
  if (pageHero) {
    const onScroll = () => {
      const offset = window.scrollY * 0.15;
      pageHero.style.transform = `translateY(${offset}px)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  if (window.gsap) {
    gsap.from('.hero-title', { y: 40, opacity: 0, duration: 1.1, delay: 0.25, ease: 'power3.out' });
    gsap.from('.hero-sub', { y: 20, opacity: 0, duration: 1, delay: 0.5, ease: 'power3.out' });
    gsap.from('.hero-ctas .btn', { y: 20, opacity: 0, stagger: 0.12, duration: 0.8, delay: 0.7, ease: 'power2.out' });

    const floats = document.querySelectorAll('.float-leaf');
    floats.forEach((el, i) => {
      gsap.to(el, { y: 18, repeat: -1, yoyo: true, ease: 'sine.inOut', duration: 3 + Math.random() * 2, delay: i * 0.2 });
    });
  }
});
