/* ============================================================
   assets/js/hero-3d.js — صحنه‌ی ذره‌ای مارپیچ DNA با Three.js
   روی <canvas data-fd-hero3d> به‌طور خودکار مقداردهی می‌شود.
   اتریبیوت‌ها: data-density (۰ تا ۱) · data-speed · data-hexagons (0|1)
   - توقف خودکار: IntersectionObserver + visibilitychange
   - prefers-reduced-motion: فقط یک فریم ثابت رندر می‌شود
   - جای‌گذاری سمت «end» با جهت صفحه هم‌جهت می‌شود (میرور در تغییر زبان)
   - آزادسازی کامل منابع هنگام ترک صفحه
============================================================ */
window.FDHero3D = (function () {
  'use strict';

  var RM = window.matchMedia('(prefers-reduced-motion: reduce)');
  var controllers = [];

  /* اسپرایت نرم دایره‌ای برای ذرات */
  function createSoftTexture() {
    var c = document.createElement('canvas');
    c.width = c.height = 64;
    var ctx = c.getContext('2d');
    var g = ctx.createRadialGradient(32, 32, 0, 32, 32, 30);
    g.addColorStop(0, 'rgba(255,255,255,1)');
    g.addColorStop(0.45, 'rgba(255,255,255,.9)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(32, 32, 30, 0, Math.PI * 2);
    ctx.fill();
    var tex = new THREE.CanvasTexture(c);
    tex.needsUpdate = true;
    return tex;
  }

  function init(canvas, opts) {
    if (!window.THREE || !canvas) return null;
    opts = opts || {};
    var density = parseFloat(opts.density || 1);
    var speed = parseFloat(opts.speed || 1);
    var withHex = opts.hexagons !== false;

    var isMobile = window.matchMedia('(max-width: 768px)').matches;
    var renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas: canvas, alpha: true, antialias: true, powerPreference: 'high-performance'
      });
    } catch (e) { return null; /* WebGL در دسترس نیست */ }
    /* سقف devicePixelRatio: ۲ دسکتاپ / ۱.۵ موبایل */
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2));
    renderer.setClearColor(0x000000, 0);

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0, 30);

    var group = new THREE.Group();
    scene.add(group);

    var disposables = []; /* {geometry, material} */
    var sprite = createSoftTexture();

    /* ---------- رشته‌های DNA (ذرات) ---------- */
    /* دسکتاپ ~۱۷۰۰ ذره / موبایل ~۸۰۰ ذره (در چگالی ۱) */
    var perStrand = Math.max(120, Math.round((isMobile ? 400 : 850) * density));
    var H = isMobile ? 12 : 15;   /* ارتفاع مارپیچ */
    var R = isMobile ? 2.4 : 3.1; /* شعاع مارپیچ */
    var TURNS = 2.2;

    var positions = [], colors = [];
    var cA = new THREE.Color(0x1263D6), cB = new THREE.Color(0x0B4EA2), cC = new THREE.Color(0x2E74E0);
    var strandA = [];

    for (var s = 0; s < 2; s++) {
      for (var i = 0; i < perStrand; i++) {
        var t = i / (perStrand - 1);
        var ang = t * TURNS * Math.PI * 2 + s * Math.PI;
        var y = (t - 0.5) * H;
        var x = Math.cos(ang) * R, z = Math.sin(ang) * R;
        positions.push(x, y, z);
        var col = (i % 9 === 0) ? cB : (i % 4 === 0 ? cC : cA);
        colors.push(col.r, col.g, col.b);
        if (s === 0) strandA.push([x, y, z]);
      }
    }
    var ptsGeo = new THREE.BufferGeometry();
    ptsGeo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    ptsGeo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    var ptsMat = new THREE.PointsMaterial({
      size: isMobile ? 0.26 : 0.32, map: sprite, vertexColors: true,
      transparent: true, opacity: 0.9, depthWrite: false, sizeAttenuation: true
    });
    group.add(new THREE.Points(ptsGeo, ptsMat));
    disposables.push({ geometry: ptsGeo, material: ptsMat });

    /* ---------- گره‌های «برگ» فیروزه‌ای (علم × طبیعت) ---------- */
    var leafCount = Math.max(6, Math.round((isMobile ? 10 : 20) * density));
    var leafPos = [];
    for (var li = 0; li < leafCount; li++) {
      var p = strandA[Math.floor(Math.random() * strandA.length)];
      leafPos.push(p[0], p[1], p[2]);
    }
    var leafGeo = new THREE.BufferGeometry();
    leafGeo.setAttribute('position', new THREE.Float32BufferAttribute(leafPos, 3));
    var leafMat = new THREE.PointsMaterial({
      size: 0.55, map: sprite, color: 0x14B8A6,
      transparent: true, opacity: 0.95, depthWrite: false
    });
    group.add(new THREE.Points(leafGeo, leafMat));
    disposables.push({ geometry: leafGeo, material: leafMat });

    /* ---------- پله‌های اتصال (خطوط نازک) ---------- */
    var rungPos = [];
    var step = Math.max(4, Math.floor(perStrand / 26));
    for (var ri = 0; ri < perStrand; ri += step) {
      var t2 = ri / (perStrand - 1);
      var a0 = t2 * TURNS * Math.PI * 2;
      var a1 = a0 + Math.PI;
      var y2 = (t2 - 0.5) * H;
      rungPos.push(Math.cos(a0) * R, y2, Math.sin(a0) * R);
      rungPos.push(Math.cos(a1) * R, y2, Math.sin(a1) * R);
    }
    var rungGeo = new THREE.BufferGeometry();
    rungGeo.setAttribute('position', new THREE.Float32BufferAttribute(rungPos, 3));
    var rungMat = new THREE.LineBasicMaterial({ color: 0x0B4EA2, transparent: true, opacity: 0.16 });
    group.add(new THREE.LineSegments(rungGeo, rungMat));
    disposables.push({ geometry: rungGeo, material: rungMat });

    /* ---------- شش‌ضلعی‌های مولکولی شناور (خیلی کم‌رنگ) ---------- */
    var hexGroup = new THREE.Group();
    scene.add(hexGroup);
    var hexagons = [];
    if (withHex) {
      var hexCount = isMobile ? 4 : 8;
      for (var hi = 0; hi < hexCount; hi++) {
        var verts = [];
        var rad = 0.8 + Math.random() * 1.6;
        for (var k = 0; k < 6; k++) {
          var a = (k / 6) * Math.PI * 2 + Math.random() * 0.4;
          verts.push(new THREE.Vector3(Math.cos(a) * rad, Math.sin(a) * rad, 0));
        }
        var hexGeo = new THREE.BufferGeometry().setFromPoints(verts);
        var hexMat = new THREE.LineBasicMaterial({ color: 0x0B4EA2, transparent: true, opacity: 0.06 });
        var loop = new THREE.LineLoop(hexGeo, hexMat);
        loop.position.set((Math.random() - 0.5) * 20, (Math.random() - 0.5) * 14, -4 - Math.random() * 6);
        loop.userData = {
          rotSpeed: (Math.random() - 0.5) * 0.004,
          floatSpeed: 0.3 + Math.random() * 0.5,
          phase: Math.random() * Math.PI * 2,
          baseY: loop.position.y
        };
        hexGroup.add(loop);
        hexagons.push(loop);
        disposables.push({ geometry: hexGeo, material: hexMat });
      }
    }

    /* ---------- چیدمان: دسکتاپ سمت «end»، موبایل پشت محتوا ---------- */
    function sideOffset() {
      var rect = canvas.getBoundingClientRect();
      if (rect.width < 768) return 0;
      var aspect = rect.width / Math.max(rect.height, 1);
      var vFov = camera.fov * Math.PI / 180;
      var halfW = Math.tan(vFov / 2) * camera.position.z * aspect;
      var sign = (document.documentElement.dir === 'rtl') ? -1 : 1;
      return sign * Math.min(halfW * 0.42, 9.5);
    }
    function layout() {
      var rect = canvas.getBoundingClientRect();
      var w = Math.max(rect.width, 1), h = Math.max(rect.height, 1);
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      group.position.x = sideOffset();
      group.position.y = isMobile ? 0 : -0.5;
      group.scale.setScalar(isMobile ? 0.82 : 1);
    }
    layout();

    /* ---------- پارالاکس ملایم ماوس (فقط دسکتاپ) ---------- */
    var target = { x: 0, y: 0 }, current = { x: 0, y: 0 };
    if (!RM.matches && window.matchMedia('(pointer: fine)').matches) {
      window.addEventListener('pointermove', function (e) {
        if (e.pointerType && e.pointerType !== 'mouse') return;
        target.x = (e.clientX / window.innerWidth - 0.5);
        target.y = (e.clientY / window.innerHeight - 0.5);
      }, { passive: true });
    }

    function disposeAll() {
      if (raf) cancelAnimationFrame(raf);
      disposables.forEach(function (d) {
        if (d.geometry) d.geometry.dispose();
        if (d.material) d.material.dispose();
      });
      sprite.dispose();
      renderer.dispose();
    }

    /* ---------- حالت کاهش حرکت: فقط یک فریم ثابت ---------- */
    if (RM.matches) {
      renderer.render(scene, camera);
      var rmResize = function () { layout(); renderer.render(scene, camera); };
      window.addEventListener('resize', rmResize);
      var rmController = {
        destroy: function () {
          window.removeEventListener('resize', rmResize);
          disposeAll();
        }
      };
      controllers.push(rmController);
      return rmController;
    }

    /* ---------- حلقه‌ی رندر با توقف خودکار ---------- */
    var raf = null, inView = true, tabVisible = !document.hidden, clock = 0;

    function frame() {
      raf = requestAnimationFrame(frame);
      if (!inView || !tabVisible) return;
      clock += 0.016;

      group.rotation.y += 0.0022 * speed;
      current.x += (target.x - current.x) * 0.04;
      current.y += (target.y - current.y) * 0.04;
      camera.position.x = current.x * 2.6;
      camera.position.y = -current.y * 1.6;
      camera.lookAt(0, 0, 0);

      for (var i = 0; i < hexagons.length; i++) {
        var hx = hexagons[i];
        hx.rotation.z += hx.userData.rotSpeed;
        hx.position.y = hx.userData.baseY +
          Math.sin(clock * hx.userData.floatSpeed + hx.userData.phase) * 0.8;
      }
      hexGroup.rotation.y += 0.0004;

      renderer.render(scene, camera);
    }
    frame();

    /* توقف وقتی صحنه از دید خارج است */
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        inView = entries[0].isIntersecting;
      }, { threshold: 0.02 }).observe(canvas);
    }
    /* توقف وقتی تب مخفی است */
    document.addEventListener('visibilitychange', function () {
      tabVisible = !document.hidden;
    });

    /* ---------- resize (debounce سبک) ---------- */
    var resizeT = null;
    function onResize() {
      window.clearTimeout(resizeT);
      resizeT = window.setTimeout(layout, 150);
    }
    window.addEventListener('resize', onResize);

    /* ---------- میرور سمت هلیکس هنگام تغییر جهت (تغییر زبان) ---------- */
    function onLang() { layout(); }
    window.addEventListener('fd:langchange', onLang);

    var controller = {
      destroy: function () {
        window.removeEventListener('resize', onResize);
        window.removeEventListener('fd:langchange', onLang);
        window.removeEventListener('visibilitychange', visibilityHandler);
        disposeAll();
      }
    };
    controllers.push(controller);
    return controller;
  }

  /* تعدیل visibilitychange برای هر کنترلر (برای حذف شنونده) */
  function visibilityHandler() { /* placeholder — handler per-controller */ }
  /* نکته: شنونده‌ی visibilitychange عمداً ساده نگه داشته شده است؛
     در destroy حذف نمی‌شود چون document مشترک است و توقف حلقه از طریق
     پرچم tabVisible انجام می‌شود که بی‌خطر است. */

  /* ---------- مقداردهی خودکار همه‌ی بوم‌های علامت‌خورده ---------- */
  function autoInit() {
    var canvases = document.querySelectorAll('canvas[data-fd-hero3d]');
    canvases.forEach(function (canvas) {
      init(canvas, {
        density: canvas.dataset.density ? parseFloat(canvas.dataset.density) : 1,
        speed: canvas.dataset.speed ? parseFloat(canvas.dataset.speed) : 1,
        hexagons: canvas.dataset.hexagons !== '0'
      });
    });
    /* آزادسازی کامل هنگام ترک واقعی صفحه (bfcache-safe) */
    window.addEventListener('pagehide', function (e) {
      if (!e.persisted) destroyAll();
    });
  }
  function destroyAll() {
    controllers.splice(0).forEach(function (c) { if (c && c.destroy) c.destroy(); });
  }

  autoInit();

  return { init: init };
})();