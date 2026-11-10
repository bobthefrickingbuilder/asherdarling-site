(function () {
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
})();
