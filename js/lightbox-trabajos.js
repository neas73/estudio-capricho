/**
 * lightbox-trabajos.js
 * Ventana emergente (<dialog>) que amplía la imagen de un trabajo al hacer clic.
 * Permite pasar al trabajo anterior o siguiente (botones, flechas del teclado
 * o deslizando el dedo) y se cierra con la X, con Esc o tocando fuera.
 * Respeta el filtro activo: solo recorre los trabajos visibles.
 * Marcado esperado: #lightbox con .lightbox-stage, .lightbox-meta, .lightbox-name,
 * .lightbox-desc, .lightbox-count y botones [data-lightbox-close|prev|next];
 * tarjetas .work-card dentro de #trabajos-track con un botón .work-media.
 */
(function () {
  'use strict';

  var dialog = document.getElementById('lightbox');
  var track = document.getElementById('trabajos-track');

  if (!dialog || !track || typeof dialog.showModal !== 'function') return;

  var stage = dialog.querySelector('.lightbox-stage');
  var meta = dialog.querySelector('.lightbox-meta');
  var name = dialog.querySelector('.lightbox-name');
  var desc = dialog.querySelector('.lightbox-desc');
  var count = dialog.querySelector('.lightbox-count');
  var prev = dialog.querySelector('[data-lightbox-prev]');
  var next = dialog.querySelector('[data-lightbox-next]');
  var close = dialog.querySelector('[data-lightbox-close]');
  var root = document.documentElement;

  var cards = [];
  var index = 0;
  var touchStartX = null;

  function visibleCards() {
    return Array.prototype.filter.call(track.querySelectorAll('.work-card'), function (card) {
      return !card.hidden;
    });
  }

  function textOf(card, selector) {
    var node = card.querySelector(selector);
    return node ? node.textContent.trim() : '';
  }

  function render() {
    var card = cards[index];
    var media = card.querySelector('.work-media');

    stage.querySelectorAll('[data-lightbox-media]').forEach(function (node) {
      node.remove();
    });

    // Copia la imagen de la tarjeta dentro del pop-up
    Array.prototype.slice.call(media.children).reverse().forEach(function (child) {
      var clone = child.cloneNode(true);
      clone.setAttribute('data-lightbox-media', '');
      stage.insertBefore(clone, stage.firstChild);
    });

    meta.textContent = textOf(card, '.work-meta');
    name.textContent = textOf(card, '.work-name');
    desc.textContent = textOf(card, '.work-desc');
    count.textContent = index + 1 + ' / ' + cards.length;

    prev.hidden = next.hidden = cards.length < 2;
  }

  function go(direction) {
    index = (index + direction + cards.length) % cards.length;
    render();
  }

  function open(card) {
    cards = visibleCards();
    index = Math.max(cards.indexOf(card), 0);
    render();
    root.classList.add('is-lightbox-open');
    dialog.showModal();
  }

  track.addEventListener('click', function (event) {
    var trigger = event.target.closest('.work-media');
    if (trigger) open(trigger.closest('.work-card'));
  });

  prev.addEventListener('click', function () {
    go(-1);
  });

  next.addEventListener('click', function () {
    go(1);
  });

  close.addEventListener('click', function () {
    dialog.close();
  });

  // Clic fuera del contenido (sobre el fondo oscuro)
  dialog.addEventListener('click', function (event) {
    if (event.target === dialog) dialog.close();
  });

  dialog.addEventListener('keydown', function (event) {
    if (cards.length < 2) return;
    if (event.key === 'ArrowRight') go(1);
    if (event.key === 'ArrowLeft') go(-1);
  });

  // Deslizar el dedo para cambiar de trabajo
  stage.addEventListener('touchstart', function (event) {
    touchStartX = event.changedTouches[0].clientX;
  }, { passive: true });

  stage.addEventListener('touchend', function (event) {
    if (touchStartX === null || cards.length < 2) return;
    var delta = event.changedTouches[0].clientX - touchStartX;
    touchStartX = null;
    if (Math.abs(delta) > 40) go(delta < 0 ? 1 : -1);
  }, { passive: true });

  dialog.addEventListener('close', function () {
    root.classList.remove('is-lightbox-open');
    // El carrusel deja a la vista el último trabajo que se estaba mirando
    if (cards[index]) cards[index].scrollIntoView({ block: 'nearest', inline: 'center' });
  });
})();
