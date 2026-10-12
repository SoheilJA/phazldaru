/* ============================================================
   assets/js/projects.js — صفحه پروژه‌ها: داده + فیلتر دسته‌بندی
   PLACEHOLDER: پروژه‌های زیر نمونه‌اند و باید با محتوای واقعی
   جای‌گزین شوند. فقط دسته‌ها/وضعیت‌های تعریف‌شده استفاده شده‌اند.
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

    /* ---------- نگاشت دسته / وضعیت به کلیدهای i18n ---------- */
    var CAT_I18N = {
        pharma: 'projects.catPharma', herbal: 'projects.catHerb', lab: 'projects.catLab',
        digital: 'projects.catDigital', clinical: 'projects.catClinical'
    };
    var STATUS_I18N = { active: 'projects.sActive', dev: 'projects.sDev', done: 'projects.sDone' };
    var STATUS_CLASS = { active: 'fd-badge-active', dev: 'fd-badge-dev', done: 'fd-badge-done' };

    /* ---------- داده پروژه‌ها (PLACEHOLDER — جای‌گزین شود) ---------- */
    var PROJECTS = [
        {
            cat: 'herbal', status: 'active', sub: 'Herbaris', monogram: 'H',
            title: { fa: 'خط تولید فرآورده‌های گیاهی هربریس', en: 'Herbaris herbal product line' },
            desc: {
                fa: 'توسعه و تولید سبد فرآورده‌های طبیعی و گیاهی مطابق استانداردهای جهانی.',
                en: 'Developing and producing a portfolio of natural and herbal products in line with global standards.'
            }
        },
        {
            cat: 'digital', status: 'active', sub: 'Healthamed', monogram: 'H',
            title: { fa: 'پلتفرم داروخانه آنلاین هلثامد', en: 'Healthamed online pharmacy platform' },
            desc: {
                fa: 'فروش آنلاین دارو و ارائه خدمات سلامت به کاربران در بستری امن.',
                en: 'Online medicine sales and health services delivered on a secure platform.'
            }
        },
        {
            cat: 'digital', status: 'dev', sub: 'Econoris', monogram: 'E',
            title: { fa: 'برنامه شتاب‌دهی سلامت‌تک اکونوریس', en: 'Econoris health-tech accelerator program' },
            desc: {
                fa: 'حمایت و شتاب‌دهی تیم‌ها و استارتاپ‌های حوزه دارو و فناوری‌های سلامت.',
                en: 'Supporting and accelerating teams and startups in pharmaceuticals and health technology.'
            }
        },
        {
            cat: 'lab', status: 'active', sub: 'Sanjesh Azmay', monogram: 'S',
            title: { fa: 'خدمات آزمایشگاه کنترل کیفی سنجش آزمای', en: 'Sanjesh Azmay quality-control laboratory services' },
            desc: {
                fa: 'انجام آزمون‌های کنترل کیفی با تجهیزات مدرن و تیم متخصص.',
                en: 'Quality-control testing with modern equipment and a specialist team.'
            }
        },
        {
            cat: 'herbal', status: 'active', sub: 'Palizkesht', monogram: 'P',
            title: { fa: 'کشت و فرآوری گیاهان دارویی پالیز کشت', en: 'Palizkesht medicinal plant cultivation' },
            desc: {
                fa: 'کشت، تولید و فرآوری گیاهان دارویی به‌عنوان پایه زنجیره ارزش گیاهان دارویی.',
                en: 'Cultivation, production and processing of medicinal plants as the base of the herbal value chain.'
            }
        },
        {
            cat: 'clinical', status: 'done', sub: 'Novin Salamat', monogram: 'N',
            title: { fa: 'راه‌اندازی درمانگاه نوین سلامت فضل', en: 'Establishing the Novin Salamat Fazl clinic' },
            desc: {
                fa: 'ارائه خدمات درمانی و بالینی در درمانگاه مجهز نوین سلامت فضل.',
                en: 'Providing medical and clinical services at the fully equipped Novin Salamat Fazl clinic.'
            }
        },
        {
            cat: 'pharma', status: 'dev', sub: 'R&D', monogram: 'R',
            title: { fa: 'همکاری پژوهشی با دانشگاه‌ها', en: 'University research collaboration' },
            desc: {
                fa: 'همکاری‌های پژوهشی و توسعه‌ای در حوزه داروسازی با دانشگاه‌ها.',
                en: 'Research and development collaborations in pharmaceuticals with universities.'
            }
        },
        {
            cat: 'pharma', status: 'active', sub: 'Herbaris', monogram: 'D',
            title: { fa: 'توسعه داروی جدید دیابت', en: 'New diabetes drug development' },
            desc: {
                fa: 'پروژه توسعه داروی جدید شرکت برای درمان دیابت نوع ۲.',
                en: 'The company\u2019s project to develop a new drug for the treatment of type 2 diabetes.'
            }
        }
    ];

    /* کاورهای دسته‌ای (تزریق CSS کوچک تا مستقل از custom.css باشد) */
    var style = document.createElement('style');
    style.textContent =
        '.fd-cover{position:relative;overflow:hidden}' +
        '.fd-cover::after{content:"";position:absolute;inset:0;background-image:radial-gradient(rgba(255,255,255,.16) 1px,transparent 1.4px);background-size:18px 18px}' +
        '.fd-cover-pharma{background:linear-gradient(135deg,#0A3B7D,#2E74E0)}' +
        '.fd-cover-herbal{background:linear-gradient(135deg,#0F766E,#22A783)}' +
        '.fd-cover-lab{background:linear-gradient(135deg,#0A1F44,#0B4EA2)}' +
        '.fd-cover-digital{background:linear-gradient(135deg,#1263D6,#5B99EE)}' +
        '.fd-cover-clinical{background:linear-gradient(135deg,#0B4EA2,#14B8A6)}';
    document.head.appendChild(style);
    var CAT_COVER = {
        pharma: 'fd-cover-pharma', herbal: 'fd-cover-herbal', lab: 'fd-cover-lab',
        digital: 'fd-cover-digital', clinical: 'fd-cover-clinical'
    };

    /* ---------- رندر کارت‌ها ---------- */
    var grid = document.getElementById('fd-projects-grid');
    var emptyState = document.getElementById('fd-projects-empty');
    var live = document.getElementById('fd-filter-live');
    var currentFilter = 'all';

    function cardHTML(p) {
        var typeKey = { active: 'sActive', dev: 'sDev', done: 'sDone' }[p.status] || 'sActive';
        return '' +
            '<article class="fd-project-card group overflow-hidden rounded-2xl border border-brand-100 bg-white transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-200 hover:shadow-lift" ' +
            'data-cat="' + p.cat + '" data-status="' + p.status + '">' +
            '<div class="fd-cover ' + (CAT_COVER[p.cat] || 'fd-cover-pharma') + ' relative flex aspect-[16/9] items-center justify-center">' +
            '<span class="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-xl font-extrabold text-white backdrop-blur-sm" aria-hidden="true">' + p.monogram + '</span>' +
            '<span class="absolute start-3 top-3 z-10 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold text-brand-700 backdrop-blur">' + t(CAT_I18N[p.cat]) + '</span>' +
            '</div>' +
            '<div class="p-5">' +
            '<div class="flex items-center justify-between gap-2">' +
            '<span class="text-xs font-bold uppercase tracking-wider text-brand-300" dir="ltr">' + p.sub + '</span>' +
            '<span class="fd-badge ' + (STATUS_CLASS[p.status] || '') + '">' + t('projects.' + typeKey) + '</span>' +
            '</div>' +
            '<h3 class="fd-h3 mt-3 leading-8">' + L(p.title) + '</h3>' +
            '<p class="mt-2 line-clamp-2 text-sm leading-7 text-slate-500">' + L(p.desc) + '</p>' +
            '</div>' +
            '</article>';
    }

    function render() {
        if (!grid) return;
        grid.innerHTML = PROJECTS.map(cardHTML).join('');
    }

    /* ---------- فیلتر (fade/scale بدون پلاگین تجاری) ---------- */
    function applyFilter(cat, animate) {
        if (!grid) return;
        currentFilter = cat;
        var cards = Array.prototype.slice.call(grid.querySelectorAll('.fd-project-card'));
        var show = cards.filter(function (c) { return cat === 'all' || c.getAttribute('data-cat') === cat; });
        var hide = cards.filter(function (c) { return show.indexOf(c) === -1; });

        /* اعلام تعداد برای صفحه‌خوان‌ها */
        if (live) live.textContent = t('projects.live').replace('{n}', digits(String(show.length)));

        if (emptyState) {
            emptyState.classList.toggle('hidden', show.length !== 0);
        }

        if (!animate || RM.matches || !window.gsap) {
            hide.forEach(function (c) { c.classList.add('hidden'); });
            show.forEach(function (c) { c.classList.remove('hidden'); });
            return;
        }

        /* توقف تویین‌های قبلی برای جلوگیری از تداخل فیلترهای سریع */
        gsap.killTweensOf(cards);
        gsap.set(show, { opacity: 1, scale: 1 });

        if (hide.length) {
            gsap.to(hide, {
                opacity: 0, scale: 0.95, duration: 0.22, ease: 'power2.in',
                onComplete: function () { hide.forEach(function (c) { c.classList.add('hidden'); }); }
            });
        }
        var toShow = show.filter(function (c) { return c.classList.contains('hidden'); });
        if (toShow.length) {
            toShow.forEach(function (c) { c.classList.remove('hidden'); });
            gsap.fromTo(toShow, { opacity: 0, scale: 0.95 },
                { opacity: 1, scale: 1, duration: 0.45, ease: 'power3.out', stagger: 0.05, delay: 0.12 });
        }
    }

    function setChips(cat) {
        document.querySelectorAll('.fd-chip[data-filter]').forEach(function (c) {
            c.setAttribute('aria-pressed', c.getAttribute('data-filter') === cat ? 'true' : 'false');
        });
    }

    document.querySelectorAll('.fd-chip[data-filter]').forEach(function (chip) {
        chip.addEventListener('click', function () {
            setChips(chip.getAttribute('data-filter'));
            applyFilter(chip.getAttribute('data-filter'), true);
        });
    });
    var reset = document.getElementById('fd-projects-reset');
    if (reset) {
        reset.addEventListener('click', function () {
            setChips('all');
            applyFilter('all', true);
        });
    }

    /* ---------- مقداردهی ---------- */
    render();

    /* بازرندر دوزبانه بدون انیمیشن، با حفظ فیلتر جاری */
    window.addEventListener('fd:langchange', function () {
        render();
        applyFilter(currentFilter, false);
    });
})();