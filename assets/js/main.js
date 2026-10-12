/* ============================================================
   assets/js/main.js — رفتارهای مشترک همه صفحات:
   نوار پیشرفت اسکرول، رفتار نوبار، منوی موبایل، سوییچ زبان،
   سال کپی‌رایت، ترنزیشن بین صفحات، داک موبایل، نشانگر سفارشی.
============================================================ */
(function () {
  'use strict';

  var RM = window.matchMedia('(prefers-reduced-motion: reduce)');
  var header = document.getElementById('fd-header');
  var progress = document.getElementById('fd-progress');
  var dock = document.getElementById('fd-dock');
  var menu = document.getElementById('fd-menu');
  var burger = document.getElementById('fd-burger');
  var lastY = window.scrollY || 0;
  var menuOpen = false, footerVisible = false, ticking = false;

  /* ---------- اسکرول (با throttle راف) ---------- */
  function update() {
    ticking = false;
    var y = window.scrollY || document.documentElement.scrollTop || 0;
    var h = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.style.transform = 'scaleX(' + (h > 0 ? Math.min(y / h, 1) : 0) + ')';

    if (header) {
      header.classList.toggle('is-solid', y > 24);
      if (!menuOpen && y > 160 && y > lastY + 4) header.classList.add('is-hidden');
      else if (y < lastY - 4 || y <= 160) header.classList.remove('is-hidden');
    }
    if (dock) dock.classList.toggle('is-in', y > 480 && !footerVisible && !menuOpen);
    lastY = y;
  }
  window.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  }, { passive: true });
  update();

  /* ---------- مخفی‌کردن داک نزدیک فوتر ---------- */
  var footer = document.querySelector('footer');
  if (footer && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      footerVisible = entries[0].isIntersecting;
      if (dock) dock.classList.toggle('is-in', !footerVisible && (window.scrollY || 0) > 480 && !menuOpen);
    }, { threshold: 0.08 }).observe(footer);
  }

  /* ---------- منوی موبایل (کلئوگرافی GSAP) ---------- */
  var menuTl = null;

  function buildMenuTl() {
    if (!window.gsap) return null;
    var tl = gsap.timeline({
      paused: true,
      onReverseComplete: function () { if (menu) menu.classList.remove('is-open'); }
    });
    tl.fromTo(menu, { opacity: 0 }, { opacity: 1, duration: 0.28, ease: 'power2.out' }, 0)
      .fromTo('.fd-menu-panel', { y: 26, opacity: 0 }, { y: 0, opacity: 1, duration: 0.42, ease: 'power3.out' }, 0)
      .fromTo('.fd-menu-link', { y: 26, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out', stagger: 0.07 }, 0.12)
      .fromTo('.fd-menu-foot > *', { y: 14, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.4, ease: 'power3.out', stagger: 0.08 }, 0.3);
    return tl;
  }

  function openMenu() {
    if (!menu) return;
    menuOpen = true;
    menu.classList.add('is-open');
    if (burger) burger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    if (window.gsap && !RM.matches) {
      if (!menuTl) menuTl = buildMenuTl();
      if (menuTl) menuTl.progress(0).play();
    }
    var first = menu.querySelector('.fd-menu-link');
    if (first) window.setTimeout(function () { first.focus(); }, 80);
  }

  function closeMenu() {
    if (!menu || !menuOpen) return;
    menuOpen = false;
    if (burger) burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    if (menuTl && window.gsap && !RM.matches) {
      menuTl.reverse();
    } else if (menu) {
      menu.classList.remove('is-open');
    }
    if (burger) burger.focus();
  }

  if (burger) burger.addEventListener('click', function () { menuOpen ? closeMenu() : openMenu(); });

  if (menu) {
    menu.querySelectorAll('[data-menu-close]').forEach(function (el) {
      el.addEventListener('click', closeMenu);
    });
    menu.querySelectorAll('.fd-menu-link').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });
    /* تله‌ی فوکوس + ESC داخل منو */
    menu.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { e.preventDefault(); closeMenu(); return; }
      if (e.key === 'Tab') {
        var f = menu.querySelectorAll('a[href], button:not([disabled])');
        if (!f.length) return;
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
  }
  /* ESC سراسری (وقتی فوکوس بیرون از منو است) */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menuOpen) { e.preventDefault(); closeMenu(); }
  });
  /* بستن منو هنگام بزرگ‌شدن نمایشگر به دسکتاپ */
  window.addEventListener('resize', function () {
    if (menuOpen && window.innerWidth >= 1024) closeMenu();
  });

  /* ---------- دکمه‌های تغییر زبان (نوبار + منو + داک) ---------- */
  function refreshLangButtons() {
    var label = (document.documentElement.lang === 'fa') ? 'EN' : '\u0641\u0627';
    document.querySelectorAll('.fd-lang-btn').forEach(function (btn) {
      btn.textContent = label;
    });
  }
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.fd-lang-btn');
    if (!btn) return;
    var next = (document.documentElement.lang === 'fa') ? 'en' : 'fa';
    if (window.FDI18N) FDI18N.setLang(next);
  });
  window.addEventListener('fd:langchange', refreshLangButtons);
  refreshLangButtons();

  /* ---------- سال کپی‌رایت (با ارقام بومی‌سازی‌شده) ---------- */
  function refreshYear() {
    var el = document.getElementById('fd-year');
    if (!el) return;
    var y = String(new Date().getFullYear());
    el.textContent = (window.FDI18N && document.documentElement.lang === 'fa') ? FDI18N.digits(y) : y;
  }
  window.addEventListener('fd:langchange', refreshYear);
  refreshYear();

  /* ---------- ترنزیشن بین صفحات (قابل رد شدن با prefers-reduced-motion) ---------- */
  var veil = document.getElementById('fd-transition');

  function goTo(href) {
    if (RM.matches || !window.gsap || !veil) {
      window.location.href = href;
      return;
    }
    try { sessionStorage.setItem('fd-nav', '1'); } catch (e) { /* ignore */ }
    gsap.to(veil, {
      opacity: 1, duration: 0.26, ease: 'power2.in',
      onComplete: function () { window.location.href = href; }
    });
  }

  document.addEventListener('click', function (e) {
    if (e.defaultPrevented || e.button !== 0) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var a = e.target.closest('a');
    if (!a || !a.getAttribute('href')) return;
    if (a.target === '_blank' || a.hasAttribute('download')) return;
    var href = a.getAttribute('href');
    if (!href || href.charAt(0) === '#' ||
        /^(mailto:|tel:|javascript:|data:)/i.test(href)) return;
    var url;
    try { url = new URL(a.href, window.location.href); } catch (err) { return; }
    if (url.origin !== window.location.origin) return;
    /* لینک داخلیِ همان صفحه (لنگر یا خودِ صفحه) — رفتار پیش‌فرض */
    if (url.pathname === window.location.pathname && url.search === window.location.search) return;
    e.preventDefault();
    goTo(url.href);
  });

  window.addEventListener('pageshow', function (e) {
    if (!veil) return;
    var arrived = false;
    try { arrived = sessionStorage.getItem('fd-nav') === '1'; } catch (err) { /* ignore */ }
    if (e.persisted || arrived) {
      try { sessionStorage.removeItem('fd-nav'); } catch (err) { /* ignore */ }
      if (window.gsap && !RM.matches) {
        gsap.fromTo(veil, { opacity: 1 }, { opacity: 0, duration: 0.4, ease: 'power2.out' });
      } else {
        veil.style.opacity = '0';
      }
    }
  });

  /* ---------- نشانگر اسکرول هیرو ---------- */
  var cue = document.getElementById('fd-scroll-cue');
  if (cue) {
    cue.addEventListener('click', function () {
      var hero = cue.closest('section');
      var next = hero ? hero.nextElementSibling : null;
      if (next) next.scrollIntoView({ behavior: RM.matches ? 'auto' : 'smooth' });
    });
  }

  /* ---------- نشانگر سفارشی (فقط دسکتاپ / pointer:fine) ---------- */
  function initCursor() {
    if (RM.matches || !window.gsap) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;

    var el = document.createElement('div');
    el.id = 'fd-cursor';
    el.setAttribute('aria-hidden', 'true');
    el.innerHTML = '<div class="fd-cursor-ring"></div><div class="fd-cursor-dot"></div>';
    document.body.appendChild(el);
    document.body.classList.add('fd-has-cursor');

    /* مخفی‌کردن نشانگر بومی فقط وقتی حلقه فعال است */
    var style = document.createElement('style');
    style.textContent = 'body.fd-has-cursor, body.fd-has-cursor a, body.fd-has-cursor button, ' +
      'body.fd-has-cursor input, body.fd-has-cursor textarea, body.fd-has-cursor select, ' +
      'body.fd-has-cursor [role="button"] { cursor: none; }';
    document.head.appendChild(style);

    var xTo = gsap.quickTo(el, 'x', { duration: 0.25, ease: 'power3' });
    var yTo = gsap.quickTo(el, 'y', { duration: 0.25, ease: 'power3' });
    window.addEventListener('pointermove', function (e) {
      if (e.pointerType && e.pointerType !== 'mouse') return;
      xTo(e.clientX);
      yTo(e.clientY);
    }, { passive: true });
    document.addEventListener('pointerover', function (e) {
      var hit = e.target.closest('a, button, [role="button"], .fd-chip, input, textarea, select');
      el.classList.toggle('is-hover', !!hit);
    });
  }
  initCursor();
})();