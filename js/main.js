
(function () {
  'use strict';

  gsap.registerPlugin(ScrollTrigger);

  /* ── Hamburger ── */
  const btn  = document.getElementById('hamburger');
  const menu = document.getElementById('mob-menu');

  if (btn && menu) {
    btn.addEventListener('click', toggleMenu);
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
    document.addEventListener('click', e => {
      if (menu.dataset.open === 'true' && !menu.contains(e.target) && !btn.contains(e.target)) closeMenu();
    });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
  }

  function toggleMenu() {
    const open = menu.dataset.open !== 'true';
    setMenu(open);
  }

  function closeMenu() { setMenu(false); }

  function setMenu(open) {
    menu.dataset.open = open;
    btn.dataset.open  = open;
    document.body.style.overflow = open ? 'hidden' : '';
    btn.setAttribute('aria-expanded', open);

    // Tailwind JIT can't do runtime state — drive via data attrs read by inline style
    if (open) {
      menu.style.opacity   = '1';
      menu.style.transform = 'translateY(0)';
      menu.style.pointerEvents = 'auto';
      // animate bars
      const bars = btn.querySelectorAll('[data-bar]');
      bars[0].style.transform = 'translateY(6.5px) rotate(45deg)';
      bars[1].style.opacity   = '0';
      bars[2].style.transform = 'translateY(-6.5px) rotate(-45deg)';
    } else {
      menu.style.opacity   = '0';
      menu.style.transform = 'translateY(-8px)';
      menu.style.pointerEvents = 'none';
      const bars = btn.querySelectorAll('[data-bar]');
      bars[0].style.transform = '';
      bars[1].style.opacity   = '';
      bars[2].style.transform = '';
    }
  }

  /* ── Scroll reveals ── */
  gsap.utils.toArray('.reveal').forEach(el => {
    gsap.to(el, { opacity: 1, y: 0, duration: 0.85, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 88%' } });
  });

  gsap.utils.toArray('.reveal-sm').forEach((el, i) => {
    gsap.to(el, { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out',
      delay: (i % 4) * 0.05,
      scrollTrigger: { trigger: el, start: 'top 93%' } });
  });

  gsap.utils.toArray('.proj-card').forEach((card, i) => {
    gsap.to(card, { opacity: 1, y: 0, duration: 0.78, ease: 'power2.out',
      delay: i * 0.07,
      scrollTrigger: { trigger: card, start: 'top 88%' } });
  });

  /* ── Hero entrances ── */
  const eyebrow = document.getElementById('hero-eyebrow');
  const h1idx   = document.getElementById('hero-h1');
  if (eyebrow) gsap.from(eyebrow, { opacity: 0, y: 14, duration: 0.65, delay: 0.2,  ease: 'power2.out' });
  if (h1idx)   gsap.from(h1idx,   { opacity: 0, y: 40, duration: 1.0,  delay: 0.38, ease: 'power3.out' });

  const wBrowser = document.getElementById('work-browser');
  const wH1      = document.getElementById('work-h1');
  if (wBrowser) gsap.from(wBrowser, { opacity: 0, y: 32, duration: 0.95, delay: 0.25, ease: 'power3.out' });
  if (wH1)      gsap.from(wH1,      { opacity: 0, y: 24, duration: 0.80, delay: 0.45, ease: 'power3.out' });

})();
