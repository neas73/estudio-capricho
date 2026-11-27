/**
 * nav.js
 * Menú flotante:
 *  - marca como activo el enlace de la sección que se está viendo,
 *  - agrega una línea inferior al menú cuando la página se desplaza,
 *  - publica la altura del menú en --header-height (la usa el scroll de anclas).
 * Marcado esperado: <header id="site-header"> y enlaces .nav-link[data-section="id-de-seccion"].
 */
(function () {
  'use strict';

  var header = document.getElementById('site-header');
  var links = document.querySelectorAll('.nav-link[data-section]');

  if (!header || !links.length) return;

  var root = document.documentElement;
  var items = [];
  var ticking = false;

  links.forEach(function (link) {
    var section = document.getElementById(link.getAttribute('data-section'));
    if (section) items.push({ section: section, link: link });
  });

  if (!items.length) return;

  function setHeaderHeight() {
    root.style.setProperty('--header-height', header.offsetHeight + 'px');
  }

  function update() {
    ticking = false;

    var scrollY = window.pageYOffset || root.scrollTop;
    var line = header.offsetHeight + 24;
    var current = items[0];

    header.classList.toggle('is-scrolled', scrollY > 4);

    items.forEach(function (item) {
      if (item.section.getBoundingClientRect().top <= line) current = item;
    });

    // Al llegar al final de la página queda activa la última sección
    if (window.innerHeight + scrollY >= root.scrollHeight - 2) {
      current = items[items.length - 1];
    }

    items.forEach(function (item) {
      var isActive = item === current;
      item.link.classList.toggle('is-active', isActive);
      if (isActive) {
        item.link.setAttribute('aria-current', 'true');
      } else {
        item.link.removeAttribute('aria-current');
      }
    });
  }

  function requestUpdate() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(update);
  }

  setHeaderHeight();
  update();

  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', function () {
    setHeaderHeight();
    requestUpdate();
  });

  if ('ResizeObserver' in window) {
    new ResizeObserver(setHeaderHeight).observe(header);
  }
})();
