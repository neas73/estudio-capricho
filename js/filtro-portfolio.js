/**
 * filtro-portfolio.js
 * Filtra las tarjetas del portfolio según la categoría elegida.
 * En escritorio se usan chips ([data-filter]); en celular, la lista
 * desplegable (#trabajos-select). Ambos controles quedan sincronizados.
 * Sin filtro activo se ven todos los trabajos; al hacer clic otra vez
 * en la categoría activa se quita el filtro.
 * Marcado esperado: tarjetas con [data-category].
 * Avisa el cambio con el evento "trabajos:filtered" (lo usa el carrusel).
 */
(function () {
  'use strict';

  var buttons = document.querySelectorAll('[data-filter]');
  var select = document.getElementById('trabajos-select');
  var cards = document.querySelectorAll('[data-category]');
  var selected = null;

  if (!cards.length || (!buttons.length && !select)) return;

  function render() {
    buttons.forEach(function (button) {
      var isActive = button.getAttribute('data-filter') === selected;
      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-pressed', String(isActive));
    });

    if (select) select.value = selected === null ? '' : selected;

    cards.forEach(function (card) {
      card.hidden = selected !== null && card.getAttribute('data-category') !== selected;
    });

    document.dispatchEvent(new CustomEvent('trabajos:filtered'));
  }

  buttons.forEach(function (button) {
    button.addEventListener('click', function () {
      var value = button.getAttribute('data-filter');
      selected = selected === value ? null : value;
      render();
    });
  });

  if (select) {
    select.addEventListener('change', function () {
      selected = select.value || null;
      render();
    });
  }
})();
