/**
 * filtro-portfolio.js
 * Filtra las tarjetas del portfolio según la categoría elegida.
 * Marcado esperado: botones con [data-filter] y tarjetas con [data-category].
 */
(function () {
  'use strict';

  var ALL = 'Todos';
  var buttons = document.querySelectorAll('[data-filter]');
  var cards = document.querySelectorAll('[data-category]');

  if (!buttons.length || !cards.length) return;

  function applyFilter(selected) {
    buttons.forEach(function (button) {
      var isActive = button.getAttribute('data-filter') === selected;
      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-pressed', String(isActive));
    });

    cards.forEach(function (card) {
      var matches = selected === ALL || card.getAttribute('data-category') === selected;
      card.hidden = !matches;
    });
  }

  buttons.forEach(function (button) {
    button.addEventListener('click', function () {
      applyFilter(button.getAttribute('data-filter'));
    });
  });
})();
