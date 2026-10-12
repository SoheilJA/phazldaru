/* ============================================================
   assets/js/i18n.js — موتور دوزبانه (فارسی پیش‌فرض + انگلیسی)
   استفاده:
   - متن ثابت:      <span data-i18n="key">
   - placeholder:   <input data-i18n-placeholder="key">
   - برچسب ARIA:    <button data-i18n-aria="key">
   - لینک (mailto/maps): <a data-i18n-href="key">
   - API:  FDI18N.t(key) · FDI18N.setLang('en') · FDI18N.digits('123')
   - رخداد: 'fd:langchange' پس از جای‌گزینی متن‌ها dispatch می‌شود
============================================================ */
window.FDI18N = (function () {
   'use strict';

   /* ---------------------------------------------------------
      دیکشنری — همه ترجمه‌ها اینجا ویرایش می‌شوند.
      متن فارسی با نیم‌فاصله (ZWNJ) و علائم « » ، ؛ نوشته شده است.
   --------------------------------------------------------- */
   var DICT = {
      fa: {
         /* a11y */
         'a11y.skip': 'پرش به محتوای اصلی',
         'a11y.langAria': 'تغییر زبان به انگلیسی',
         'a11y.openMenu': 'باز کردن منو',
         'a11y.closeMenu': 'بستن منو',
         'a11y.scroll': 'اسکرول برای مشاهده',
         'a11y.breadcrumb': 'مسیر صفحه',
         /* brand */
         'brand.name': 'فضل دارو',
         'brand.tag': 'هلدینگ داروسازی',
         'brand.logoAria': 'فضل دارو — صفحه اصلی',
         /* nav / menu / dock */
         'nav.aria': 'منوی اصلی',
         'nav.home': 'خانه',
         'nav.projects': 'پروژه‌ها',
         'nav.about': 'درباره ما',
         'nav.contact': 'تماس با ما',
         'menu.aria': 'منوی موبایل',
         'menu.call': 'تماس تلفنی',
         'menu.email': 'ارسال ایمیل',
         'menu.langLabel': 'تغییر زبان',
         'dock.call': 'تماس',
         'dock.email': 'ایمیل',
         'crumbs.home': 'خانه',
         /* hero */
         'hero.badge': 'داروسازی دانش‌بنیان',
         'hero.h1a': 'فضل دارو؛',
         'hero.h1b': 'تولیدکننده داروهای باکیفیت',
         'hero.h1c': 'با بیش از ۸ سال سابقه',
         'hero.h1d': 'در خدمت سلامت جامعه',
         'hero.sub': 'شرکت داروسازی دانش‌بنیان فضل دارو در سال ۱۳۹۷ (۲۰۱۸) تحت برند «هربریس» و به‌دست جمعی از داروسازان پژوهشگر تأسیس شد.',
         'hero.ctaPrimary': 'درباره ما',
         'hero.ctaSecondary': 'پروژه‌های ما',
         'hero.ctaGhost': 'تماس با ما',
         'hero.stat1v': '+۵۰', 'hero.stat1l': 'محصول دارویی',
         'hero.stat2v': '+۸۰', 'hero.stat2l': 'نیروی متخصص',
         'hero.stat3v': '۶', 'hero.stat3l': 'شرکت زیرمجموعه',
         'hero.stat4v': '۱۳۹۷', 'hero.stat4l': 'سال تأسیس',
         /* values */
         'values.title': 'ارزش‌های برند',
         'values.subtitle': 'ماموریت و ارزش‌های محوری شرکت داروسازی فضل دارو',
         'values.t1': 'حفظ و بهبود سلامت عمومی',
         'values.d1': 'از طریق تولید محصولات استاندارد و باکیفیت',
         'values.t2': 'نوآوری در تولید',
         'values.d2': 'ایجاد سبد دارویی متناسب با نیاز بازارهای داخلی و بین‌المللی',
         'values.t3': 'افزایش مستمر کیفیت',
         'values.d3': 'با همراهی واحد تحقیق و توسعه پویا و توانمند',
         'values.t4': 'ارزش‌افزوده گیاهان دارویی',
         'values.d4': 'ایجاد حداکثر ارزش‌افزوده برای گیاهان دارویی کشور و فرآورده‌های گیاهی',
         'values.t5': 'محیط کاری مناسب',
         'values.d5': 'ایجاد محیط مناسب کاری و کسب و ارتقای رضایت کارکنان',
         'values.t6': 'مسئولیت‌پذیری اجتماعی',
         'values.d6': 'صداقت، امانت، درستکاری و مسئولیت‌پذیری در قبال ذی‌نفعان و محیط‌زیست',
         /* subsidiaries */
         'subs.title': 'شرکت‌های زیرمجموعه فضل دارو',
         'subs.subtitle': 'گروه فضل دارو با چند شرکت تخصصی در خدمت سلامت جامعه است.',
         'subs.visit': 'مشاهده وب‌سایت',
         'subs.soon': 'به‌زودی',
         'subs.hubAria': 'نمودار شرکت‌های زیرمجموعه فضل دارو',
         'subs.hint': 'برای مشاهده جزئیات، نشانگر را روی هر شرکت نگه دارید یا آن را انتخاب کنید.',
         /* careers */
         'careers.title': 'فضل دارو، فرصتی برای بهترین‌ها',
         'careers.text': 'جهت همکاری با شرکت داروسازی دانش‌بنیان فضل دارو در هر یک از زیرمجموعه‌های فوق، رزومه خود را برای ما ارسال کنید.',
         'careers.cta': 'ارسال رزومه',
         'careers.cta2': 'صفحه تماس',
         'careers.href': 'mailto:info@phazldaru.ir?subject=%D8%A7%D8%B1%D8%B3%D8%A7%D9%84%20%D8%B1%D8%B2%D9%88%D9%85%D9%87%20%D9%81%D8%B6%D9%84%20%D8%AF%D8%A7%D8%B1%D9%88',
         /* videos */
         'videos.title': 'ویدئوهای فضل دارو',
         'videos.subtitle': 'مروری بر فعالیت‌ها و شرکت‌های گروه فضل دارو',
         'videos.featured': 'ویدئوی منتخب',
         'videos.play': 'پخش ویدئو',
         'videos.close': 'بستن',
         'videos.soonTitle': 'ویدئو به‌زودی',
         'videos.soonText': 'این یک نمونه نمایشی است؛ لطفاً نشانی ویدئوی واقعی را در فایل home.js جای‌گزین کنید.',
         /* news — PLACEHOLDER: با اخبار واقعی جای‌گزین شود */
         'news.title': 'اخبار',
         'news.subtitle': 'تازه‌ترین اخبار و دستاوردهای شرکت فضل دارو',
         'news.tag1': 'تازه‌ها',
         'news.t1': 'رونمایی از داروی جدید دیابت',
         'news.d1': 'شرکت فضل دارو از داروی جدید خود برای درمان دیابت نوع ۲ رونمایی کرد.',
         'news.date1': '۲ روز پیش',
         'news.tag2': 'دستاورد',
         'news.t2': 'دریافت گواهی ISO 9001:2022',
         'news.d2': 'شرکت فضل دارو موفق به دریافت گواهی بین‌المللی ISO 9001:2022 شد.',
         'news.date2': '۱ هفته پیش',
         'news.tag3': 'همکاری',
         'news.t3': 'همکاری با دانشگاه تهران',
         'news.d3': 'انعقاد قرارداد همکاری پژوهشی با دانشکده داروسازی دانشگاه تهران.',
         'news.date3': '۲ هفته پیش',
         'news.viewAll': 'مشاهده همه اخبار',
         'news.readAria': 'مطالعه کامل خبر',
         /* statement */
         'statement.text': 'شرکت داروسازی دانش‌بنیان فضل دارو تحت برند «هربریس» در سال ۱۳۹۷ توسط جمعی از داروسازان پژوهشگر با هدف تولید فرآورده‌های دارویی مورد نیاز کشور تأسیس گردید.',
         /* footer */
         'footer.desc': 'شرکت داروسازی دانش‌بنیان فضل دارو در سال ۱۳۹۷ تحت برند «هربریس» و به‌دست جمعی از داروسازان پژوهشگر تأسیس شد.',
         'footer.links': 'دسترسی سریع',
         'footer.contact': 'راه‌های ارتباطی',
         'footer.follow': 'ما را دنبال کنید',
         'footer.rights': 'تمامی حقوق برای شرکت داروسازی فضل دارو محفوظ است.',
         'footer.credit': 'طراحی و توسعه توسط تیم فناوری اطلاعات فضل دارو',
         'footer.addr1Tag': 'نیشابور',
         'footer.addr1': 'نیشابور، انتهای بلوار پژوهش، پارک علم و فناوری',
         'footer.addr2Tag': 'مشهد',
         'footer.addr2': 'مشهد، میدان فردوسی، پارک علم و فناوری سلامت',
         'footer.phoneTitle': 'تلفن',
         'footer.phone1': '۰۵۱-۴۲۲۳۴۲۴۲',
         'footer.phone2': '۰۵۱-۴۲۶۳۷۰۸۱-۸۴',
         'footer.emailLabel': 'ایمیل',
         'footer.social1': 'لینکدین', 'footer.social2': 'اینستاگرام',
         'footer.social3': 'تلگرام', 'footer.social4': 'یوتیوب',
         /* about */
         'about.title': 'درباره ما',
         'about.subtitle': 'شرکت فضل دارو | ترکیب علم و طبیعت',
         'about.introTitle': 'معرفی شرکت',
         'about.intro': 'شرکت فضل دارو با هدف تولید و عرضه داروهای با کیفیت و مبتنی بر دانش روز تأسیس گردیده است. این شرکت با تکیه بر تیمی متخصص و امکانات پیشرفته، توانسته جایگاهی ویژه در صنعت داروسازی ایران کسب نماید. ماموریت ما ارائه محصولات دارویی مطمئن و موثر برای ارتقاء سلامت جامعه و ایجاد ارزش پایدار برای ذی‌نفعان است.',
         'about.since': 'از سال',
         'about.sinceYear': '۱۳۹۷',
         'about.missionTitle': 'ماموریت ما',
         'about.mission': 'تولید داروهای ایمن، اثربخش و مقرون‌به‌صرفه برای بهبود کیفیت زندگی بیماران.',
         'about.visionTitle': 'چشم‌انداز ما',
         'about.vision': 'تبدیل شدن به یکی از شرکت‌های پیشرو داروسازی در سطح ملی و منطقه‌ای.',
         'about.teamTitle': 'تیم ما',
         'about.teamSub': 'مدیران و متخصصان شرکت فضل دارو',
         'about.p1name': 'دکتر کامران شورگشتی', 'about.p1role': 'مدیرعامل',
         'about.p2name': 'دکتر مهرناز فیاض‌فر', 'about.p2role': 'مدیر تحقیق و توسعه',
         'about.p3name': 'دکتر آرمان معین‌راد', 'about.p3role': 'عضو هیئت مدیره',
         'about.numbersTitle': 'فضل دارو در یک نگاه',
         'about.n1': 'محصول دارویی',
         'about.n2': 'نیروی متخصص',
         'about.n3': 'مراکز طرف قرارداد',
         'about.n4': 'پروژه‌های سلامت',
         'about.timelineTitle': 'مسیر رشد',
         'about.tl1t': '۱۳۹۷ — آغاز کار',
         'about.tl1d': 'تأسیس شرکت تحت برند «هربریس» توسط جمعی از داروسازان پژوهشگر.',
         'about.tl2t': 'رشد و توسعه',
         'about.tl2d': 'توسعه فعالیت‌ها و شکل‌گیری هلدینگ فضل دارو با شرکت‌های تخصصی زیرمجموعه.',
         'about.tl3t': 'امروز',
         'about.tl3d': 'گروهی چندوجهی در خدمت سلامت جامعه، با نگاهی به آینده.',
         'about.ctaTitle': 'بیشتر بدانید',
         'about.ctaText': 'برای آشنایی با پروژه‌های گروه یا برقراری ارتباط با ما، صفحات مربوطه را ببینید.',
         'about.cta1': 'پروژه‌های ما',
         'about.cta2': 'تماس با ما',
         /* projects */
         'projects.title': 'پروژه‌ها',
         'projects.subtitle': 'فعالیت‌ها و طرح‌های گروه فضل دارو',
         'projects.filtersAria': 'فیلتر دسته‌بندی پروژه‌ها',
         'projects.catAll': 'همه',
         'projects.catPharma': 'دارویی',
         'projects.catHerb': 'گیاهی و کشت',
         'projects.catLab': 'آزمایشگاه و کیفیت',
         'projects.catDigital': 'سلامت دیجیتال',
         'projects.catClinical': 'درمانی',
         'projects.sActive': 'در حال اجرا',
         'projects.sDev': 'در حال توسعه',
         'projects.sDone': 'تکمیل‌شده',
         'projects.live': '{n} پروژه نمایش داده می‌شود',
         'projects.emptyTitle': 'موردی یافت نشد',
         'projects.emptyText': 'در این دسته‌بندی فعلاً پروژه‌ای ثبت نشده است.',
         'projects.emptyReset': 'نمایش همه پروژه‌ها',
         'projects.ctaTitle': 'پروژه‌ای در ذهن دارید؟',
         'projects.ctaText': 'برای همکاری، پیشنهاد یا کسب اطلاعات بیشتر با ما در تماس باشید.',
         'projects.ctaBtn': 'تماس با ما',
         /* contact */
         'contact.title': 'تماس با ما',
         'contact.subtitle': 'راه‌های ارتباطی با شرکت فضل دارو',
         'contact.addrTitle': 'نشانی‌ها',
         'contact.copy': 'کپی نشانی',
         'contact.copied': 'کپی شد',
         'contact.maps': 'مشاهده در نقشه',
         'contact.maps1': 'https://www.google.com/maps/search/?api=1&query=%D9%BE%D8%A7%D8%B1%DA%A9%20%D8%B9%D9%84%D9%85%20%D9%88%20%D9%81%D9%86%D8%A7%D9%88%D8%B1%DB%8C%20%D9%86%DB%8C%D8%B4%D8%A7%D8%A8%D9%88%D8%B1',
         'contact.maps2': 'https://www.google.com/maps/search/?api=1&query=%D9%BE%D8%A7%D8%B1%DA%A9%20%D8%B9%D9%84%D9%85%20%D9%88%20%D9%81%D9%86%D8%A7%D9%88%D8%B1%DB%8C%20%D8%B3%D9%84%D8%A7%D9%85%D8%AA%20%D9%85%D8%B4%D9%87%D8%AF',
         'contact.phoneTitle': 'تلفن‌های تماس',
         'contact.emailTitle': 'ایمیل',
         'contact.copyEmail': 'کپی ایمیل',
         'contact.formTitle': 'فرم تماس',
         'contact.formNote': 'پیام شما پس از ارسال توسط تیم فضل دارو بررسی می‌شود.',
         'contact.name': 'نام و نام خانوادگی',
         'contact.namePh': 'نام و نام خانوادگی خود را وارد کنید',
         'contact.email': 'ایمیل',
         'contact.message': 'پیام',
         'contact.messagePh': 'پیام خود را بنویسید…',
         'contact.submit': 'ارسال پیام',
         'contact.sending': 'در حال ارسال…',
         'contact.successTitle': 'پیام شما ارسال شد',
         'contact.successText': 'از ارتباط شما سپاسگزاریم؛ کارشناسان ما در اسرع وقت پاسخ خواهند داد.',
         'contact.again': 'ارسال پیام جدید',
         'contact.errName': 'لطفاً نام و نام خانوادگی خود را وارد کنید.',
         'contact.errEmailEmpty': 'لطفاً ایمیل خود را وارد کنید.',
         'contact.errEmailInvalid': 'نشانی ایمیل واردشده معتبر نیست.',
         'contact.errMsg': 'متن پیام باید حداقل ۱۰ نویسه باشد.',
         'contact.errGeneric': 'ارسال پیام ناموفق بود؛ لطفاً دوباره تلاش کنید.',
         'contact.mapTitle': 'موقعیت ما',
         'contact.mapNote': 'دفاتر نیشابور و مشهد',
         'contact.mapLoad': 'بارگذاری نقشه تعاملی',
         'contact.mapAria': 'نقشه موقعیت دفاتر فضل دارو',
         /* عنوان صفحات (بر اساس data-page روی <body>) */
         'meta.index': 'شرکت داروسازی دانش‌بنیان فضل دارو | هربریس',
         'meta.about': 'درباره ما | فضل دارو',
         'meta.projects': 'پروژه‌ها | فضل دارو',
         'meta.contact': 'تماس با ما | فضل دارو'
      },

      en: {
         /* a11y */
         'a11y.skip': 'Skip to main content',
         'a11y.langAria': 'Switch language to Persian',
         'a11y.openMenu': 'Open menu',
         'a11y.closeMenu': 'Close menu',
         'a11y.scroll': 'Scroll to explore',
         'a11y.breadcrumb': 'Breadcrumb',
         /* brand */
         'brand.name': 'Fazl Daru',
         'brand.tag': 'Pharma Holding',
         'brand.logoAria': 'Fazl Daru — Home',
         /* nav / menu / dock */
         'nav.aria': 'Main navigation',
         'nav.home': 'Home',
         'nav.projects': 'Projects',
         'nav.about': 'About Us',
         'nav.contact': 'Contact Us',
         'menu.aria': 'Mobile menu',
         'menu.call': 'Call us',
         'menu.email': 'Send an email',
         'menu.langLabel': 'Switch language',
         'dock.call': 'Call',
         'dock.email': 'Email',
         'crumbs.home': 'Home',
         /* hero */
         'hero.badge': 'Knowledge-Based Pharmaceutical Company',
         'hero.h1a': 'Fazl Daru —',
         'hero.h1b': 'producing high-quality medicines',
         'hero.h1c': 'with over 8 years of experience',
         'hero.h1d': 'in service of public health.',
         'hero.sub': 'Fazl Daru Knowledge-Based Pharmaceutical Company was founded in 1397 (2018) under the Herbaris brand by a group of researcher-pharmacists.',
         'hero.ctaPrimary': 'About Us',
         'hero.ctaSecondary': 'Our Projects',
         'hero.ctaGhost': 'Contact Us',
         'hero.stat1v': '50+', 'hero.stat1l': 'pharmaceutical products',
         'hero.stat2v': '80+', 'hero.stat2l': 'specialists',
         'hero.stat3v': '6', 'hero.stat3l': 'subsidiaries',
         'hero.stat4v': '1397', 'hero.stat4l': 'founded',
         /* values */
         'values.title': 'Brand Values',
         'values.subtitle': 'The mission and core values of Fazl Daru Pharmaceutical Company',
         'values.t1': 'Preserving and improving public health',
         'values.d1': 'Through the production of standard, high-quality products.',
         'values.t2': 'Innovation in production',
         'values.d2': 'Building a pharmaceutical portfolio tailored to the needs of domestic and international markets.',
         'values.t3': 'Continuous quality improvement',
         'values.d3': 'Supported by a dynamic and capable R&D unit.',
         'values.t4': 'Added value of medicinal plants',
         'values.d4': "Creating maximum added value for the country's medicinal plants and herbal products.",
         'values.t5': 'A healthy workplace',
         'values.d5': 'Creating a suitable work environment and earning and improving employee satisfaction.',
         'values.t6': 'Social responsibility',
         'values.d6': 'Honesty, trustworthiness, integrity and accountability toward stakeholders and the environment.',
         /* subsidiaries */
         'subs.title': 'Fazl Daru Subsidiaries',
         'subs.subtitle': 'The Fazl Daru Group, with several specialized companies serving community health.',
         'subs.visit': 'Visit website',
         'subs.soon': 'Coming soon',
         'subs.hubAria': 'Diagram of Fazl Daru subsidiaries',
         'subs.hint': 'Hover over or select a company to see its details.',
         /* careers */
         'careers.title': 'Fazl Daru — an opportunity for the best.',
         'careers.text': 'To work with Fazl Daru Knowledge-Based Pharmaceutical Company in any of the subsidiaries above, send us your résumé.',
         'careers.cta': 'Send your résumé',
         'careers.cta2': 'Contact page',
         'careers.href': 'mailto:info@phazldaru.ir?subject=R%C3%A9sum%C3%A9%20%E2%80%93%20Fazl%20Daru',
         /* videos */
         'videos.title': 'Fazl Daru Videos',
         'videos.subtitle': 'A look at the activities and companies of the Fazl Daru Group',
         'videos.featured': 'Featured video',
         'videos.play': 'Play video',
         'videos.close': 'Close',
         'videos.soonTitle': 'Video coming soon',
         'videos.soonText': 'This is a demo entry — replace the source URL in home.js to publish the real video.',
         /* news — PLACEHOLDER: replace with real items */
         'news.title': 'News',
         'news.subtitle': 'Latest news and achievements of Fazl Daru Company',
         'news.tag1': 'Latest',
         'news.t1': 'Unveiling of a new diabetes drug',
         'news.d1': 'Fazl Daru unveiled its new drug for the treatment of type 2 diabetes.',
         'news.date1': '2 days ago',
         'news.tag2': 'Achievement',
         'news.t2': 'ISO 9001:2022 certification received',
         'news.d2': 'Fazl Daru has successfully received the international ISO 9001:2022 certificate.',
         'news.date2': '1 week ago',
         'news.tag3': 'Collaboration',
         'news.t3': 'Collaboration with the University of Tehran',
         'news.d3': 'A research collaboration agreement was signed with the Faculty of Pharmacy of the University of Tehran.',
         'news.date3': '2 weeks ago',
         'news.viewAll': 'View all news',
         'news.readAria': 'Read the full story',
         /* statement */
         'statement.text': 'Fazl Daru Knowledge-Based Pharmaceutical Company was established in 1397 (2018) under the Herbaris brand by a group of researcher-pharmacists, with the aim of producing the pharmaceutical products the country needs.',
         /* footer */
         'footer.desc': 'Fazl Daru Knowledge-Based Pharmaceutical Company was established in 1397 under the Herbaris brand by a group of researcher-pharmacists.',
         'footer.links': 'Quick links',
         'footer.contact': 'Contact',
         'footer.follow': 'Follow us',
         'footer.rights': 'All rights reserved by Fazl Daru Pharmaceutical Company.',
         'footer.credit': 'Designed and developed by the Fazl Daru IT team',
         'footer.addr1Tag': 'Neyshabur',
         'footer.addr1': 'Neyshabur, end of Pazhuhesh Blvd, Science and Technology Park',
         'footer.addr2Tag': 'Mashhad',
         'footer.addr2': 'Mashhad, Ferdowsi Square, Health Science and Technology Park',
         'footer.phoneTitle': 'Phone',
         'footer.phone1': '051-42234242',
         'footer.phone2': '051-42637081-84',
         'footer.emailLabel': 'Email',
         'footer.social1': 'LinkedIn', 'footer.social2': 'Instagram',
         'footer.social3': 'Telegram', 'footer.social4': 'YouTube',
         /* about */
         'about.title': 'About Us',
         'about.subtitle': 'Fazl Daru Company | Where science meets nature',
         'about.introTitle': 'Company Introduction',
         'about.intro': "Fazl Daru was established with the aim of producing and supplying high-quality medicines based on up-to-date science. Relying on a team of specialists and advanced facilities, the company has earned a distinguished position in Iran's pharmaceutical industry. Our mission is to provide reliable and effective pharmaceutical products to improve public health and to create lasting value for stakeholders.",
         'about.since': 'Since',
         'about.sinceYear': '1397',
         'about.missionTitle': 'Our Mission',
         'about.mission': 'Producing safe, effective and affordable medicines to improve patients\u2019 quality of life.',
         'about.visionTitle': 'Our Vision',
         'about.vision': 'Becoming one of the leading pharmaceutical companies at the national and regional level.',
         'about.teamTitle': 'Our Team',
         'about.teamSub': 'The leadership and specialists of Fazl Daru',
         'about.p1name': 'Dr. Kamran Shourgashti', 'about.p1role': 'Chief Executive Officer',
         'about.p2name': 'Dr. Mehrnaz Fayazfar', 'about.p2role': 'Head of Research & Development',
         'about.p3name': 'Dr. Arman Moinrad', 'about.p3role': 'Board Member',
         'about.numbersTitle': 'Fazl Daru at a glance',
         'about.n1': 'Pharmaceutical products',
         'about.n2': 'Specialized staff',
         'about.n3': 'Contracted centers',
         'about.n4': 'Health projects',
         'about.timelineTitle': 'Our journey',
         'about.tl1t': '1397 — The beginning',
         'about.tl1d': 'The company was founded under the Herbaris brand by a group of researcher-pharmacists.',
         'about.tl2t': 'Growth & development',
         'about.tl2d': 'Expansion of activities and evolution into the Fazl Daru holding with specialized subsidiaries.',
         'about.tl3t': 'Today',
         'about.tl3d': 'A multidisciplinary group serving community health, with an eye on the future.',
         'about.ctaTitle': 'Learn more',
         'about.ctaText': "Explore the group's projects or get in touch with us through the relevant pages.",
         'about.cta1': 'Our Projects',
         'about.cta2': 'Contact Us',
         /* projects */
         'projects.title': 'Projects',
         'projects.subtitle': 'Initiatives and activities across the Fazl Daru group',
         'projects.filtersAria': 'Filter projects by category',
         'projects.catAll': 'All',
         'projects.catPharma': 'Pharmaceutical',
         'projects.catHerb': 'Herbal & Cultivation',
         'projects.catLab': 'Laboratory & Quality',
         'projects.catDigital': 'Digital Health',
         'projects.catClinical': 'Clinical',
         'projects.sActive': 'Active',
         'projects.sDev': 'In development',
         'projects.sDone': 'Completed',
         'projects.live': '{n} projects shown',
         'projects.emptyTitle': 'No results found',
         'projects.emptyText': 'There are no projects in this category yet.',
         'projects.emptyReset': 'Show all projects',
         'projects.ctaTitle': 'Have a project in mind?',
         'projects.ctaText': 'For collaboration, proposals or more information, get in touch with us.',
         'projects.ctaBtn': 'Contact Us',
         /* contact */
         'contact.title': 'Contact Us',
         'contact.subtitle': 'Ways to reach Fazl Daru Company',
         'contact.addrTitle': 'Addresses',
         'contact.copy': 'Copy address',
         'contact.copied': 'Copied',
         'contact.maps': 'Open in maps',
         'contact.maps1': 'https://www.google.com/maps/search/?api=1&query=Neyshabur+Science+and+Technology+Park',
         'contact.maps2': 'https://www.google.com/maps/search/?api=1&query=Mashhad+Health+Science+and+Technology+Park',
         'contact.phoneTitle': 'Phone numbers',
         'contact.emailTitle': 'Email',
         'contact.copyEmail': 'Copy email',
         'contact.formTitle': 'Contact form',
         'contact.formNote': 'Your message will be reviewed by the Fazl Daru team after submission.',
         'contact.name': 'Full name',
         'contact.namePh': 'Enter your full name',
         'contact.email': 'Email',
         'contact.message': 'Message',
         'contact.messagePh': 'Write your message\u2026',
         'contact.submit': 'Send message',
         'contact.sending': 'Sending\u2026',
         'contact.successTitle': 'Your message was sent',
         'contact.successText': 'Thank you for reaching out; our team will get back to you as soon as possible.',
         'contact.again': 'Send another message',
         'contact.errName': 'Please enter your full name.',
         'contact.errEmailEmpty': 'Please enter your email address.',
         'contact.errEmailInvalid': 'Please enter a valid email address.',
         'contact.errMsg': 'The message must be at least 10 characters long.',
         'contact.errGeneric': 'Sending failed — please try again.',
         'contact.mapTitle': 'Where we are',
         'contact.mapNote': 'Neyshabur and Mashhad offices',
         'contact.mapLoad': 'Load interactive map',
         'contact.mapAria': 'Map of Fazl Daru offices',
         /* page titles */
         'meta.index': 'Fazl Daru Knowledge-Based Pharmaceutical Company | Herbaris',
         'meta.about': 'About Us | Fazl Daru',
         'meta.projects': 'Projects | Fazl Daru',
         'meta.contact': 'Contact Us | Fazl Daru'
      }
   };

   var lang = 'fa';
   var FA_DIGITS = {
      '0': '\u06F0', '1': '\u06F1', '2': '\u06F2', '3': '\u06F3', '4': '\u06F4',
      '5': '\u06F5', '6': '\u06F6', '7': '\u06F7', '8': '\u06F8', '9': '\u06F9'
   };

   function get(key) {
      return (DICT[lang] && Object.prototype.hasOwnProperty.call(DICT[lang], key)) ? DICT[lang][key] : undefined;
   }
   function t(key) {
      var v = get(key);
      return (v === undefined) ? key : v;
   }
   function digits(str) {
      return String(str).replace(/[0-9]/g, function (d) { return FA_DIGITS[d]; });
   }

   /* جای‌گزینی همه متن‌ها / placeholder / aria / href */
   function applyAll() {
      var nodes = document.querySelectorAll('[data-i18n]');
      for (var i = 0; i < nodes.length; i++) {
         var v = get(nodes[i].getAttribute('data-i18n'));
         if (v !== undefined) nodes[i].textContent = v;
      }
      nodes = document.querySelectorAll('[data-i18n-placeholder]');
      for (i = 0; i < nodes.length; i++) {
         v = get(nodes[i].getAttribute('data-i18n-placeholder'));
         if (v !== undefined) nodes[i].setAttribute('placeholder', v);
      }
      nodes = document.querySelectorAll('[data-i18n-aria]');
      for (i = 0; i < nodes.length; i++) {
         v = get(nodes[i].getAttribute('data-i18n-aria'));
         if (v !== undefined) nodes[i].setAttribute('aria-label', v);
      }
      nodes = document.querySelectorAll('[data-i18n-href]');
      for (i = 0; i < nodes.length; i++) {
         v = get(nodes[i].getAttribute('data-i18n-href'));
         if (v !== undefined) nodes[i].setAttribute('href', v);
      }
      /* عنوان سند بر اساس صفحه */
      var page = document.body ? (document.body.getAttribute('data-page') || '') : '';
      if (page) {
         var title = get('meta.' + page);
         if (title !== undefined) document.title = title;
      }
   }

   function dispatch() {
      window.dispatchEvent(new CustomEvent('fd:langchange', { detail: { lang: lang } }));
   }

   /* تغییر زبان با کراس‌فید نرم (بدون رفرش) */
   function setLang(next) {
      if (!DICT[next] || next === lang) return;
      lang = next;
      try { localStorage.setItem('fd-lang', next); } catch (e) { /* private mode */ }

      var html = document.documentElement;
      var fadeEls = Array.prototype.slice.call(document.querySelectorAll('[data-i18n]'));

      function swap() {
         html.setAttribute('lang', next);
         html.setAttribute('dir', next === 'fa' ? 'rtl' : 'ltr');
         applyAll();
      }

      var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (window.gsap && !reduced) {
         /* مسیر GSAP: با inline opacity کار می‌کند و با عناصر
            انیمیت‌شده توسط GSAP هم تداخل ندارد */
         gsap.to(fadeEls, {
            opacity: 0, duration: 0.16, ease: 'power1.in',
            onComplete: function () {
               swap();
               gsap.to(fadeEls, { opacity: 1, duration: 0.24, ease: 'power1.out' });
               dispatch();
            }
         });
      } else {
         /* مسیر جای‌گزین (بدون GSAP): کراس‌فید کلاس‌محور از custom.css */
         html.classList.add('fd-i18n-swapping');
         fadeEls.forEach(function (el) { el.classList.add('fd-i18n-fade'); });
         window.setTimeout(function () {
            swap();
            fadeEls.forEach(function (el) { el.classList.remove('fd-i18n-fade'); });
            window.setTimeout(function () { html.classList.remove('fd-i18n-swapping'); }, 220);
            dispatch();
         }, 180);
      }
   }

   /* راه‌اندازی اولیه — اگر زبان ذخیره‌شده «en» باشد بدون فید اعمال می‌شود */
   function init() {
      var stored = null;
      try { stored = localStorage.getItem('fd-lang'); } catch (e) { /* ignore */ }
      if (stored === 'en') {
         lang = 'en';
         document.documentElement.setAttribute('lang', 'en');
         document.documentElement.setAttribute('dir', 'ltr');
         applyAll();
      }
   }
   init();

   return {
      t: t,
      setLang: setLang,
      digits: digits,
      getLang: function () { return lang; }
   };
})();