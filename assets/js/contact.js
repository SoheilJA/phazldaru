/* ============================================================
   assets/js/contact.js — صفحه تماس:
   اعتبارسنجی فرم + حالت‌ها، دکمه‌های کپی، بارگذاری تنبل نقشه.
============================================================ */
(function () {
  'use strict';

  var RM = window.matchMedia('(prefers-reduced-motion: reduce)');
  var t = function (key) { return window.FDI18N ? FDI18N.t(key) : key; };

  /* ---------- دکمه‌های کپی (نشانی / ایمیل) ---------- */
  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }
    /* جایگزین برای مرورگرهای قدیمی */
    return new Promise(function (resolve, reject) {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy') ? resolve() : reject(new Error('copy failed')); }
      catch (e) { reject(e); }
      document.body.removeChild(ta);
    });
  }

  function flashCopied(btn) {
    var span = btn.querySelector('span');
    if (!span) return;
    var original = span.textContent;
    btn.classList.add('is-copied');
    span.textContent = t('contact.copied');
    window.setTimeout(function () {
      btn.classList.remove('is-copied');
      span.textContent = original || t('contact.copy');
    }, 2000);
  }

  document.querySelectorAll('[data-copy-key]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var text = window.FDI18N ? FDI18N.t(btn.getAttribute('data-copy-key')) : '';
      copyText(text).then(function () { flashCopied(btn); }).catch(function () { /* بی‌صدا */ });
    });
  });
  document.querySelectorAll('[data-copy-text]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      copyText(btn.getAttribute('data-copy-text'))
        .then(function () { flashCopied(btn); }).catch(function () { /* بی‌صدا */ });
    });
  });

  /* ---------- فرم تماس ---------- */
  var form = document.getElementById('fd-contact-form');
  var successPanel = document.getElementById('fd-form-success');
  var submitBtn = document.getElementById('cf-submit');

  function setFieldError(input, message) {
    var field = input.closest('.fd-field');
    var err = document.getElementById(input.id + '-err');
    if (err) err.textContent = message || '';
    if (field) field.classList.toggle('is-error', !!message);
  }

  function clearErrors() {
    ['cf-name', 'cf-email', 'cf-message'].forEach(function (id) {
      var input = document.getElementById(id);
      if (input) setFieldError(input, '');
    });
  }

  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function validate() {
    var name = document.getElementById('cf-name');
    var email = document.getElementById('cf-email');
    var message = document.getElementById('cf-message');
    var ok = true;

    if (!name.value.trim() || name.value.trim().length < 2) {
      setFieldError(name, t('contact.errName')); ok = false;
    } else setFieldError(name, '');

    if (!email.value.trim()) {
      setFieldError(email, t('contact.errEmailEmpty')); ok = false;
    } else if (!EMAIL_RE.test(email.value.trim())) {
      setFieldError(email, t('contact.errEmailInvalid')); ok = false;
    } else setFieldError(email, '');

    if (!message.value.trim() || message.value.trim().length < 10) {
      setFieldError(message, t('contact.errMsg')); ok = false;
    } else setFieldError(message, '');

    return ok;
  }

  /* ============================================================
     PLACEHOLDER — تابع ارسال به بک‌اند. بدنه را با fetch واقعی
     جای‌گزین کنید. نمونه:
       async function submitContactForm(data){
         const res = await fetch('https://example.com/api/contact', {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify(data)
         });
         if (!res.ok) throw new Error('Request failed');
         return res.json();
       }
  ============================================================ */
  async function submitContactForm(data) {
    /* فعلاً بک‌اند وجود ندارد — موفقیت شبیه‌سازی می‌شود */
    await new Promise(function (resolve) { window.setTimeout(resolve, 1200); });
    return { ok: true };
  }

  /* آماده‌سازی چک‌مارک (قبل از نمایش مخفی می‌شود) */
  function primeCheck(el) {
    if (!el || !el.getTotalLength) return;
    try {
      var len = el.getTotalLength();
      el.setAttribute('stroke-dasharray', len);
      el.setAttribute('stroke-dashoffset', len);
    } catch (e) { /* ignore */ }
  }
  primeCheck(document.getElementById('fd-check-circle'));
  primeCheck(document.getElementById('fd-check-path'));

  function showSuccess() {
    if (form) form.classList.add('hidden');
    if (!successPanel) return;
    successPanel.classList.remove('hidden');
    successPanel.setAttribute('tabindex', '-1');
    successPanel.focus({ preventScroll: false });
    if (window.anime && !RM.matches) {
      anime({ targets: '#fd-check-circle',
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeInOutSine', duration: 700 });
      anime({ targets: '#fd-check-path',
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeInOutSine', duration: 450, delay: 450 });
      anime({ targets: '#fd-form-success', scale: [0.96, 1], opacity: [0, 1],
        duration: 500, easing: 'easeOutExpo' });
    }
  }

  function setLoading(loading) {
    if (!submitBtn) return;
    submitBtn.classList.toggle('is-loading', loading);
    submitBtn.disabled = loading;
    var label = submitBtn.querySelector('.fd-btn-label');
    if (label) label.textContent = loading ? t('contact.sending') : t('contact.submit');
  }

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      clearErrors();

      if (!validate()) {
        if (window.anime && !RM.matches) {
          anime({
            targets: form.querySelectorAll('.fd-field.is-error input, .fd-field.is-error textarea'),
            translateX: [0, -6, 6, -3, 0], duration: 350, easing: 'easeInOutSine'
          });
        }
        return;
      }

      /* تله ربات (honeypot): اگر پر شده باشد، بی‌صدا «موفق» می‌شویم */
      var hp = document.getElementById('cf-hp');
      if (hp && hp.value) { showSuccess(); return; }

      var data = {
        name: document.getElementById('cf-name').value.trim(),
        email: document.getElementById('cf-email').value.trim(),
        message: document.getElementById('cf-message').value.trim(),
        locale: document.documentElement.lang,
        page: window.location.pathname
      };

      setLoading(true);
      submitContactForm(data)
        .then(function () { setLoading(false); showSuccess(); })
        .catch(function () {
          setLoading(false);
          setFieldError(document.getElementById('cf-message'), t('contact.errGeneric'));
        });
    });

    /* اعتبارسنجی مجدد بعد از اولین خطا */
    ['cf-name', 'cf-email', 'cf-message'].forEach(function (id) {
      var input = document.getElementById(id);
      if (!input) return;
      input.addEventListener('blur', function () {
        var field = input.closest('.fd-field');
        if (field && field.classList.contains('is-error')) validate();
      });
    });

    /* ارسال پیام جدید */
    var again = document.getElementById('fd-form-again');
    if (again) {
      again.addEventListener('click', function () {
        form.reset();
        clearErrors();
        successPanel.classList.add('hidden');
        form.classList.remove('hidden');
        var first = document.getElementById('cf-name');
        if (first) first.focus();
      });
    }
  }

  /* ---------- بارگذاری تنبل نقشه تعاملی (OSM) ---------- */
  var mapLoad = document.getElementById('fd-map-load');
  var mapArt = document.getElementById('fd-map-art');
  if (mapLoad && mapArt) {
    mapLoad.addEventListener('click', function () {
      var holder = mapArt.parentElement;
      /* PLACEHOLDER: محدوده‌ی نیشابور–مشهد؛ در صورت نیاز تنظیم شود */
      var iframe = document.createElement('iframe');
      iframe.className = 'block h-[320px] w-full lg:h-[440px]';
      iframe.setAttribute('title', t('contact.mapAria'));
      iframe.setAttribute('loading', 'lazy');
      iframe.src = 'https://www.openstreetmap.org/export/embed.html?bbox=58.2%2C35.9%2C60.3%2C36.9&layer=mapnik';
      mapArt.remove();
      var actions = mapLoad.closest('.fd-map-actions');
      if (actions) actions.remove();
      holder.appendChild(iframe);
    });
  }
})();