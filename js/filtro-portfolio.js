/**
 * filtro-portfolio.js
 * Filtra las tarjetas del portfolio según la categoría elegida.
 * Sin filtro activo se ven todos los trabajos; al hacer clic otra vez
 * en la categoría activa se quita el filtro.
 * Marcado esperado: botones con [data-filter] y tarjetas con [data-category].
 */
(function () {
  'use strict';

  var buttons = document.querySelectorAll('[data-filter]');
  var cards = document.querySelectorAll('[data-category]');
  var selected = null;

  if (!buttons.length || !cards.length) return;

  function render() {
    buttons.forEach(function (button) {
      var isActive = button.getAttribute('data-filter') === selected;
      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-pressed', String(isActive));
    });

    cards.forEach(function (card) {
      card.hidden = selected !== null && card.getAttribute('data-category') !== selected;
    });
  }

  buttons.forEach(function (button) {
    button.addEventListener('click', function () {
      var value = button.getAttribute('data-filter');
      selected = selected === value ? null : value;
      render();
    });
  });
})();
