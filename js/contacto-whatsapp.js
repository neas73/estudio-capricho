/**
 * contacto-whatsapp.js
 * Al elegir un área en la sección de contacto, actualiza el mensaje
 * y el enlace del botón de WhatsApp.
 * Marcado esperado: botones con [data-need], enlace #wa-link con
 * data-phone y data-message, y un elemento #wa-message para la vista previa.
 */
(function () {
  'use strict';

  var buttons = document.querySelectorAll('[data-need]');
  var link = document.getElementById('wa-link');
  var preview = document.getElementById('wa-message');

  if (!buttons.length || !link || !preview) return;

  var phone = link.getAttribute('data-phone');
  var prefix = link.getAttribute('data-message');

  function selectNeed(need) {
    var message = prefix + need;

    buttons.forEach(function (button) {
      var isActive = button.getAttribute('data-need') === need;
      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-pressed', String(isActive));
    });

    preview.textContent = message;
    link.href = 'https://wa.me/' + phone + '?text=' + encodeURIComponent(message);
  }

  buttons.forEach(function (button) {
    button.addEventListener('click', function () {
      selectNeed(button.getAttribute('data-need'));
    });
  });
})();
