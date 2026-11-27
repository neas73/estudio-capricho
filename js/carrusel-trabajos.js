/**
 * carrusel-trabajos.js
 * Carrusel horizontal del portfolio: flechas anterior/siguiente, barra de
 * progreso y flechas del teclado. En pantallas táctiles se desliza con el dedo.
 * Marcado esperado: #trabajos-track con tarjetas .work-card, y dentro de .carousel
 * los botones [data-carousel-prev] y [data-carousel-next], .carousel-controls
 * y .carousel-progress-thumb.
 */
(function () {
  'use strict';

  var track = document.getElementById('trabajos-track');
  if (!track) return;

  var root = track.closest('.carousel');
  var prev = root.querySelector('[data-carousel-prev]');
  var next = root.querySelector('[data-carousel-next]');
  var controls = root.querySelector('.carousel-controls');
  var ticking = false;

  function firstVisibleCard() {
    return Array.prototype.filter.call(track.querySelectorAll('.work-card'), function (card) {
      return !card.hidden;
    })[0];
  }

  function stepSize() {
    var card = firstVisibleCard();
    if (!card) return track.clientWidth;
    var gap = parseFloat(window.getComputedStyle(track).columnGap) || 0;
    return card.getBoundingClientRect().width + gap;
  }

  function update() {
    ticking = false;

    var max = track.scrollWidth - track.clientWidth;
    var hasOverflow = max > 2;

    controls.hidden = !hasOverflow;
    prev.disabled = track.scrollLeft <= 2;
    next.disabled = track.scrollLeft >= max - 2;

    root.style.setProperty('--thumb-width', (track.clientWidth / track.scrollWidth) * 100 + '%');
    root.style.setProperty('--thumb-left', (track.scrollLeft / track.scrollWidth) * 100 + '%');
  }

  function requestUpdate() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(update);
  }

  function move(direction) {
    track.scrollBy({ left: direction * stepSize(), behavior: 'smooth' });
  }

  prev.addEventListener('click', function () {
    move(-1);
  });

  next.addEventListener('click', function () {
    move(1);
  });

  track.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      move(1);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      move(-1);
    }
  });

  track.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate);

  // Al cambiar el filtro el carrusel vuelve al principio
  document.addEventListener('trabajos:filtered', function () {
    track.scrollLeft = 0;
    requestUpdate();
  });

  update();
})();
