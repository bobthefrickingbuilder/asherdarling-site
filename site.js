// Scroll reveal (webassets 001): sections and [data-reveal] items fade up once as they enter.
// CSS only hides them when JS is running and the visitor hasn't asked for reduced motion.
(function () {
  var items = document.querySelectorAll('main .section, main .page-head, [data-reveal]');
  items.forEach(function (el) {
    el.setAttribute('data-reveal', '');
  });
  document.querySelectorAll('.strip').forEach(function (list) {
    list.querySelectorAll('[data-reveal]').forEach(function (el, i) { el.style.setProperty('--i', i); });
  });

  if (!('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('in'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });
  document.querySelectorAll('[data-reveal]').forEach(function (el) { io.observe(el); });
})();
