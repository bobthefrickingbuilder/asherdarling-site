(function () {
  // Landing fits the screen: CSS sizes it with the real nav height.
  var nav = document.querySelector('.site-nav');
  if (nav) {
    var setNav = function () { document.documentElement.style.setProperty('--nav-h', nav.offsetHeight + 'px'); };
    setNav();
    window.addEventListener('resize', setNav);
  }

  var reduced = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Scroll reveal (webassets 001): sections and [data-reveal] items fade up once as they enter.
  // CSS only hides them when JS is running and the visitor hasn't asked for reduced motion.
  var items = document.querySelectorAll('main .section, main .page-head, [data-reveal]');
  items.forEach(function (el) { el.setAttribute('data-reveal', ''); });
  document.querySelectorAll('.roles, .mosaic__grid').forEach(function (group) {
    group.querySelectorAll('[data-reveal]').forEach(function (el, i) { el.style.setProperty('--i', i); });
  });
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  // Text fill on scroll (webassets 007): the statement lights up word by word.
  var fill = document.querySelector('[data-fill]');
  if (fill && !reduced) {
    var words = fill.textContent.trim().split(/\s+/);
    fill.textContent = '';
    words.forEach(function (w, i) {
      var span = document.createElement('span');
      span.className = 'w';
      span.textContent = w;
      fill.appendChild(span);
      if (i < words.length - 1) fill.appendChild(document.createTextNode(' '));
    });
    var spans = fill.querySelectorAll('.w');
    fill.classList.add('is-filling');
    var ticking = false;
    var update = function () {
      ticking = false;
      var r = fill.getBoundingClientRect();
      var vh = window.innerHeight;
      var p = (vh * 0.85 - r.top) / (r.height * 0.9 + vh * 0.3);
      p = Math.max(0, Math.min(1, p));
      var n = Math.round(p * spans.length);
      spans.forEach(function (s, i) { s.classList.toggle('on', i < n); });
    };
    var onScroll = function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
  }
  // Single-track Spotify players: only one plays at a time.
  var slots = document.querySelectorAll('[data-spotify]');
  if (slots.length) {
    var players = [];
    window.onSpotifyIframeApiReady = function (IFrameAPI) {
      slots.forEach(function (el) {
        IFrameAPI.createController(el, { uri: el.getAttribute('data-spotify'), width: '100%', height: 80 }, function (ctrl) {
          players.push(ctrl);
          var playing = false;
          ctrl.addListener('playback_update', function (e) {
            var nowPlaying = !!(e && e.data && e.data.isPaused === false);
            if (nowPlaying && !playing) players.forEach(function (o) { if (o !== ctrl) o.pause(); });
            playing = nowPlaying;
          });
        });
      });
    };
  }
  // Label cursor (webassets 056): an amber dot that rings links and opens into a label on a few.
  if (window.matchMedia && matchMedia('(hover: hover) and (pointer: fine)').matches) {
    document.querySelectorAll('a[href="contact.html"], a[href="/contact.html"], .closing__link').forEach(function (a) {
      if (!a.closest('.site-nav, .footer')) a.setAttribute('data-cursor', 'Book');
    });
    document.querySelectorAll('a[target="_blank"]').forEach(function (a) {
      if (!a.hasAttribute('data-cursor')) a.setAttribute('data-cursor', 'Open \u2197');
    });
    var c = document.createElement('div');
    c.className = 'lc'; c.setAttribute('aria-hidden', 'true');
    var label = document.createElement('span'); c.appendChild(label);
    document.body.appendChild(c);
    document.documentElement.classList.add('has-cursor');
    var x = -100, y = -100, tx = -100, ty = -100, ease = reduced ? 1 : 0.22;
    addEventListener('pointermove', function (e) {
      tx = e.clientX; ty = e.clientY;
      if (x < 0) { x = tx; y = ty; }
      var t = e.target;
      if (t.tagName === 'IFRAME') { c.classList.remove('on'); return; }
      c.classList.add('on');
      var host = t.closest('[data-cursor]');
      var link = t.closest('a, button, label, summary');
      c.classList.toggle('label', !!host);
      c.classList.toggle('link', !host && !!link);
      if (host) label.textContent = host.getAttribute('data-cursor');
    });
    document.addEventListener('pointerleave', function () { c.classList.remove('on'); });
    window.addEventListener('blur', function () { c.classList.remove('on'); });
    (function loop() {
      x += (tx - x) * ease; y += (ty - y) * ease;
      c.style.left = x + 'px'; c.style.top = y + 'px';
      requestAnimationFrame(loop);
    })();
  }


  // Pictures lightbox: frames open in a modal <dialog>; arrows, swipe and Esc work. Without JS the links open the image file.
  var opens = Array.prototype.slice.call(document.querySelectorAll('.frame__open'));
  if (opens.length && window.HTMLDialogElement) {
    var lb = document.createElement('dialog');
    lb.className = 'lb'; lb.setAttribute('aria-label', 'Picture viewer');
    lb.innerHTML = '<div class="lb__top"><span class="lb__count visually-hidden" aria-live="polite"></span><button type="button" class="lb__close">Close</button></div>' +
      '<figure class="lb__stage"><img alt=""></figure>' +
      '<div class="lb__bar"><span class="lb__nav"><button type="button" class="lb__prev">\u2190 Prev</button><button type="button" class="lb__next">Next \u2192</button></span></div>';
    document.body.appendChild(lb);
    var lbImg = lb.querySelector('img'), lbCount = lb.querySelector('.lb__count'), cur = 0;
    var show = function (i) {
      cur = (i + opens.length) % opens.length;
      var a = opens[cur], im = a.querySelector('img');
      lbImg.classList.remove('swap'); void lbImg.offsetWidth; lbImg.classList.add('swap');
      lbImg.src = a.getAttribute('href'); lbImg.alt = im.alt;
      lbImg.width = im.width; lbImg.height = im.height;
      lbCount.textContent = 'Picture ' + (cur + 1) + ' of ' + opens.length;
    };
    opens.forEach(function (a, i) {
      a.addEventListener('click', function (e) {
        e.preventDefault(); show(i);
        document.documentElement.classList.add('lb-open');
        lb.showModal(); lb.querySelector('.lb__next').focus();
      });
    });
    // Cleanup runs from every close path (button, backdrop, Esc) rather than relying on the close event alone.
    var shut = function () {
      if (lb.open) lb.close();
      document.documentElement.classList.remove('lb-open');
      opens[cur].focus();
    };
    lb.addEventListener('cancel', function (e) { e.preventDefault(); shut(); });
    lb.addEventListener('close', function () { if (document.documentElement.classList.contains('lb-open')) shut(); });
    lb.querySelector('.lb__close').addEventListener('click', shut);
    lb.querySelector('.lb__prev').addEventListener('click', function () { show(cur - 1); });
    lb.querySelector('.lb__next').addEventListener('click', function () { show(cur + 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb || e.target.classList.contains('lb__stage')) shut(); });
    lb.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { e.preventDefault(); show(cur - 1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); show(cur + 1); }
    });
    var sx = null;
    lb.addEventListener('pointerdown', function (e) { sx = e.clientX; });
    lb.addEventListener('pointerup', function (e) {
      if (sx !== null && e.pointerType !== 'mouse' && Math.abs(e.clientX - sx) > 50) show(cur + (e.clientX < sx ? 1 : -1));
      sx = null;
    });
  }
})();
