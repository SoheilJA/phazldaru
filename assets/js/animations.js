/* ============================================================
   assets/js/animations.js — انیمیشن‌های مشترک GSAP/ScrollTrigger
   و شمارنده‌های Anime.js. این فایل بعد از اسکریپت‌های صفحه
   لود می‌شود تا کارت‌های رندرشده با JS هم پوشش داده شوند.
============================================================ */
window.FDAnim = (function () {
  'use strict';

  var RM = window.matchMedia('(prefers-reduced-motion: reduce)');
  var EASE = 'power3.out';
  if (window.gsap && window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

  /* ---------- ریویل‌های اسکرول (fade + ۲۴px rise) ---------- */
  function reveals() {
    if (!window.gsap || !window.ScrollTrigger) return;
    if (RM.matches) return; /* همه‌چیز بدون انیمیشن و مرئی می‌ماند */

    gsap.utils.toArray('[data-reveal]').forEach(function (el) {
      var delay = parseFloat(el.getAttribute('data-reveal-delay') || 0);
      gsap.fromTo(el,
        { y: 26, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: EASE, delay: delay,
          scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
    });

    gsap.utils.toArray('[data-reveal-group]').forEach(function (group) {
      var kids = group.querySelectorAll('[data-reveal-child]');
      var targets = kids.length ? kids : group.children; /* fallback: فرزندان مستقیم */
      if (!targets || !targets.length) return;
      gsap.fromTo(targets,
        { y: 26, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: EASE, stagger: 0.08,
          scrollTrigger: { trigger: group, start: 'top 85%', once: true } });
    });
  }

  /* ---------- اینتروی صفحات داخلی (هیروی about/projects/contact) ---------- */
  function pageIntro() {
    var els = document.querySelectorAll('[data-page-intro]');
    if (!els.length || !window.gsap || RM.matches) return;
    var targets = els;
    if (els.length === 1 && els[0].children.length > 1) targets = els[0].children;
    gsap.fromTo(targets, { y: 22, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: EASE, stagger: 0.09, delay: 0.1 });
  }

  /* ---------- شمارنده‌ها (Anime.js + بومی‌سازی ارقام) ---------- */
  function counters() {
    var els = document.querySelectorAll('[data-counter]');
    if (!els.length || !window.anime) return;

    function fmt(el, v) {
      var fa = document.documentElement.lang === 'fa';
      var n = String(v);
      if (fa && window.FDI18N) n = FDI18N.digits(n);
      var suffix = el.getAttribute('data-suffix') || '';
      /* فارسی: «+۵۰» — انگلیسی: "50+" (داخل بگشھ dir="ltr") */
      return fa ? (suffix + n) : (n + suffix);
    }
    els.forEach(function (el) {
      var target = parseFloat(el.getAttribute('data-counter'));
      var done = false;
      function finish() { done = true; el.textContent = fmt(el, target); }
      if (RM.matches) { finish(); return; }

      var io = new IntersectionObserver(function (entries) {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        var obj = { v: 0 };
        anime({
          targets: obj, v: target, duration: 1800, easing: 'easeOutExpo', round: 1,
          update: function () { el.textContent = fmt(el, Math.round(obj.v)); },
          complete: finish
        });
      }, { threshold: 0.4 });
      io.observe(el);

      /* بازرندر ارقام هنگام تغییر زبان (اگر شمارش تمام شده) */
      el._fdCounterRender = function () { if (done) finish(); };
    });

    window.addEventListener('fd:langchange', function () {
      els.forEach(function (el) { if (el._fdCounterRender) el._fdCounterRender(); });
    });
  }

  /* ---------- اسکراب متن بیانیه (کلمه‌به‌کلمه از خاکستری‌آبی به سرمه‌ای) ---------- */
  var stTween = null;
  function initStatement() {
    var holder = document.querySelector('[data-statement]');
    if (!holder) return;
    var textEl = holder.querySelector('[data-statement-text]');
    if (!textEl) return;

    /* حذف انیمیشن قبلی */
    if (stTween) {
      if (stTween.scrollTrigger) stTween.scrollTrigger.kill();
      stTween.kill();
      stTween = null;
    }

    var text = (textEl.textContent || '').trim();
    if (!text) return;
    textEl.innerHTML = text.split(/\s+/).map(function (w) {
      return '<span class="fd-word">' + w + '</span>';
    }).join(' ');
    var words = textEl.querySelectorAll('.fd-word');

    if (!window.gsap) return;
    if (RM.matches || holder.getAttribute('data-revealed') === '1') {
      gsap.set(words, { color: '#0A1F44' });
      return;
    }
    gsap.set(words, { color: '#9BB0CC' });
    stTween = gsap.to(words, {
      color: '#0A1F44', stagger: 0.08, ease: 'none',
      scrollTrigger: {
        trigger: holder, start: 'top 78%', end: 'top 30%', scrub: 0.6,
        onUpdate: function (st) {
          if (st.progress > 0.985) holder.setAttribute('data-revealed', '1');
        }
      }
    });
  }
  window.addEventListener('fd:langchange', function () {
    var holder = document.querySelector('[data-statement]');
    if (holder) {
      var r = holder.getBoundingClientRect();
      /* اگر از آن عبور کرده‌ایم، حالت نهایی را قفل کن */
      if (r.top < window.innerHeight * 0.4) holder.setAttribute('data-revealed', '1');
    }
    initStatement();
  });

  /* ---------- دکمه‌های مغناطیسی ---------- */
  function magnetic() {
    if (RM.matches || !window.gsap) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;
    document.querySelectorAll('[data-magnetic]').forEach(function (btn) {
      var xTo = gsap.quickTo(btn, 'x', { duration: 0.4, ease: 'power3' });
      var yTo = gsap.quickTo(btn, 'y', { duration: 0.4, ease: 'power3' });
      btn.addEventListener('pointermove', function (e) {
        if (e.pointerType && e.pointerType !== 'mouse') return;
        var r = btn.getBoundingClientRect();
        xTo((e.clientX - r.left - r.width / 2) * 0.22);
        yTo((e.clientY - r.top - r.height / 2) * 0.3);
      });
      btn.addEventListener('pointerleave', function () { xTo(0); yTo(0); });
    });
  }

  /* ---------- پارالاکس ملایم [data-float] (کارت‌های آمار هیرو) ---------- */
  function floatParallax() {
    if (!window.gsap || !window.ScrollTrigger || RM.matches) return;
    gsap.utils.toArray('[data-float]').forEach(function (el) {
      gsap.to(el, {
        y: -20, ease: 'none',
        scrollTrigger: {
          trigger: el.closest('section') || el,
          start: 'top bottom', end: 'bottom top', scrub: 0.8
        }
      });
    });
  }

  /* ---------- خطِ در حال رشد (تایم‌لاین درباره ما) ---------- */
  function lineGrow() {
    var els = Array.prototype.slice.call(document.querySelectorAll('[data-line-grow]'));
    if (!els.length || !window.gsap) return;
    if (RM.matches) { gsap.set(els, { scaleX: 1 }); return; }
    els.forEach(function (el) {
      gsap.fromTo(el, { scaleX: 0 }, {
        scaleX: 1, duration: 1.2, ease: 'power2.inOut',
        scrollTrigger: { trigger: el.parentElement || el, start: 'top 85%', once: true }
      });
    });
  }

  /* ---------- افت پین‌های نقشه (تماس) — بدون دست‌زدن به transform اصلی SVG ---------- */
  function drops() {
    if (!window.gsap || RM.matches) return;
    gsap.utils.toArray('[data-drop]').forEach(function (el, i) {
      /* مختصات پایه از attribute خوانده می‌شود تا GSAP جای پین‌ها را خراب نکند */
      var base = el.getAttribute('transform') || '';
      var m = /translate\(\s*([-\d.]+)[ ,]*([-\d.]+)?/.exec(base);
      var bx = m ? parseFloat(m[1]) : 0;
      var by = (m && m[2] !== undefined) ? parseFloat(m[2]) : 0;
      var proxy = { dy: -28, o: 0 };
      gsap.to(proxy, {
        dy: 0, o: 1, duration: 0.7, ease: 'power3.out', delay: i * 0.18,
        scrollTrigger: { trigger: el.closest('svg') || el, start: 'top 85%', once: true },
        onUpdate: function () {
          el.setAttribute('transform', 'translate(' + bx + ',' + (by + proxy.dy) + ')');
          el.setAttribute('opacity', String(proxy.o));
        }
      });
    });
  }

  /* ---------- مقداردهی ---------- */
  reveals();
  pageIntro();
  counters();
  initStatement();
  magnetic();
  floatParallax();
  lineGrow();
  drops();

  /* بازمحاسبه‌ی ScrollTrigger پس از لود کامل (فونت‌ها و چیدمان) */
  window.addEventListener('load', function () {
    if (window.ScrollTrigger) ScrollTrigger.refresh();
  });

  return {
    refresh: function () { if (window.ScrollTrigger) ScrollTrigger.refresh(); }
  };
})();