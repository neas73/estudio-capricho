/**
 * contacto-whatsapp.js
 * Al elegir un área en la sección de contacto, actualiza el enlace
 * del botón de WhatsApp con el mensaje correspondiente.
 * Marcado esperado: botones con [data-need] y un enlace #wa-link
 * con data-phone y data-message.
 */
(function () {
  'use strict';

  var buttons = document.querySelectorAll('[data-need]');
  var link = document.getElementById('wa-link');

  if (!buttons.length || !link) return;

  var phone = link.getAttribute('data-phone');
  var prefix = link.getAttribute('data-message');

  function selectNeed(need) {
    buttons.forEach(function (button) {
      var isActive = button.getAttribute('data-need') === need;
      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-pressed', String(isActive));
    });

    link.href = 'https://wa.me/' + phone + '?text=' + encodeURIComponent(prefix + need);
  }

  buttons.forEach(function (button) {
    button.addEventListener('click', function () {
      selectNeed(button.getAttribute('data-need'));
    });
  });
})();
