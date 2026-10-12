/* ============================================================
   assets/js/home.js — صفحه اصلی:
   اینتروی هیرو، هاب شرکت‌های زیرمجموعه، کاروسل موبایل،
   ویدئوها + لایت‌باکس.
============================================================ */
(function () {
    'use strict';

    var RM = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (window.gsap && window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

    var t = function (key) { return window.FDI18N ? FDI18N.t(key) : key; };
    var lang = function () { return document.documentElement.lang || 'fa'; };
    var L = function (obj) { return obj[lang()] || obj.fa; };
    var digits = function (s) {
        return (window.FDI18N && lang() === 'fa') ? FDI18N.digits(String(s)) : String(s);
    };

    /* ============================================================
       داده‌ی شرکت‌های زیرمجموعه — URL ها PLACEHOLDER هستند ('#').
       با راه‌اندازی وب‌سایت هر شرکت، مقدار url را جای‌گزین کنید
       (روی لینک «مشاهده وب‌سایت» به‌صورت data-url هم نوشته می‌شود).
    ============================================================ */
    var SUBSIDIARIES = [
        {
            id: 'herbaris', monogram: 'H', latin: 'Herbaris', tint: 'fd-tint-mint', url: '#',
            name: { fa: 'هربریس', en: 'Herbaris' },
            desc: {
                fa: 'تخصص در تولید فرآورده‌های دارویی طبیعی و گیاهی با استانداردهای جهانی.',
                en: 'Specialized in producing natural and herbal pharmaceutical products to global standards.'
            }
        },
        {
            id: 'healthamed', monogram: 'H', latin: 'Healthamed', tint: 'fd-tint-sky', url: '#',
            name: { fa: 'هلثامد', en: 'Healthamed' },
            desc: {
                fa: 'پلتفرم و داروخانه آنلاین در حوزه فروش دارو و ارائه خدمات سلامت.',
                en: 'An online platform and pharmacy for selling medicines and providing health services.'
            }
        },
        {
            id: 'econoris', monogram: 'E', latin: 'Econoris', tint: 'fd-tint-amber', url: '#',
            name: { fa: 'اکونوریس', en: 'Econoris' },
            desc: {
                fa: 'شتاب‌دهنده تخصصی در حوزه دارو و فناوری‌های سلامت.',
                en: 'A specialized accelerator in pharmaceuticals and health technologies.'
            }
        },
        {
            id: 'sanjesh', monogram: 'S', latin: 'Sanjesh Azmay', tint: 'fd-tint-indigo', url: '#',
            name: { fa: 'سنجش آزمای', en: 'Sanjesh Azmay' },
            desc: {
                fa: 'آزمایشگاه کنترل کیفی پیشرفته با تجهیزات مدرن و تیم متخصص.',
                en: 'An advanced quality-control laboratory with modern equipment and a specialist team.'
            }
        },
        {
            id: 'palizkesht', monogram: 'P', latin: 'Palizkesht Fazl', tint: 'fd-tint-teal', url: '#',
            name: { fa: 'پالیز کشت فضل', en: 'Palizkesht Fazl' },
            desc: {
                fa: 'کشت، تولید و فرآوری گیاهان دارویی.',
                en: 'Cultivation, production and processing of medicinal plants.'
            }
        },
        {
            id: 'novin', monogram: 'N', latin: 'Novin Salamat Fazl', tint: 'fd-tint-blue', url: '#',
            name: { fa: 'نوین سلامت فضل', en: 'Novin Salamat Fazl' },
            desc: {
                fa: 'درمانگاه تجهیزشده در جهت ارائه خدمات درمانی و بالینی.',
                en: 'A fully equipped clinic providing medical and clinical services.'
            }
        }
    ];

    /* ============================================================
       داده‌ی ویدئوها — PLACEHOLDER.
       هر مورد را با محتوای واقعی جای‌گزین کنید:
         type: 'mp4'     → url: نشانی مستقیم فایل mp4
         type: 'youtube' → url: شناسه ویدئو (امبد youtube-nocookie)
         type: 'aparat'  → url: هش ویدئو (از لینک اشتراک)
       و `placeholder: true` را حذف کنید.
    ============================================================ */
    var VIDEOS = [
        /* نمونه‌ی واقعی mp4 (ویدئوی آزاد MDN) برای آزمودن مسیر پخش */
        {
            id: 'intro', type: 'mp4', url: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
            duration: '0:14',
            title: { fa: 'معرفی فضل دارو', en: 'Introducing Fazl Daru' },
            desc: {
                fa: 'نگاهی کوتاه به فعالیت‌ها، ماموریت و شرکت‌های گروه فضل دارو.',
                en: 'A brief look at the activities, mission and companies of the Fazl Daru Group.'
            }
        },
        {
            id: 'herbaris', type: 'youtube', url: 'VIDEO_ID', placeholder: true, duration: '3:20',
            title: { fa: 'برند هربریس؛ از طبیعت تا دارو', en: 'Herbaris: from nature to medicine' },
            desc: {
                fa: 'روند تولید فرآورده‌های گیاهی برند هربریس.',
                en: 'The production process behind Herbaris herbal products.'
            }
        },
        {
            id: 'healthamed', type: 'aparat', url: 'VIDEO_HASH', placeholder: true, duration: '2:45',
            title: { fa: 'سلامت دیجیتال با هلثامد', en: 'Digital health with Healthamed' },
            desc: {
                fa: 'معرفی پلتفرم آنلاین سلامت هلثامد.',
                en: 'An introduction to the Healthamed online health platform.'
            }
        },
        {
            id: 'lab', type: 'mp4', url: '', placeholder: true, duration: '4:10',
            title: { fa: 'روزی در آزمایشگاه سنجش آزمای', en: 'A day at the Sanjesh Azmay laboratory' },
            desc: {
                fa: 'نگاهی به آزمون‌های کنترل کیفی در آزمایشگاه سنجش آزمای.',
                en: 'A look at quality-control testing at the Sanjesh Azmay laboratory.'
            }
        },
        {
            id: 'plants', type: 'youtube', url: 'VIDEO_ID', placeholder: true, duration: '5:05',
            title: { fa: 'کشت گیاهان دارویی در پالیز کشت', en: 'Medicinal plant cultivation at Palizkesht' },
            desc: {
                fa: 'از مزرعه تا فرآوری گیاهان دارویی.',
                en: 'From farm to processing of medicinal plants.'
            }
        }
    ];

    /* ریز-پچ CSS: رنگ مونوگرام گره‌ها از متغیر tint ها خوانده شود.
       فقط یک متغیر (--node-fg) تعریف می‌کنیم و خود استایل‌ها را در
       input.css می‌نویسیم تا قانونِ لایه‌نشده، حالت‌های hover/active
       را در کاسکید شکست ندهد. */
    (function injectTintStyle() {
        var s = document.createElement('style');
        s.textContent = '.fd-node-circle{--node-fg:var(--fd-fg,#0B4EA2)}';
        document.head.appendChild(s);
    })();

    /* ---------- اینتروی هیرو: تایم‌لاین GSAP + میکرو تعاملات Anime.js ---------- */
    function heroIntro() {
        if (RM.matches || !window.gsap) return;
        var lines = document.querySelectorAll('.fd-hero .fd-line-inner');
        var tl = gsap.timeline({ defaults: { ease: 'expo.out', duration: 1 } });
        tl.fromTo('#fd-header', { y: -18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, 0.1)
            .fromTo('.fd-hero-badge', { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 0.35)
            .fromTo(lines, { yPercent: 115 }, { yPercent: 0, duration: 1.1, stagger: 0.1 }, 0.45)
            .to('.fd-swash path', { strokeDashoffset: 0, duration: 0.85, ease: 'power2.inOut' }, 1.15)
            .fromTo('.fd-hero-sub', { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, 1.0)
            .fromTo('.fd-hero-ctas .fd-cta', { y: 14, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.7, stagger: 0.08 }, 1.15);

        /* Anime.js: استگر چیپ‌های آمار + پالس نقطه‌ی بج */
        if (window.anime) {
            anime({
                targets: '.fd-hero-stat', translateY: [18, 0], opacity: [0, 1],
                delay: anime.stagger(90, { start: 1050 }), duration: 650, easing: 'easeOutExpo'
            });
            anime({
                targets: '.fd-pulse-dot', scale: [1, 2.3], opacity: [0.7, 0],
                duration: 1700, loop: true, easing: 'easeOutSine'
            });
        }
    }

    /* ---------- محو شدن محتوای هیرو با اسکرول ---------- */
    function heroScrollFade() {
        if (RM.matches || !window.gsap || !window.ScrollTrigger) return;
        gsap.to('[data-hero-fade]', {
            opacity: 0, y: -46, ease: 'none',
            scrollTrigger: { trigger: '.fd-hero', start: 'top top', end: '75% top', scrub: true }
        });
    }

    /* ============================================================
       شرکت‌های زیرمجموعه — هاب دسکتاپ (hub & spoke)
    ============================================================ */
    var hub = document.getElementById('fd-hub');
    var hubLinesGroup = document.getElementById('fd-hub-lines');
    var activeSub = 0;
    var hubBuilt = false;

    function setText(id, val) {
        var el = document.getElementById(id);
        if (el) el.textContent = val;
    }

    function hubNodePositions() {
        /* ۶ گره روی دایره در فضای viewBox ۶۰۰×۶۰۰ (کانتینر aspect-square) */
        return SUBSIDIARIES.map(function (s, i) {
            var angle = (-90 + i * 60) * Math.PI / 180;
            var r = 240, cx = 300, cy = 300;
            var x = cx + r * Math.cos(angle), y = cy + r * Math.sin(angle);
            return { x: x, y: y, px: x / 6, py: y / 6 };
        });
    }

    function buildHub() {
        if (!hub || !hubLinesGroup || hubBuilt) return;
        hubBuilt = true;

        var pos = hubNodePositions();
        var svgNS = 'http://www.w3.org/2000/svg';

        /* خطوط اتصال (با dashoffset برای انیمیشن ترسیم) */
        hubLinesGroup.innerHTML = '';
        pos.forEach(function (p, i) {
            var line = document.createElementNS(svgNS, 'line');
            line.setAttribute('x1', 300); line.setAttribute('y1', 300);
            line.setAttribute('x2', p.x); line.setAttribute('y2', p.y);
            line.setAttribute('class', 'fd-hub-line');
            line.setAttribute('data-idx', i);
            var len = Math.sqrt(Math.pow(p.x - 300, 2) + Math.pow(p.y - 300, 2));
            line.style.strokeDasharray = len;
            line.style.strokeDashoffset = len;
            hubLinesGroup.appendChild(line);
        });

        /* گره‌ها */
        SUBSIDIARIES.forEach(function (s, i) {
            var btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'fd-hub-node';
            btn.setAttribute('data-idx', i);
            btn.style.left = pos[i].px + '%';
            btn.style.top = pos[i].py + '%';
            btn.setAttribute('aria-label', L(s.name));
            btn.innerHTML =
                '<span class="fd-node-circle ' + s.tint + '">' + s.monogram + '</span>' +
                '<span class="fd-node-name">' + L(s.name) + '</span>';
            hub.appendChild(btn);
        });

        /* تعاملات گره */
        hub.querySelectorAll('.fd-hub-node').forEach(function (node) {
            var idx = parseInt(node.getAttribute('data-idx'), 10);
            node.addEventListener('pointerenter', function () { setActive(idx, true); });
            node.addEventListener('focus', function () { setActive(idx, true); });
            node.addEventListener('click', function () { setActive(idx, true); });
        });

        /* تیلت سه‌بعدی ریز روی لوگوی مرکز (بدون Three.js) */
        var center = document.getElementById('fd-hub-center');
        if (center && window.gsap && !RM.matches) {
            var mark = center.querySelector('svg');
            if (mark) {
                gsap.set(center, { perspective: 400 });
                var rx = gsap.quickTo(mark, 'rotationX', { duration: 0.5, ease: 'power3' });
                var ry = gsap.quickTo(mark, 'rotationY', { duration: 0.5, ease: 'power3' });
                hub.addEventListener('pointermove', function (e) {
                    if (e.pointerType && e.pointerType !== 'mouse') return;
                    var r = hub.getBoundingClientRect();
                    var nx = (e.clientX - r.left) / r.width - 0.5;
                    var ny = (e.clientY - r.top) / r.height - 0.5;
                    ry(nx * 14);
                    rx(-ny * 10);
                });
                hub.addEventListener('pointerleave', function () { rx(0); ry(0); });
            }
        }
    }

    function setActive(idx, animate) {
        activeSub = idx;
        var s = SUBSIDIARIES[idx];
        if (!s || !hub) return;

        hub.querySelectorAll('.fd-hub-node').forEach(function (n) {
            n.classList.toggle('is-active', parseInt(n.getAttribute('data-idx'), 10) === idx);
        });
        if (hubLinesGroup) {
            hubLinesGroup.querySelectorAll('.fd-hub-line').forEach(function (l) {
                l.classList.toggle('is-active', parseInt(l.getAttribute('data-idx'), 10) === idx);
            });
        }

        var mono = document.getElementById('fd-hd-mono');
        if (mono) {
            mono.className = 'fd-sub-mono ' + s.tint +
                ' flex h-14 w-14 items-center justify-center rounded-2xl text-xl font-extrabold';
            mono.textContent = s.monogram;
        }
        setText('fd-hd-name', L(s.name));
        setText('fd-hd-latin', s.latin);
        setText('fd-hd-desc', L(s.desc));
        var link = document.getElementById('fd-hd-link');
        if (link) {
            link.setAttribute('href', s.url || '#');
            link.setAttribute('data-url', s.url || '#');
        }

        if (animate !== false && window.gsap && !RM.matches) {
            gsap.fromTo('#fd-hub-detail', { opacity: 0.35 }, { opacity: 1, duration: 0.4, ease: 'power2.out' });
        }
    }

    /* ترسیم خطوط + ظهور گره‌ها هنگام ورود بخش به دید (فقط یک‌بار) */
    function hubEntrance() {
        if (!hub || !hubBuilt || RM.matches || !window.gsap) return;
        var lines = hubLinesGroup.querySelectorAll('.fd-hub-line');
        var nodes = hub.querySelectorAll('.fd-hub-node');
        if (lines.length) {
            gsap.to(lines, {
                strokeDashoffset: 0, duration: 1.1, ease: 'power2.inOut', stagger: 0.12,
                scrollTrigger: { trigger: hub, start: 'top 80%', once: true }
            });
        }
        if (nodes.length) {
            gsap.fromTo(nodes, { scale: 0.6, opacity: 0 }, {
                scale: 1, opacity: 1, duration: 0.7, ease: 'power3.out', stagger: 0.09,
                clearProps: 'transform',
                scrollTrigger: { trigger: hub, start: 'top 80%', once: true }
            });
        }
    }

    /* فقط برچسب‌ها هنگام تغییر زبان به‌روز می‌شوند (خطوط دست‌نخورده می‌مانند) */
    function updateHubText() {
        if (!hub) return;
        hub.querySelectorAll('.fd-hub-node').forEach(function (node) {
            var s = SUBSIDIARIES[parseInt(node.getAttribute('data-idx'), 10)];
            if (!s) return;
            var nameEl = node.querySelector('.fd-node-name');
            if (nameEl) nameEl.textContent = L(s.name);
            node.setAttribute('aria-label', L(s.name));
        });
    }

    /* ---------- کاروسل اسنپ موبایل + نقاط پیشرفت ---------- */
    function renderRail() {
        var rail = document.getElementById('fd-subs-rail');
        var dots = document.getElementById('fd-subs-dots');
        if (!rail) return;

        rail.innerHTML = SUBSIDIARIES.map(function (s) {
            return '' +
                '<article class="fd-sub-card flex w-[78%] shrink-0 snap-center flex-col gap-3 rounded-2xl border border-brand-100 bg-white p-5 sm:w-[52%]">' +
                '<div class="flex items-center gap-3">' +
                '<span class="fd-sub-mono ' + s.tint + ' flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-lg font-extrabold">' + s.monogram + '</span>' +
                '<div class="min-w-0">' +
                '<h3 class="fd-h3 truncate">' + L(s.name) + '</h3>' +
                '<p class="mt-0.5 truncate text-xs font-medium uppercase tracking-wider text-brand-300" dir="ltr">' + s.latin + '</p>' +
                '</div>' +
                '</div>' +
                '<p class="flex-1 text-sm leading-7 text-slate-500">' + L(s.desc) + '</p>' +
                '<a href="' + (s.url || '#') + '" data-url="' + (s.url || '#') + '" ' +
                'class="inline-flex w-fit items-center gap-1.5 text-sm font-bold text-brand-600 transition-colors hover:text-brand-700">' +
                t('subs.visit') +
                '<svg class="fd-flip h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>' +
                '</a>' +
                '</article>';
        }).join('');

        if (!dots) return;
        dots.innerHTML = SUBSIDIARIES.map(function (s, i) {
            return '<button type="button" role="tab" data-idx="' + i + '" aria-selected="false" ' +
                'aria-label="' + L(s.name) + '" ' +
                'class="h-2.5 w-2.5 rounded-full bg-brand-200 transition-all duration-300"></button>';
        }).join('');

        function markActive(idx) {
            dots.querySelectorAll('[role="tab"]').forEach(function (d, di) {
                d.classList.toggle('w-6', di === idx);
                d.classList.toggle('bg-brand-600', di === idx);
                d.classList.toggle('w-2.5', di !== idx);
                d.classList.toggle('bg-brand-200', di !== idx);
                d.setAttribute('aria-selected', di === idx ? 'true' : 'false');
            });
        }

        dots.querySelectorAll('[role="tab"]').forEach(function (d) {
            d.addEventListener('click', function () {
                var card = rail.children[parseInt(d.getAttribute('data-idx'), 10)];
                if (card) card.scrollIntoView({
                    behavior: RM.matches ? 'auto' : 'smooth',
                    inline: 'center', block: 'nearest'
                });
            });
        });

        /* نقطه فعال با IntersectionObserver (سازگار با RTL) */
        if ('IntersectionObserver' in window) {
            var io = new IntersectionObserver(function (entries) {
                entries.forEach(function (en) {
                    if (en.isIntersecting) {
                        markActive(Array.prototype.indexOf.call(rail.children, en.target));
                    }
                });
            }, { root: rail, threshold: 0.6 });
            Array.prototype.forEach.call(rail.children, function (c) { io.observe(c); });
        }
        markActive(0);
    }

    /* ============================================================
       ویدئوها: ویدئوی منتخب + ریل تصاویر بندانگشتی
    ============================================================ */
    function renderVideos() {
        var featuredSlot = document.getElementById('fd-video-featured');
        var rail = document.getElementById('fd-video-rail');
        if (!featuredSlot || !rail || !VIDEOS.length) return;
        var v = VIDEOS[0];

        featuredSlot.innerHTML =
            '<article class="fd-video-card relative cursor-pointer overflow-hidden rounded-3xl border border-brand-100 bg-white shadow-card" data-video="' + v.id + '">' +
            '<div class="fd-poster relative aspect-video overflow-hidden">' +
            '<span class="fd-play-btn absolute inset-0 m-auto h-16 w-16 lg:h-20 lg:w-20">' +
            '<span class="fd-play-ring" aria-hidden="true"></span>' +
            '<span class="fd-play-core"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13l10.5-6.5z"/></svg></span>' +
            '</span>' +
            '<span class="absolute bottom-3 end-3 z-10 rounded-full bg-brand-900/55 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur" dir="ltr">' + digits(v.duration) + '</span>' +
            '</div>' +
            '<button type="button" class="fd-video-open" data-video="' + v.id + '" aria-label="' + t('videos.play') + ': ' + L(v.title) + '"></button>' +
            '<div class="relative p-5 lg:p-6">' +
            '<p class="text-xs font-bold uppercase tracking-wider text-mint-dark">' + t('videos.featured') + '</p>' +
            '<h3 class="fd-h3 mt-2">' + L(v.title) + '</h3>' +
            '<p class="mt-2 text-sm leading-7 text-slate-500">' + L(v.desc) + '</p>' +
            '</div>' +
            '</article>';

        rail.innerHTML = VIDEOS.map(function (item) {
            return '' +
                '<li class="w-[248px] shrink-0 snap-center lg:w-full">' +
                '<button type="button" class="fd-video-item group flex w-full items-center gap-3 rounded-2xl border border-brand-100 bg-white p-2.5 text-start transition-all duration-300 hover:border-brand-300 hover:shadow-lg" ' +
                'data-video="' + item.id + '" aria-label="' + t('videos.play') + ': ' + L(item.title) + '">' +
                '<span class="fd-poster relative flex aspect-video w-28 shrink-0 items-center justify-center overflow-hidden rounded-xl">' +
                '<svg class="relative z-10 h-6 w-6 text-white/90" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13l10.5-6.5z"/></svg>' +
                '</span>' +
                '<span class="min-w-0 flex-1">' +
                '<span class="block truncate text-sm font-bold text-brand-900">' + L(item.title) + '</span>' +
                '<span class="mt-1 block text-xs font-medium text-slate-400" dir="ltr">' + digits(item.duration) + '</span>' +
                '</span>' +
                '<svg class="fd-flip h-4 w-4 shrink-0 text-brand-300 transition-colors group-hover:text-brand-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>' +
                '</button>' +
                '</li>';
        }).join('');
    }

    /* ---------- لایت‌باکس (تزریق تنبل پخش‌کننده) ---------- */
    var modal = document.getElementById('fd-video-modal');
    var playerBox = document.getElementById('fd-vm-player');
    var lastFocus = null;

    function videoById(id) {
        for (var i = 0; i < VIDEOS.length; i++) if (VIDEOS[i].id === id) return VIDEOS[i];
        return null;
    }

    function injectPlayer(v) {
        playerBox.innerHTML = '';
        var label = L(v.title);
        if (!v.placeholder && v.type === 'mp4' && v.url) {
            playerBox.innerHTML = '<video controls playsinline preload="metadata" src="' + v.url +
                '" class="h-full w-full rounded-2xl bg-black"></video>';
            var vid = playerBox.querySelector('video');
            var p = vid.play();
            if (p && p.catch) p.catch(function () { /* autoplay ممکن است بلاک باشد */ });
        } else if (!v.placeholder && v.type === 'youtube' && v.url) {
            /* امبد دوستدار حریم خصوصی — فقط هنگام درخواست لود می‌شود */
            playerBox.innerHTML = '<iframe class="h-full w-full rounded-2xl" title="' + label +
                '" src="https://www.youtube-nocookie.com/embed/' + encodeURIComponent(v.url) +
                '?autoplay=1&rel=0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>';
        } else if (!v.placeholder && v.type === 'aparat' && v.url) {
            playerBox.innerHTML = '<iframe class="h-full w-full rounded-2xl" title="' + label +
                '" src="https://www.aparat.com/video/video/embed/videohash/' + encodeURIComponent(v.url) +
                '/vt/frame" allowfullscreen loading="lazy"></iframe>';
        } else {
            /* PLACEHOLDER — تا زمان جای‌گزینی نشانی واقعی در آرایه‌ی VIDEOS */
            playerBox.innerHTML =
                '<div class="fd-poster relative flex h-full w-full flex-col items-center justify-center gap-3 rounded-2xl">' +
                '<svg class="relative z-10 h-12 w-12 text-white/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="3"/><path d="m10 9 5 3-5 3z" fill="currentColor" stroke="none"/></svg>' +
                '<p class="relative z-10 text-base font-bold text-white">' + t('videos.soonTitle') + '</p>' +
                '<p class="relative z-10 max-w-md px-6 text-center text-xs leading-6 text-blue-100/70">' + t('videos.soonText') + '</p>' +
                '</div>';
        }
    }

    function openModal(id) {
        var v = videoById(id);
        if (!v || !modal) return;
        lastFocus = document.activeElement;

        document.getElementById('fd-vm-title').textContent = L(v.title);
        document.getElementById('fd-vm-desc').textContent = L(v.desc);
        var chips = document.getElementById('fd-vm-chips');
        if (chips) {
            var sourceName = v.type === 'youtube' ? 'YouTube' : (v.type === 'aparat' ? 'Aparat' : 'MP4');
            chips.innerHTML =
                '<span class="fd-vm-chip" dir="ltr">' + digits(v.duration) + '</span>' +
                '<span class="fd-vm-chip">' + sourceName + '</span>';
        }

        injectPlayer(v);
        modal.hidden = false;
        document.body.style.overflow = 'hidden';
        if (window.gsap && !RM.matches) {
            gsap.fromTo(modal, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' });
            gsap.fromTo('.fd-modal-panel', { y: 24, scale: 0.97 },
                { y: 0, scale: 1, duration: 0.4, ease: 'power3.out' });
        }
        var closeBtn = modal.querySelector('.fd-modal-close');
        if (closeBtn) window.setTimeout(function () { closeBtn.focus(); }, 60);
    }

    function closeModal() {
        if (!modal || modal.hidden) return;
        function finish() {
            modal.hidden = true;
            if (playerBox) playerBox.innerHTML = ''; /* توقف پخش و آزادسازی iframe */
            document.body.style.overflow = '';
            if (lastFocus && lastFocus.focus) lastFocus.focus();
        }
        if (window.gsap && !RM.matches) {
            gsap.to(modal, { opacity: 0, duration: 0.22, ease: 'power2.in', onComplete: finish });
        } else {
            finish();
        }
    }

    function bindVideoOpen(container) {
        if (!container) return;
        container.addEventListener('click', function (e) {
            var trigger = e.target.closest('[data-video]');
            if (!trigger) return;
            openModal(trigger.getAttribute('data-video'));
        });
    }

    if (modal) {
        modal.addEventListener('click', function (e) {
            if (e.target.closest('[data-close]')) { e.preventDefault(); closeModal(); }
        });
        /* تله فوکوس + ESC */
        modal.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') { e.preventDefault(); closeModal(); return; }
            if (e.key === 'Tab') {
                var f = modal.querySelectorAll('button, a[href], iframe, video, [tabindex]:not([tabindex="-1"])');
                if (!f.length) return;
                var first = f[0], last = f[f.length - 1];
                if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
                else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
            }
        });
        /* بستن با کشیدن به پایین (موبایل) — روی ناحیه‌ی عنوان */
        var head = document.getElementById('fd-vm-head');
        if (head) {
            var sy = null;
            head.addEventListener('pointerdown', function (e) { sy = e.clientY; });
            head.addEventListener('pointerup', function (e) {
                if (sy === null) return;
                if (e.clientY - sy > 70) closeModal();
                sy = null;
            });
        }
    }

    /* ---------- مقداردهی ---------- */
    buildHub();
    renderRail();
    setActive(0, false);
    renderVideos();
    bindVideoOpen(document.getElementById('fd-video-featured'));
    bindVideoOpen(document.getElementById('fd-video-rail'));
    hubEntrance();
    heroIntro();
    heroScrollFade();

    /* بازرندر محتوای دوزبانه هنگام تغییر زبان (بدون به‌هم‌خوردن وضعیت فعال) */
    window.addEventListener('fd:langchange', function () {
        updateHubText();
        setActive(activeSub, false);
        renderRail();
        renderVideos();
    });
})();